import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Mentor } from "@/types/Trainee"
import { useNavigate } from "react-router-dom"

interface ChallengeCardProps {
  title: string
  description: string
  mentor: Mentor
  completionStatus: string
  className?: string
  selectedChallengeId: string // Add this prop to identify the challenge
}

export function ChallengeCard({ title, description, mentor, completionStatus, className, selectedChallengeId }: ChallengeCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trainee/challenge/${selectedChallengeId}`);
  };
    
  return (
    <div
      onClick={handleClick}
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
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-sm text-muted-foreground">From Mentor: <span className="font-bold"> {mentor.fullName} </span></p>
      </div>
      <div className="absolute right-4 top-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            completionStatus === "ASSIGNED" && "bg-blue-100 text-blue-800",
            completionStatus === "SUBMITTED" && "bg-green-100 text-green-800",
            completionStatus === "NOTSUBMITTED" && "bg-red-100 text-red-800",
            completionStatus === "LATE" && "bg-yellow-100 text-yellow-800",
            completionStatus === "GRADED" && "bg-green-100 text-green-500",
          )}
        >
          {completionStatus}
        </span>
      </div>
    </div>
  )
}

