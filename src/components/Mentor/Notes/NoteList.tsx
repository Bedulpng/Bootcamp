import { Note } from "./page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NoteListProps = {
  notes: Note[]; // All notes
  filter: "All" | "Trainee" | "Admin"; // Current filter state
  setFilter: (value: "All" | "Trainee" | "Admin") => void; // Function to update the filter
};

export default function NoteList({ notes, filter, setFilter }: NoteListProps) {
  const filteredNotes = notes.filter((note) => {
    if (filter === "All") return true; // Show all notes
    return note.type === filter; // Show only notes matching the filter type
  });

  return (
    <div className="space-y-4">
      {/* Filter Dropdown */}
      <div className="flex justify-end">
        <Select value={filter} onValueChange={(value) => setFilter(value as "All" | "Trainee" | "Admin")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter notes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Notes</SelectItem>
            <SelectItem value="Trainee">Trainee Notes</SelectItem>
            <SelectItem value="Admin">Admin Notes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant={note.type === "Trainee" ? "default" : "destructive"} className="mb-2">
                  {note.type === "Trainee" ? (
                    <>
                      <User className="w-4 h-4 mr-1" /> Trainee
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-1" /> Admin
                    </>
                  )}
                </Badge>
              </div>
              {note.type === "Trainee" && note.traineeName && (
                <p className="text-sm text-gray-500 mb-2">Note for: {note.traineeName}</p>
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
