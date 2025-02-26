import { Layers } from "lucide-react"

interface NoBatchIllustrationProps {
  description?: string
}

export default function NoBatchIllustration({
  description = "You haven't created any batches yet",
}: NoBatchIllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <Layers className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-2xl font-semibold tracking-tight">No batch created yet</h3>
      <p className="mb-6 max-w-md text-muted-foreground">{description}</p>
    </div>
  )
}

