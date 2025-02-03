export function LessonSkeleton() {
  return (
    <div className="flex animate-pulse items-start gap-4 rounded-lg border p-4">
      <div className="h-10 w-10 rounded-md bg-muted" />
      <div className="flex-1 space-y-3">
        <div className="h-4 w-1/4 rounded bg-muted" />
        <div className="h-3 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/4 rounded bg-muted" />
      </div>
    </div>
  )
}

