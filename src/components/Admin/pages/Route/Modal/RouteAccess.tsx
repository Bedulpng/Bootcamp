"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"

import type { Route } from "../types/types"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { allRoles } from "../data/Mock"
import { cn } from "@/lib/utils"

interface RouteAccessModalProps {
  route: Route | null
  isOpen: boolean
  onClose: () => void
  onSave: (path: string, roles: string[]) => void
}

export function RouteAccessModal({ route, isOpen, onClose, onSave }: RouteAccessModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(route?.roles || [])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const hasChanges = route && JSON.stringify(selectedRoles.sort()) !== JSON.stringify(route.roles.sort())

  const handleRoleToggle = (role: string) => {
    setSelectedRoles((current) => (current.includes(role) ? current.filter((r) => r !== role) : [...current, role]))
  }

  const handleSave = () => {
    if (hasChanges) {
      setShowConfirmation(true)
    } else {
      onClose()
    }
  }

  const handleConfirm = () => {
    if (route) {
      onSave(route.path, selectedRoles)
    }
    setShowConfirmation(false)
    onClose()
  }

  const handleCancel = () => {
    setSelectedRoles(route?.roles || [])
    onClose()
  }

  if (!route) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] p-4 sm:p-6">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl">Route Access Control</DialogTitle>
            <DialogDescription className="text-sm">Manage role access for {route.path}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-4">
            {allRoles.map((role) => {
              const isSelected = selectedRoles.includes(role)
              const wasSelected = route.roles.includes(role)
              const hasChanged = isSelected !== wasSelected

              return (
                <div
                  key={role}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 sm:p-4 transition-colors",
                    hasChanged && "border-primary",
                  )}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-sm font-medium truncate pr-2">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </div>
                    {hasChanged && (
                      <div className="text-xs text-muted-foreground">
                        {isSelected ? "Will be granted access" : "Will lose access"}
                      </div>
                    )}
                  </div>
                  <Switch
                    checked={isSelected}
                    onCheckedChange={() => handleRoleToggle(role)}
                    className="flex-shrink-0"
                  />
                </div>
              )
            })}
          </div>
          <DialogFooter className="sm:space-x-2">
            <Button variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges} className="flex-1 sm:flex-none">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="w-[calc(100%-2rem)] p-4 sm:p-6">
          <AlertDialogHeader className="space-y-2 sm:space-y-3">
            <AlertDialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              This change could lead to future issues with access control.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:space-x-2">
            <AlertDialogCancel className="flex-1 sm:flex-none">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="flex-1 sm:flex-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirm}
            >
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

