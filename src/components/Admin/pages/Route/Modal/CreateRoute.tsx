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
import { allRoles } from "../data/Mock";

interface CreateRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (path: string, baseRole: string, accessRoles: string[]) => void;
}

export function CreateRouteModal({
  isOpen,
  onClose,
  onSave,
}: CreateRouteModalProps) {
  const [routePath, setRoutePath] = useState("");
  const [baseRole, setBaseRole] = useState("");
  const [openBaseRole, setOpenBaseRole] = useState(false);
  const [selectedAccessRoles, setSelectedAccessRoles] = useState<string[]>([]);
  const [openAccessRoles, setOpenAccessRoles] = useState(false);

  const handleSave = () => {
    if (routePath && baseRole) {
      // Ensure the base role is always included in access roles
      const accessRoles = Array.from(
        new Set([baseRole, ...selectedAccessRoles])
      );
      onSave(
        routePath.startsWith("/") ? routePath : `/${routePath}`,
        baseRole,
        accessRoles
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setRoutePath("");
    setBaseRole("");
    setSelectedAccessRoles([]);
    onClose();
  };

  const toggleAccessRole = (role: string) => {
    setSelectedAccessRoles((current) =>
      current.includes(role)
        ? current.filter((r) => r !== role)
        : [...current, role]
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
            <label className="text-sm font-medium">Base Role</label>
            <Popover open={openBaseRole} onOpenChange={setOpenBaseRole}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openBaseRole}
                  className="justify-between"
                >
                  {baseRole ? baseRole : "Select base role..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 z-[9999]"
                align="start"
                forceMount
              >
                <Command shouldFilter={false}>
                  <CommandInput placeholder="Search role..." />
                  <CommandList>
                    <CommandEmpty>No role found.</CommandEmpty>
                    <CommandGroup>
                      {allRoles.map((role) => (
                        <CommandItem
                          key={role}
                          value={role}
                          onSelect={(value) => {
                            setBaseRole(value);
                            setOpenBaseRole(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              baseRole === role ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {role}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
                  {selectedAccessRoles.length > 0
                    ? `${selectedAccessRoles.length} role(s) selected`
                    : "Select roles..."}
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
                          key={role}
                          value={role}
                          onSelect={() => toggleAccessRole(role)}
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedAccessRoles.includes(role)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {role}
                          </div>
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
            disabled={!routePath || !baseRole}
            className="flex-1 sm:flex-none"
          >
            Create Route
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
