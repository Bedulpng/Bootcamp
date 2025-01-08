import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Install using `npm install jwt-decode`
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Note, Trainee } from "../../../types/Trainee";

type NoteFormProps = {
  addNote: (note: Note) => void; // Update local notes state after successful API call
  selectedTrainee: Trainee | null;
  onCancel: () => void;
};

export default function NoteForm({
  addNote,
  selectedTrainee,
  onCancel,
}: NoteFormProps) {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"FOR_TRAINEE" | "FOR_GRADER">(
    "FOR_TRAINEE"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Content is required.");
      return;
    }

    if (!selectedTrainee) {
      alert("Please select a trainee.");
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("refreshToken"); // Use refresh token for decoding
      if (!token) {
        alert("You must be logged in to add a note.");
        return;
      }

      // Decode the token to extract graderId and role
      const decodedToken: { id: string; role: string } = jwtDecode(token);
      const graderId = decodedToken.id;

      // Ensure the user is not a trainee
      if (decodedToken.role === "TRAINEE") {
        alert("Only mentors, graders, or admins can add notes.");
        return;
      }

      // Make the API request
      const response = await axios.post(
        "http://10.10.103.104:4000/mentor/note/add",
        {
          content,
          visibility,
          graderId, // Pass graderId from decoded token
          traineeId: selectedTrainee.id, // Include traineeId from the selected trainee
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the new note to the local state
      addNote(response.data);

      // Reset the form
      setContent("");
      setIsSubmitting(false);
      onCancel();
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedTrainee && (
        <p className="text-sm font-medium text-gray-700">
          Adding note for : {selectedTrainee.fullName}
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
        value={visibility}
        onValueChange={(value: "FOR_TRAINEE" | "FOR_GRADER") => setVisibility(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="FOR_TRAINEE" id="for_trainee" />
          <Label htmlFor="for_trainee" className="cursor-pointer">
            For Trainee
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="FOR_GRADER" id="for_grader" />
          <Label htmlFor="for_grader" className="cursor-pointer">
            For Grader
          </Label>
        </div>
      </RadioGroup>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </Button>
      </div>
    </form>
  );
}
