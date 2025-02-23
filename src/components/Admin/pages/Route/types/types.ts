export type Role = "admin" | "mentor" | "student" | "teacher"

export interface Route {
  path: string
  roles: Role[]
}

export interface RouteGroup {
  name: string
  routes: Route[]
}

