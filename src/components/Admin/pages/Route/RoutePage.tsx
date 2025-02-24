"use client";

import { useState, useEffect } from "react";
import { Plus, ArrowUp } from "lucide-react";
import type { Route } from "./types/types";
import { routes, groupRoutes } from "./data/Mock";
import { RouteGroupComponent } from "./components/RouteGroup";
import { RouteAccessModal } from "./Modal/RouteAccess";
import { CreateRouteModal } from "./Modal/CreateRoute";
import { SearchBar } from "./components/SearchBar";
import { Button } from "@/components/ui/button";
import { Role } from "./types/types";

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routeData, setRouteData] = useState(routes);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Detect scrolling and manage scroll button visibility
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setShowScrollButton(true);

      // Clear previous timeout and set a new one (1 second delay)
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setShowScrollButton(false);
      }, 1000); // 1 second after scrolling stops
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleRouteClick = (route: Route) => setSelectedRoute(route);

  const handleSaveAccess = (path: string, roles: string[]) => {
    const roleArray: Role[] = roles.filter((role): role is Role =>
      ["admin", "mentor", "student", "teacher"].includes(role)
    );

    setRouteData((current) =>
      current.map((route) =>
        route.path === path ? { ...route, roles: roleArray } : route
      )
    );
  };

  const handleCreateRoute = (
    path: string,
    baseRole: string,
    accessRoles: string[]
  ) => {
    const normalizedPath = path.startsWith(`/${baseRole}`)
      ? path
      : `/${baseRole}${path}`;

    const roleArray: Role[] = accessRoles.filter((role): role is Role =>
      ["admin", "mentor", "student", "teacher"].includes(role)
    );

    const newRoute: Route = { path: normalizedPath, roles: roleArray };
    setRouteData((current) => [...current, newRoute]);
  };

  const filteredRoutes = routeData.filter((route) =>
    route.path.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const groupedRoutes = groupRoutes(filteredRoutes);
  const totalRoutes = routeData.length;
  const isModalOpen = showCreateModal || selectedRoute !== null;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Modal Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-20"></div>
      )}

      {/* Main Content */}
      <div
        className={`relative z-10 transition-all ${
          isModalOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header Controls - Removed Sticky & Lowered z-index */}
        <div className="border-b bg-background/90">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 z-10">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="flex justify-center sm:justify-end">
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full sm:w-auto"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Route
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedRoutes.map((group) => (
              <RouteGroupComponent
                key={group.name}
                group={group}
                onRouteClick={handleRouteClick}
                totalRoutes={totalRoutes}
              />
            ))}
          </div>

          {/* Empty State */}
          {groupedRoutes.length === 0 && (
            <div className="flex min-h-[300px] sm:min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-muted-foreground px-4">
                {searchQuery ? "No routes found" : "No routes added yet"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-10 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity duration-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Modals */}
      <RouteAccessModal
        route={selectedRoute}
        isOpen={!!selectedRoute}
        onClose={() => setSelectedRoute(null)}
        onSave={handleSaveAccess}
      />

      <CreateRouteModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateRoute}
      />
    </div>
  );
}
