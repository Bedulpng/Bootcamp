'use client';

import { useState } from 'react';
import Header from './Header';
import TraineeSearch from './TraineeSearch';
import TraineeList from './TraineeList';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type Trainee = {
  id: number;
  name: string;
  email: string;
};

export type Note = {
  id: number;
  content: string;
  type: 'Trainee' | 'Admin';
  traineeId?: number;
  traineeName?: string;
};

const mockTrainees: Trainee[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com' },
];

const mockNotes: Note[] = [
  {
    id: 1,
    content: 'Completed React basics course',
    type: 'Trainee',
    traineeId: 1,
    traineeName: 'John Doe',
  },
  {
    id: 2,
    content: 'Struggling with advanced JavaScript concepts',
    type: 'Trainee',
    traineeId: 2,
    traineeName: 'Jane Smith',
  },
  {
    id: 3,
    content: 'Excellent progress in Node.js module',
    type: 'Trainee',
    traineeId: 3,
    traineeName: 'Bob Johnson',
  },
  {
    id: 4,
    content: 'Needs improvement in CSS layouts',
    type: 'Trainee',
    traineeId: 4,
    traineeName: 'Alice Brown',
  },
  {
    id: 5,
    content: 'Scheduled 1-on-1 session for next week',
    type: 'Admin',
  },
  {
    id: 6,
    content: 'Update curriculum for React hooks',
    type: 'Admin',
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [filter, setFilter] = useState<'All' | 'Trainee' | 'Admin'>('All');
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('trainees');

  const addNote = (newNote: Omit<Note, 'id'>) => {
    setNotes([...notes, { ...newNote, id: Date.now() }]);
    setIsModalOpen(false);
    setSelectedTrainee(null);
    setActiveTab('notes');
  };

  const filteredNotes = notes.filter((note) => {
    if (filter === 'All') return true;
    return note.type === filter;
  });

  const filteredTrainees = mockTrainees.filter((trainee) => {
    const searchTermLower = searchTerm.trim().toLowerCase();
    return (
      trainee.name.toLowerCase().includes(searchTermLower) ||
      trainee.email.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header filter={filter} setFilter={setFilter} />
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trainees">Trainees</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="trainees" className="space-y-4">
            <TraineeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TraineeList
              trainees={filteredTrainees}
              onSelectTrainee={(trainee) => {
                setSelectedTrainee(trainee);
                setIsModalOpen(true);
              }}
            />
            {filteredTrainees.length === 0 && (
              <p className="text-gray-500">No trainees found.</p>
            )}
          </TabsContent>
          <TabsContent value="notes">
            <NoteList notes={filteredNotes} filter={filter} setFilter={setFilter} />
            {filteredNotes.length === 0 && (
              <p className="text-gray-500">No notes found.</p>
            )}
          </TabsContent>
        </Tabs>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>
            <NoteForm
              addNote={addNote}
              selectedTrainee={selectedTrainee}
              onCancel={() => setIsModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
