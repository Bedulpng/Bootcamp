import { Card, CardContent } from "@/LandingPage/ui/card"
import { Button } from "@/LandingPage/ui/button"
import { Trainee} from '../../../types/Trainee'

type TraineeListProps = {
  trainees: Trainee[]
  onSelectTrainee: (trainee: Trainee) => void
}

export default function TraineeList({ trainees, onSelectTrainee }: TraineeListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Trainees</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trainees.map((trainee) => (
          <Card key={trainee.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{trainee.fullName}</h3>
              <p className="text-sm text-gray-600 mb-4">{trainee.email}</p>     
              <Button onClick={() => onSelectTrainee(trainee)}>Add Note</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

