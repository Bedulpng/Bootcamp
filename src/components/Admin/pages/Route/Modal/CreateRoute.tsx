"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

interface CreateRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  allRoles: { id: string; name: string }[];
}

export function CreateRouteModal({
  isOpen,
  onClose,
  allRoles,
}: CreateRouteModalProps) {
  const [routePath, setRoutePath] = useState("");
  const [selectedAccessRoleIds, setSelectedAccessRoleIds] = useState<string[]>(
    []
  );
  const [openAccessRoles, setOpenAccessRoles] = useState(false);

  const handleSave = async () => {
    if (!routePath || selectedAccessRoleIds.length === 0) return;

    try {
      await axios.post("http://10.10.103.248:4000/api/route-permissions", {
        route: routePath.startsWith("/") ? routePath : `/${routePath}`,
        roleIds: selectedAccessRoleIds,
      });

      handleClose();
    } catch (error) {
      console.error("Failed to create route permissions:", error);
    }
  };

  const handleClose = () => {
    setRoutePath("");
    setSelectedAccessRoleIds([]);
    onClose();
  };

  const toggleAccessRole = (roleId: string) => {
    setSelectedAccessRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId) // Remove if already selected
        : [...prev, roleId] // Add if not selected
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} modal={false}>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl">
            Create New Route
          </DialogTitle>
          <DialogDescription className="text-sm">
            Add a new route and configure its access permissions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="route-path" className="text-sm font-medium">
              Route Path
            </label>
            <Input
              id="route-path"
              placeholder="/example/route"
              value={routePath}
              onChange={(e) => setRoutePath(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Role Access</label>
            <Popover open={openAccessRoles} onOpenChange={setOpenAccessRoles}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openAccessRoles}
                  className="justify-between"
                >
                  {selectedAccessRoleIds.length > 0
                    ? allRoles
                        .filter((role) =>
                          selectedAccessRoleIds.includes(role.id)
                        )
                        .map((role) => role.name)
                        .join(", ")
                    : "Select roles"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 z-[9999]"
                align="start"
                forceMount
              >
                <Command>
                  <CommandInput placeholder="Search roles..." />
                  <CommandList>
                    <CommandEmpty>No role found.</CommandEmpty>
                    <CommandGroup>
                      {allRoles.map((role) => (
                        <CommandItem
                          key={role.id}
                          onSelect={() => toggleAccessRole(role.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedAccessRoleIds.includes(role.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {role.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter className="sm:space-x-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!routePath || selectedAccessRoleIds.length === 0}
            className="flex-1 sm:flex-none"
          >
            Create Route
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
