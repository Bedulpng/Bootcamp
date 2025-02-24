import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Note, Trainee} from "../../../types/Trainee";

type NoteFormProps = {
  addNote: (note: Note) => void;
  selectedTrainee: Trainee | null;
  onCancel: () => void;
};

export default function NoteForm({ addNote, selectedTrainee, onCancel }: NoteFormProps) {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"FOR_TRAINEE" | "FOR_GRADER">("FOR_TRAINEE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrainee) {
      alert("Please select a trainee.");
      return;
    }
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) {
        alert("You must be logged in to add a note.");
        return;
      }

      const decodedToken: { id: string; role: string } = jwtDecode(token);
      const graderId = decodedToken.id;
      if (decodedToken.role === "TRAINEE") {
        alert("Only mentors, graders, or admins can add notes.");
        return;
      }

      const response = await axios.post(
        "http://10.10.103.248:4000/mentor/note/add",
        {
          content,
          visibility,
          graderId,
          traineeId: selectedTrainee.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addNote(response.data);
      setContent("");
      setIsSubmitting(false);
      onCancel();
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {selectedTrainee && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">{selectedTrainee.fullName}</p>
        </div>
      )}

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your note here..."
        className="min-h-[120px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Visibility</p>
        <RadioGroup
          className="space-y-2"
          value={visibility}
          onValueChange={(value: "FOR_TRAINEE" | "FOR_GRADER") => setVisibility(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FOR_TRAINEE" id="for_trainee" />
            <Label htmlFor="for_trainee" className="cursor-pointer text-gray-700">
              For Trainee
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FOR_GRADER" id="for_grader" />
            <Label htmlFor="for_grader" className="cursor-pointer text-gray-700">
              For Grader
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel} className="px-4 py-2 border-gray-300">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white">
          {isSubmitting ? "Adding..." : "Add Note"}
        </Button>
      </div>
    </form>
  );
}