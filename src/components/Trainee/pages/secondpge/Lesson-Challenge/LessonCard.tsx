import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface LessonCardProps {
  title: string
  details: string
  mentor: string
  status: "assigned" | "submitted" | "notsubmitted"
  className?: string
}

export function LessonCard({ title, details, mentor, status, className }: LessonCardProps) {
  return (
    <div
      className={cn(
        "group relative flex items-start gap-4 rounded-lg border p-4 transition-all hover:shadow-md",
        className,
      )}
    >
      <div className="rounded-md border p-2">
        <FileText className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{details}</p>
        <p className="text-sm text-muted-foreground">Mentor: {mentor}</p>
      </div>
      <div className="absolute right-4 top-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            status === "assigned" && "bg-blue-100 text-blue-800",
            status === "submitted" && "bg-green-100 text-green-800",
            status === "notsubmitted" && "bg-red-100 text-red-800",
          )}
        >
          {status}
        </span>
      </div>
    </div>
  )
}

