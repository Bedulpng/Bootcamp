import { Note } from "../../../types/Trainee";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Lock, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

type NoteListProps = {
  notes: Note[]; // All notes
  filter: "All" | "FOR_TRAINEE" | "FOR_GRADER"; // Current filter state
  setFilter: (value: "All" | "FOR_TRAINEE" | "FOR_GRADER") => void; // Function to update the filter
  onDelete: (noteId: string) => void; // Callback to update notes after deletion
};

export default function NoteList({ notes, filter, setFilter, onDelete }: NoteListProps) {
  const handleDelete = async (noteId: string) => {
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) {
        alert("You must be logged in to delete a note.");
        return;
      }

      // Make the delete API request
      await axios.delete(`http://192.168.1.7:4000/mentor/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the parent component's state
      onDelete(noteId);
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (filter === "All") return true; // Show all notes
    return note.visibility === filter; // Show only notes matching the filter type
  });

  return (
    <div className="space-y-4">
      {/* Filter Dropdown */}
      <div className="flex justify-end">
        <Select
          value={filter}
          onValueChange={(value) => setFilter(value as "All" | "FOR_TRAINEE" | "FOR_GRADER")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter notes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Notes</SelectItem>
            <SelectItem value="FOR_TRAINEE">Trainee Notes</SelectItem>
            <SelectItem value="FOR_GRADER">Grader Notes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="overflow-hidden relative">
            <CardContent className="p-4">
              {/* Delete Icon */}
              <Trash
                className="w-5 h-5 text-red-500 absolute top-2 right-2 cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(note.id)}
                // title="Delete Note"
              />
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant={note.visibility === "FOR_TRAINEE" ? "default" : "destructive"}
                  className="mb-2"
                >
                  {note.visibility === "FOR_TRAINEE" ? (
                    <>
                      <User className="w-4 h-4 mr-1" /> Trainee
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-1" /> Grader
                    </>
                  )}
                </Badge>
              </div>
              {note.visibility === "FOR_TRAINEE" && note.trainee.fullName && (
                <div className="text-sm text-gray-500 mb-2">
                <p>
                  Note for : <span className="font-bold">{note.trainee.fullName}</span>
                </p>
                <p className="mb-4">{note.trainee.email}</p>
              </div>
              )}
              {note.visibility === "FOR_GRADER" && note.grader.fullName && (
                <div className="text-sm text-gray-500 mb-2">
                <p>
                  Note for : <span className="font-bold">{note.trainee.fullName}</span>
                </p>
                <p className="mb-4">{note.trainee.email}</p>
              </div>
              )}
              <p className="text-gray-700">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && <p className="text-gray-500">No notes found.</p>}
    </div>
  );
}
