import { useState } from 'react';
import { Search } from 'lucide-react';
import { TraineeCard } from './TraineeCard';
import { NoteModal } from './NoteModal';
import type { Trainee, Note } from './types';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

const mockTrainees: Trainee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    cohort: 'Quality Assurance',
    batch: '12',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    notes: [
      {
        id: '1',
        content: 'Excellent progress in React fundamentals. Shows strong problem-solving skills.',
        visibility: 'trainee',
        createdAt: '2024-03-10T10:00:00Z',
        mentorId: '1',
        mentorName: 'John Mentor'
      }
    ]
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.s@example.com',
    cohort: 'Full Stack Development',
    batch: '12',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    notes: []
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol.w@example.com',
    cohort: 'UI/UX Design',
    batch: '12',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    notes: [
      {
        id: '2',
        content: 'Internal: Consider fast-tracking to advanced modules.',
        visibility: 'admin',
        createdAt: '2024-03-09T15:30:00Z',
        mentorId: '2',
        mentorName: 'Sarah Mentor'
      }
    ]
  }
];

function Note() {
  const navigate = useNavigate()
  const [trainees, setTrainees] = useState<Trainee[]>(mockTrainees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

  const filteredTrainees = trainees.filter(trainee => 
    trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainee.cohort.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = (traineeId: string) => {
    setSelectedTrainee(traineeId);
    setEditingNote(undefined);
    setIsModalOpen(true);
  };

  const handleEditNote = (traineeId: string, note: Note) => {
    setSelectedTrainee(traineeId);
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (traineeId: string, noteId: string) => {
    setTrainees(prevTrainees => 
      prevTrainees.map(trainee => 
        trainee.id === traineeId
          ? { ...trainee, notes: trainee.notes.filter(note => note.id !== noteId) }
          : trainee
      )
    );
  };

  const handleSaveNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    if (!selectedTrainee) return;

    setTrainees(prevTrainees => 
      prevTrainees.map(trainee => {
        if (trainee.id !== selectedTrainee) return trainee;

        const newNote = {
          ...note,
          id: editingNote?.id ?? crypto.randomUUID(),
          createdAt: editingNote?.createdAt ?? new Date().toISOString()
        };

        return {
          ...trainee,
          notes: editingNote
            ? trainee.notes.map(n => n.id === editingNote.id ? newNote : n)
            : [...trainee.notes, newNote]
        };
      })
    );

    setIsModalOpen(false);
    setSelectedTrainee(null);
    setEditingNote(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div>
        <Button
          onClick={() => navigate(-1)}  // Go back to the previous page
          variant="outline"
          className="bg-gray-400 text-white border-none hover:bg-gray-500 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Trainee Management</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search trainees by name, email, or cohort..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredTrainees.map(trainee => (
            <TraineeCard
              key={trainee.id}
              trainee={trainee}
              onAddNote={handleAddNote}
              onSendNote={() => {}}
              onManageNotes={() => {}}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
            />
          ))}
        </div>

        <NoteModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTrainee(null);
            setEditingNote(undefined);
          }}
          onSave={handleSaveNote}
          initialNote={editingNote}
        />
      </div>
    </div>
  );
}

export default Note;