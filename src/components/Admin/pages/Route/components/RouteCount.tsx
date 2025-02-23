interface RouteCountProps {
  count: number
  total: number
}

export function RouteCount({ count, total }: RouteCountProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${(count / total) * 100}%` }} />
      </div>
      <span className="text-sm text-muted-foreground">
        {count} route{count === 1 ? "" : "s"}
      </span>
    </div>
  )
}

