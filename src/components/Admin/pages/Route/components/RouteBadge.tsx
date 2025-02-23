import { cn } from "@/lib/utils"

interface RouteBadgeProps {
  role: string
}

const roleColors: Record<string, string> = {
  admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  mentor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  student: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  teacher: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export function RouteBadge({ role }: RouteBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        roleColors[role] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      )}
    >
      {role}
    </span>
  )
}

