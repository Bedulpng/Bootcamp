"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import type { RoutePermissions } from "@/types/Trainee";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface RouteAccessModalProps {
  route: RoutePermissions | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (path: string, roleIds: string[]) => void;
}

export function RouteAccessModal({
  route,
  isOpen,
  onClose,
}: RouteAccessModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [allRoles, setAllRoles] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await axios.get(
          "http://10.10.103.195:4000/admin/role/roles"
        );
        const roles = data.tableRoles.map((role: any) => ({
          id: role.id,
          name: role.name,
        }));
        setAllRoles(roles);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (route) {
      setSelectedRoles(route.role.map((r) => r.id));
    }
  }, [route]);

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles((current) =>
      current.includes(roleId)
        ? current.filter((id) => id !== roleId)
        : [...current, roleId]
    );
  };

  const hasChanges =
    route &&
    JSON.stringify(selectedRoles.sort()) !==
      JSON.stringify(route.role.map((r) => r.id).sort());

  const handleConfirm = async () => {
    if (hasChanges && route) {
      setIsLoading(true);
      try {
        const previousRoles = route.role.map((r) => r.id);
        const rolesToAdd = selectedRoles.filter(
          (id) => !previousRoles.includes(id)
        );
        const rolesToRemove = previousRoles.filter(
          (id) => !selectedRoles.includes(id)
        );

        if (rolesToAdd.length === 0 && rolesToRemove.length === 0) {
          onClose();
          return;
        }

        await axios.put(
          `http://10.10.103.195:4000/api/route-permissions/${route.id}`,
          {
            addRoleIds: rolesToAdd,
            removeRoleIds: rolesToRemove,
          }
        );

        onClose();
      } catch (error) {
        console.error("Failed to update route permissions:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedRoles(route?.role.map((r) => r.id) || []);
    onClose();
  };

  if (!route) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] p-4 sm:p-6">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl">
              Route Access Control
            </DialogTitle>
            <DialogDescription className="text-sm">
              Manage role access for <strong>{route.route}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 sm:gap-4 py-4">
            {allRoles.map(({ id, name }) => {
              const isSelected = selectedRoles.includes(id);
              const wasSelected = route.role.some((r) => r.id === id);
              const hasChanged = isSelected !== wasSelected;

              return (
                <div
                  key={id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 sm:p-4 transition-colors",
                    hasChanged && "border-primary"
                  )}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-sm font-medium truncate pr-2">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </div>
                    {hasChanged && (
                      <div className="text-xs text-muted-foreground">
                        {isSelected
                          ? "Will be granted access"
                          : "Will lose access"}
                      </div>
                    )}
                  </div>
                  <Switch
                    checked={isSelected}
                    onCheckedChange={() => handleRoleToggle(id)}
                    className="flex-shrink-0"
                  />
                </div>
              );
            })}
          </div>

          <DialogFooter className="sm:space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 sm:flex-none"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!hasChanges || isLoading}
              className="flex-1 sm:flex-none"
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
