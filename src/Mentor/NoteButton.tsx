"use client"

import { useState } from 'react'
import { Button } from "@/Landing/components/ui/button"
import { Pencil, Eye } from 'lucide-react'
import { AddNote } from './Modal/AddNote'
import { ViewNote } from './Modal/ViewNote'

interface NoteManagementButtonProps {
  trainee: {
    id: string;
    note: {
      id: string;
      message: string;
      sender: {
        name: string;
        role: string;
      };
      file?: {
        url: string;
        type: 'image' | 'file';
        name: string;
      };
    } | null;
  };
  onAddNote: (traineeId: string, note: { message: string; file?: File }) => void;
  onDeleteNote: (traineeId: string, noteId: string) => void;
}

export function NoteManagementButton({ trainee, onAddNote, onDeleteNote }: NoteManagementButtonProps) {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [isViewNoteOpen, setIsViewNoteOpen] = useState(false)

  const handleAddNote = (note: { message: string; file?: File }) => {
    onAddNote(trainee.id, note)
    setIsAddNoteOpen(false)
  }

  const handleDeleteNote = () => {
    if (trainee.note) {
      onDeleteNote(trainee.id, trainee.note.id)
      setIsViewNoteOpen(false)
    }
  }

  const handleClick = () => {
    if (trainee.note === null) {
      setIsAddNoteOpen(true)
    } else {
      setIsViewNoteOpen(true)
    }
  }

  return (
    <>
      <div className={`inline-block rounded-md ${trainee.note === null ? 'bg-gray-100' : 'bg-cyan-100'}`}>
        <Button 
          variant="ghost" 
          size="sm"
          className={`text-sm font-medium ${trainee.note === null ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200' : 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-200'}`}
          onClick={handleClick}
        >
          {trainee.note === null ? (
            <>Add Note<Pencil className="ml-2 h-4 w-4" /></>
          ) : (
            <>View Notes <Eye className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
      
      {trainee.note === null ? (
        <AddNote 
          isOpen={isAddNoteOpen} 
          setIsOpen={setIsAddNoteOpen}
          onSubmit={handleAddNote}
        />
      ) : (
        <ViewNote
          isOpen={isViewNoteOpen}
          setIsOpen={setIsViewNoteOpen}
          note={trainee.note}
          onDelete={handleDeleteNote}
        />
      )}
    </>
  )
}

