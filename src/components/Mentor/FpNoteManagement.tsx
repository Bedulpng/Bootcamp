"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Pencil, Eye } from 'lucide-react'
import { AddFpNote } from './Modal/AddFpNote'
import { ViewFpNote } from './Modal/ViewFpNote'

interface Note {
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
}

interface Trainee {
  id: string;
  name: string;
  class: string;
  batch: string;
  github: string;
  note: Note | null;
  fpNote: Note | null;
}

interface FpNoteManagementButtonProps {
  trainee: Trainee;
  onAddNote: (traineeId: string, note: { message: string; file?: File }) => void;
  onDeleteNote: (traineeId: string, noteId: string) => void;
}

export function FpNoteManagementButton({ trainee, onAddNote, onDeleteNote }: FpNoteManagementButtonProps) {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [isViewNoteOpen, setIsViewNoteOpen] = useState(false)

  const handleAddNote = (note: { message: string; file?: File }) => {
    onAddNote(trainee.id, note)
    setIsAddNoteOpen(false)
  }

  const handleDeleteNote = () => {
    if (trainee.fpNote) {
      onDeleteNote(trainee.id, trainee.fpNote.id)
      setIsViewNoteOpen(false)
    }
  }

  const handleClick = () => {
    if (trainee.fpNote === null) {
      setIsAddNoteOpen(true)
    } else {
      setIsViewNoteOpen(true)
    }
  }

  return (
    <>
      <div className={`inline-block rounded-md ${trainee.fpNote === null ? 'bg-gray-100' : 'bg-green-100'}`}>
        <Button 
          variant="ghost" 
          size="sm"
          className={`text-sm font-medium ${trainee.fpNote === null ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200' : 'text-green-600 hover:text-green-800 hover:bg-green-200'}`}
          onClick={handleClick}
        >
          {trainee.fpNote === null ? (
            <>Add Presentation Note<Pencil className="ml-2 h-4 w-4" /></>
          ) : (
            <>View Note <Eye className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
      
      {trainee.fpNote === null ? (
        <AddFpNote 
          isOpen={isAddNoteOpen} 
          setIsOpen={setIsAddNoteOpen}
          onSubmit={handleAddNote}
        />
      ) : (
        <ViewFpNote
          isOpen={isViewNoteOpen}
          setIsOpen={setIsViewNoteOpen}
          note={trainee.fpNote}
          onDelete={handleDeleteNote}
        />
      )}
    </>
  )
}

