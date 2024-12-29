import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Note, Trainee } from "./page";

type NoteFormProps = {
  addNote: (note: Omit<Note, "id">) => void;
  selectedTrainee: Trainee | null;
  onCancel: () => void;
};

export default function NoteForm({
  addNote,
  selectedTrainee,
  onCancel,
}: NoteFormProps) {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"Trainee" | "Admin">("Trainee");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addNote({
        content,
        type,
        traineeId: selectedTrainee?.id,
        traineeName: selectedTrainee?.name,
      });
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedTrainee && (
        <p className="text-sm font-medium text-gray-700">
          Adding note for: {selectedTrainee.name}
        </p>
      )}
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your note here..."
        className="min-h-[100px]"
      />
      <RadioGroup
        className="space-y-2"
        value={type}
        onValueChange={(value: "Trainee" | "Admin") => setType(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Trainee" id="trainee" />
          <Label htmlFor="trainee" className="cursor-pointer">
            Trainee
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Admin" id="admin" />
          <Label htmlFor="admin" className="cursor-pointer">
            Admin
          </Label>
        </div>
      </RadioGroup>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Note</Button>
      </div>
    </form>
  );
}
