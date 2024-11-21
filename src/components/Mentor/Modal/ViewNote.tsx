"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Trash2 } from 'lucide-react'

interface ViewNoteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
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
  };
  onDelete: () => void;
}

export function ViewNote({ isOpen, setIsOpen, note, onDelete }: ViewNoteProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You just sent a note!</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="space-y-4 pt-4">
            {note.file ? (
              <div className="overflow-hidden rounded-md border">
                {note.file.type === 'image' ? (
                  <img 
                    src={note.file.url} 
                    alt={`Attached by ${note.sender.name}`} 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="p-4 bg-muted flex items-center justify-between">
                    <span className="text-sm font-medium">{note.file.name}</span>
                    <a 
                      href={note.file.url} 
                      download 
                      className="text-sm text-primary hover:underline"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No file or image provided</p>
            )}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Message:</h4>
              <p className="text-sm">{note.message}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              From: {note.sender.name} ({note.sender.role})
            </p>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Note
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
