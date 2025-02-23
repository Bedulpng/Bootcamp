"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Route, RouteGroup } from "../types/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RouteBadge } from "./RouteBadge"
import { RouteCount } from "./RouteCount"
import { cn } from "@/lib/utils"

interface RouteGroupProps {
  group: RouteGroup
  onRouteClick: (route: Route) => void
  totalRoutes: number
}

export function RouteGroupComponent({ group, onRouteClick, totalRoutes }: RouteGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent justify-start"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              {group.name}
              <ChevronDown
                className={cn("h-4 w-4 transition-transform flex-shrink-0", isExpanded ? "rotate-0" : "-rotate-90")}
              />
            </CardTitle>
          </Button>
          <div className="pl-6 sm:pl-0">
            <RouteCount count={group.routes.length} total={totalRoutes} />
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="grid gap-2 pt-0">
          {group.routes.map((route) => (
            <Button
              key={route.path}
              variant="outline"
              className="w-full min-h-[44px] justify-between gap-4 transition-colors hover:bg-accent px-3 sm:px-4"
              onClick={() => onRouteClick(route)}
            >
              <span className="truncate text-left text-sm">{route.path}</span>
              <RouteBadge role={group.name.toLowerCase()} />
            </Button>
          ))}
        </CardContent>
      )}
    </Card>
  )
}

