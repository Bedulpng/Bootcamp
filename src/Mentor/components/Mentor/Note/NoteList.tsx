import { useState } from 'react';
import { Note } from './types';
import { Clock, Eye, EyeOff, Plus } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  onAddNote: () => void;
}

export function NoteList({ notes, onAddNote }: NoteListProps) {
  const [showAdminNotes, setShowAdminNotes] = useState(true);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const visibleNotes = showAdminNotes 
    ? notes 
    : notes.filter(note => note.visibility === 'trainee');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAdminNotes(!showAdminNotes)}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {showAdminNotes ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide Admin Notes</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show Admin Notes</span>
              </>
            )}
          </button>
        </div>
        <button
          onClick={onAddNote}
          className="flex items-center space-x-1 px-3 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Note</span>
        </button>
      </div>

      <div className="space-y-3">
        {visibleNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg border ${
              note.visibility === 'admin'
                ? 'bg-amber-50 border-amber-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium">{note.mentorName}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              </div>
              {note.visibility === 'admin' && (
                <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                  Admin Only
                </span>
              )}
            </div>
            <p className="text-gray-700">{note.content}</p>
          </div>
        ))}
        
        {visibleNotes.length === 0 && (
          <p className="text-center text-gray-500 py-4">No notes available.</p>
        )}
      </div>
    </div>
  );
}