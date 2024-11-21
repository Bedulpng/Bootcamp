import { ChevronRight, Plus, Pencil, Trash2, GraduationCap, Users } from 'lucide-react';
import type { Trainee, Note } from './types';

interface TraineeCardProps {
  trainee: Trainee;
  onAddNote: (traineeId: string) => void;
  onSendNote: (traineeId: string, note: Note) => void;
  onManageNotes: (traineeId: string) => void;
  onEditNote: (traineeId: string, note: Note) => void;
  onDeleteNote: (traineeId: string, noteId: string) => void;
}

export function TraineeCard({ 
  trainee, 
  onAddNote,  
  onManageNotes,
  onEditNote,
  onDeleteNote 
}: TraineeCardProps) {
  const hasNotes = trainee.notes.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-6 mb-6">
        <div className="flex-shrink-0">
          <img
            src={trainee.avatar}
            alt={`${trainee.name}'s profile`}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{trainee.name}</h3>
              <p className="text-sm text-gray-600">{trainee.email}</p>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-700">
                  <GraduationCap className="w-4 h-4 mr-1 text-blue-600" />
                  <span>{trainee.cohort}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Users className="w-4 h-4 mr-1 text-blue-600" />
                  <span>{trainee.batch}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onAddNote(trainee.id)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </button>
              <button
                onClick={() => onManageNotes(trainee.id)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {hasNotes && (
        <div className="space-y-4 mt-6">
          {trainee.notes.map(note => (
            <div key={note.id} className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Note</span>
                <span className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{note.content}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">By {note.mentorName}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    note.visibility === 'trainee' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {note.visibility === 'trainee' ? 'Visible to trainee' : 'Admin only'}
                  </span>
                  <button
                    onClick={() => onEditNote(trainee.id, note)}
                    className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Edit note"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteNote(trainee.id, note.id)}
                    className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}