import { useState } from 'react';
import { Trainee } from './types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NoteList } from './NoteList';
import { NoteModal } from './NoteModal';

interface TraineeListProps {
  trainees: Trainee[];
}

export function TraineeList({ trainees }: TraineeListProps) {
  const [expandedTrainee, setExpandedTrainee] = useState<string | null>(null);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);

  const handleAddNoteClick = (trainee: Trainee) => {
    setSelectedTrainee(trainee);
    setNoteModalOpen(true);
  };

  const handleNoteModalClose = () => {
    setNoteModalOpen(false);
    setSelectedTrainee(null);
  };

  const handleSaveNote = (note: Omit<Trainee['notes'][0], 'id' | 'createdAt'>) => {
    if (!selectedTrainee) return;

    console.log('Note saved for trainee:', selectedTrainee.name, note);

    // Add the new note to the trainee's note list (for local state update).
    // In a real application, you'd also send this to the backend.
    selectedTrainee.notes = [
      ...selectedTrainee.notes,
      { id: String(Date.now()), createdAt: new Date().toISOString(), ...note },
    ];

    setNoteModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {trainees.map((trainee) => (
        <div
          key={trainee.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100"
        >
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() =>
              setExpandedTrainee(
                expandedTrainee === trainee.id ? null : trainee.id
              )
            }
          >
            <div className="flex items-center space-x-4">
              <img
                src={trainee.avatar}
                alt={trainee.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{trainee.name}</h3>
                <p className="text-sm text-gray-500">{trainee.email}</p>
              </div>
              {expandedTrainee === trainee.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

          {expandedTrainee === trainee.id && (
            <div className="px-4 pb-4 border-t border-gray-100 mt-2 pt-4">
              <NoteList
                notes={trainee.notes}
                onAddNote={() => handleAddNoteClick(trainee)}
              />
            </div>
          )}
        </div>
      ))}

      {isNoteModalOpen && selectedTrainee && (
        <NoteModal
          isOpen={isNoteModalOpen}
          onClose={handleNoteModalClose}
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
}
