import { useParams, Link } from 'react-router-dom';
import { TraineeList } from './TraineeCard';
import { initialClasses } from './data';
import { ArrowLeft } from 'lucide-react';

export function TraineePage() {
  const { classId, batchId } = useParams();
  
  if (!classId || !batchId || !initialClasses[classId]) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Class or batch not found.</p>
        <Link to="/dashboardm/note" className="text-blue-600 hover:underline">Return to class list</Link>
      </div>
    );
  }

  const trainingClass = initialClasses[classId];
  const batch = trainingClass.batches[parseInt(batchId)];

  if (!batch) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Batch not found.</p>
        <Link to="/dashboardm/note" className="text-blue-600 hover:underline">Return to class list</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/dashboardm/note"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Classes</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">
            {trainingClass.name} - Batch {batchId}
          </h1>
        </div>
      </div>

      <TraineeList trainees={batch.trainees} />
    </div>
  );
}