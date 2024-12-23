import { Trainee } from '../../types/Trainee';
import { Button } from '../ui/button';

interface TraineeTableProps {
  trainees: Trainee[];
  onViewDetails: (trainee: Trainee) => void;
}

export function TraineeTable({ trainees, onViewDetails }: TraineeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b-2 border-blue-200">
            <th className="px-6 py-4 text-left text-lg font-bold text-blue-600">Name</th>
            <th className="px-6 py-4 text-left text-lg font-bold text-blue-600">Nickname</th>
            <th className="px-6 py-4 text-left text-lg font-bold text-blue-600">Batch</th>
            <th className="px-6 py-4 text-left text-lg font-bold text-blue-600">Class</th>
            <th className="px-6 py-4 text-left text-lg font-bold text-blue-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainees.map((trainee) => (
            <tr key={trainee.id} className="border-b border-blue-100 hover:bg-blue-50/50">
              <td className="px-6 py-4 text-lg">{trainee.fullName}</td>
              <td className="px-6 py-4 text-lg">{trainee.nickname}</td>
              <td className="px-6 py-4 text-lg">{trainee.batch}</td>
              <td className="px-6 py-4 text-lg">{trainee.class}</td>
              <td className="px-6 py-4">
                <Button className="bg-wgs-blue" onClick={() => onViewDetails(trainee)}>
                  Peek 👀
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}