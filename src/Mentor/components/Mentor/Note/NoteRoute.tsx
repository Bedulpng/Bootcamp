import { useNavigate } from 'react-router-dom';
import { ClassCard } from './ClassCard';
import { initialClasses } from './data';

export function NoteRoute() {
  const navigate = useNavigate();

  const handleBatchSelect = (classId: string, batchId: number) => {
    navigate(`/dashboard/note/${classId}/batch/${batchId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
      </div>

      <div className="grid gap-6">
        {Object.values(initialClasses).map((trainingClass) => (
          <ClassCard
            key={trainingClass.id}
            trainingClass={trainingClass}
            selectedBatch={null}
            onBatchSelect={(batchId) => handleBatchSelect(trainingClass.id, batchId)}
          />
        ))}
      </div>
    </div>
  );
}