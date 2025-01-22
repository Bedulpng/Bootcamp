"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchNotesByGrader } from "@/Api/FetchUsers";
import type { Note } from "@/types/Trainee";

interface GraderNotesProps {
  graderId: string;
  graderfullName: string;
  visibility: string;
  onBack: () => void;
}

export default function GraderNotes({
  graderId,
  graderfullName,
  visibility,
  onBack,
}: GraderNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isNoteContentOpen, setIsNoteContentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNotesByGrader(graderId, visibility);
        setNotes(data);
      } catch (err) {
        setError("Failed to load notes. Please try again later.");
        console.error("Error loading notes:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadNotes();
  }, [graderId]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center space-x-4">  
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Notes from {graderfullName}
        </h1>
      </div>
  
      {/* Content Section */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-500 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      ) : notes.length === 0 ? (
        <div className="rounded-lg border bg-gray-50 p-6 text-center text-gray-500">
          No notes found for this grader.
        </div>
      ) : (
        <div className="rounded-lg border bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Trainee Name</TableHead>
                <TableHead className="text-center">Visibility</TableHead>
                <TableHead className="text-center">Date Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note.id} className="hover:bg-gray-100">
                  <TableCell className="text-center font-medium text-gray-700">
                    {note.trainee.fullName}
                  </TableCell>
                  <TableCell
                    className={`text-center font-bold ${
                      note.visibility === "FOR_TRAINEE"
                        ? "text-blue-500"
                        : note.visibility === "FOR_GRADER"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {note.visibility === "FOR_TRAINEE"
                      ? "Trainee"
                      : note.visibility === "FOR_GRADER"
                      ? "Grader Only"
                      : "Unknown"}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {new Date(note.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedNote(note);
                        setIsNoteContentOpen(true);
                      }}
                    >
                      <Eye className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
  
      {/* Dialog Section */}
      <Dialog open={isNoteContentOpen} onOpenChange={setIsNoteContentOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Note Content
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Content</h4>
              <p className="whitespace-pre-wrap text-gray-600">
                {selectedNote?.content}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}
