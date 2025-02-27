"use client";

import { useState, useEffect } from "react";
import { Plus, ArrowUp } from "lucide-react";
import axios from "axios";
import type { Roles, RoutePermissions } from "@/types/Trainee";
import { RouteAccessModal } from "./Modal/RouteAccess";
import { CreateRouteModal } from "./Modal/CreateRoute";
import { SearchBar } from "./components/SearchBar";
import { Button } from "@/components/ui/button";

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<RoutePermissions | null>(null);
  const [routeData, setRouteData] = useState<RoutePermissions[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allRoles, setAllRoles] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://10.10.103.195:4000/admin/role/roles");
        const roles = response.data.tableRoles.map((role: Roles) => ({
          id: role.id,
          name: role.name,
        }));
        setAllRoles(roles);

        const transformedRoutes: RoutePermissions[] = response.data.tableRoles.flatMap((role: Roles) =>
          role.permissions.map((permission) => ({
            id: permission.id,
            route: permission.route,
            role: [{ id: role.id, name: role.name, permissions: [] }],
          }))
        );

        const mergedRoutes: RoutePermissions[] = [];
        transformedRoutes.forEach((route) => {
          const existing = mergedRoutes.find((r) => r.route === route.route);
          if (existing) {
            existing.role.push(...route.role);
          } else {
            mergedRoutes.push(route);
          }
        });

        setRouteData(mergedRoutes);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setShowScrollButton(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setShowScrollButton(false), 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleSaveAccess = (path: string, roleIds: string[]) => {
    setRouteData((current) =>
      current.map((route) =>
        route.route === path
          ? {
              ...route,
              role: roleIds.map((id) => ({
                id,
                name: id.toUpperCase(),
                permissions: [],
              })),
            }
          : route
      )
    );
  };

  const handleRouteClick = (route: RoutePermissions) => setSelectedRoute(route);

  const groupedRoutes = routeData.reduce((acc, route) => {
    const basePath = route.route.split("/")[1] || "root";
    if (!acc[basePath]) acc[basePath] = [];
    acc[basePath].push(route);
    return acc;
  }, {} as Record<string, RoutePermissions[]>);

  return (
    <div className="min-h-screen bg-background relative">
      {showCreateModal || selectedRoute !== null ? (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-20"></div>
      ) : null}

      <div className={`relative z-10 transition-all ${showCreateModal || selectedRoute ? "blur-sm pointer-events-none" : ""}`}>
        <div className="border-b bg-background/90">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <Button onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Create Route
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {loading ? (
            <div className="text-center">Loading routes...</div>
          ) : (
            Object.entries(groupedRoutes).map(([basePath, routes]) => (
              <div key={basePath} className="mb-6">
                <h2 className="text-lg font-semibold mb-2 capitalize">{basePath}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {routes.map((route) => (
                    <div
                      key={route.route}
                      className="p-4 border rounded cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleRouteClick(route)}
                    >
                      <p className="font-semibold">{route.route}</p>
                      <p className="text-sm text-muted-foreground">
                        Roles: {route.role.map((r) => r.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-10 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity duration-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <RouteAccessModal
        route={selectedRoute}
        isOpen={!!selectedRoute}
        onClose={() => setSelectedRoute(null)}
        onSave={handleSaveAccess}
      />

      <CreateRouteModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} allRoles={allRoles} />
    </div>
  );
}
