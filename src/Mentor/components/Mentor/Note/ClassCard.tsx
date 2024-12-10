import { TestTube2, Code2, Palette } from 'lucide-react';
import { TrainingClass } from './types';

interface ClassCardProps {
  trainingClass: TrainingClass;
  selectedBatch: number | null;
  onBatchSelect: (batchId: number) => void;
}

export function ClassCard({ trainingClass, selectedBatch, onBatchSelect }: ClassCardProps) {
  const getIcon = () => {
    switch (trainingClass.icon) {
      case 'test-tube-2':
        return <TestTube2 className="w-6 h-6" />;
      case 'code-2':
        return <Code2 className="w-6 h-6" />;
      case 'palette':
        return <Palette className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const colorClasses = {
    violet: 'bg-violet-50 border-violet-200 hover:bg-violet-100',
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${colorClasses[trainingClass.color as keyof typeof colorClasses]}`}>
          {getIcon()}
        </div>
        <h2 className="text-xl font-semibold">{trainingClass.name}</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {Object.values(trainingClass.batches).map((batch) => (
          <button
            key={batch.id}
            onClick={() => onBatchSelect(batch.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedBatch === batch.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
          >
            Batch {batch.id}
          </button>
        ))}
      </div>
    </div>
  );
}