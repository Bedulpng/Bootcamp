import type { Route, RouteGroup } from "../types/types"

export const allRoles = ["admin", "mentor", "student", "teacher"] as const

export const routes: Route[] = [
  { path: "/mentor/dashboard", roles: ["admin", "mentor"] },
  { path: "/mentor/students", roles: ["admin", "mentor"] },
  { path: "/student/courses", roles: ["admin", "student"] },
  { path: "/student/assignments", roles: ["admin", "student"] },
  { path: "/teacher/classes", roles: ["admin", "teacher"] },
  { path: "/teacher/grades", roles: ["admin", "teacher"] },
  { path: "/admin/users", roles: ["admin"] },
  { path: "/admin/settings", roles: ["admin"] },
]

export function groupRoutes(routes: Route[]): RouteGroup[] {
  const groups = routes.reduce(
    (acc, route) => {
      const basePath = route.path.split("/")[1]
      const groupName = basePath.charAt(0).toUpperCase() + basePath.slice(1)

      if (!acc[groupName]) {
        acc[groupName] = []
      }
      acc[groupName].push(route)
      return acc
    },
    {} as Record<string, Route[]>,
  )

  return Object.entries(groups).map(([name, routes]) => ({
    name,
    routes,
  }))
}

