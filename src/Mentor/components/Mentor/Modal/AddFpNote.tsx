"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload } from 'lucide-react'
import { Button } from "@/LandingPage/ui/button"
import { Textarea } from "@/LandingPage/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/LandingPage/ui/dialog"

interface AddFpNoteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (note: { message: string; file?: File }) => void;
}

export function AddFpNote({ isOpen, setIsOpen, onSubmit }: AddFpNoteProps) {
  const [file, setFile] = useState<File | null>(null)
  const [note, setNote] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value.slice(0, 300))
  }

  const handleSubmitNote = () => {
    onSubmit({ message: note, file: file || undefined })
    setNote('')
    setFile(null)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Final Presentation Note</DialogTitle>
          <DialogDescription>
            Upload a file, add a note for the final presentation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-between">
                <span className="text-sm truncate">{file.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                <Upload className="mx-auto h-8 w-8 mb-2" />
                <p>Drag & drop a file here, or click to select</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Final Presentation Note</label>
            <Textarea
              id="note"
              placeholder="Add a note for the final presentation (max 300 characters)"
              value={note}
              onChange={handleNoteChange}
              maxLength={300}
              rows={4}
            />
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span>{note.length}/300</span>
              <div>
                <Button variant="default" size="sm" onClick={handleSubmitNote} className="ml-2">
                  Submit Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

