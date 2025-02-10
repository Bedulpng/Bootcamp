import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Class, Completions, Trainee } from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NoteLesson from "./Notes/NoteLesson";

function Challenge() {
  const { classId, id } = useParams<{
    classId: string;
    id: string;
  }>();
  const [expanded, setExpanded] = useState<boolean>(true);
  const [classes, setClasses] = useState<Class[]>([]);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [completions, setCompletions] = useState<Completions | null>(null);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;

  // State for NoteForm
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null); 
  const [completionId, setCompletionId] = useState<string | undefined>(undefined);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await fetchClassById(classId);
        setClasses(classData);
        setTrainees(classData.map((t) => t.users).flat()); // Flatten users from all classes
      } catch (error) {
        console.error("Failed to fetch class:", error);
      }
    };

    fetchData();
  }, [classId]);

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const completionData = await axios.get(
          `http://10.10.103.13:4000/mentor/lesson/${id}/completions`
        );
        setCompletions(completionData.data); // Set the entire response data
        console.log("Completions:", completionData.data);
      } catch (error) {
        console.error("Failed to fetch class:", error);
      }
    };

    fetchCompletion();
  }, [id]);

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Map completions data into a format similar to the mockStudents
  const displayedStudents = completions
    ? completions.completions.slice(startIndex, endIndex).map((completion) => ({
        id: completion.user.id,
        name: completion.user.fullName,
        status: completion.status,
      }))
    : [];

  // Add Note to the list (mock implementation)
  const addNote = (note: any) => {
    console.log("Note added:", note);
    setShowNoteForm(false); // Close the modal after adding a note
  };

  const handleCancel = () => {
    setShowNoteForm(false);
    setSelectedTrainee(null); // Reset selected trainee
  };

  return (
    <div className="flex h-screen p-4">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          expanded ? "w-1/4" : "w-16"
        } bg-white shadow-md p-4 rounded-lg overflow-hidden`}
      >
        <h2
          className="text-lg font-semibold mb-4 cursor-pointer flex items-center"
          onClick={toggleExpand}
        >
          {expanded ? (
            <>
              Assigned <ChevronLeft className="ml-2" />
            </>
          ) : (
            <ChevronRight />
          )}
        </h2>
        {expanded && (
          <div>
            {classes.map((t) => (
              <div key={t.id}>
                {t.users.map((user) => (
                  <div key={user.id} className="flex items-center p-2 border-b">
                    <FaRegUserCircle className="text-xl mr-2" />
                    <span>{user.fullName}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg transition-all duration-300">
        <h1 className="text-xl font-bold mb-4"> Submission </h1>
        <div className="flex items-center gap-8">
          <p>{trainees.length} Assigned</p>
          <p>
            {
              completions?.completions.filter(
                (completion) => completion.status === "SUBMITTED"
              ).length
            }{" "}
            Submitted
          </p>
          <p>
            {
              completions?.completions.filter(
                (completion) => completion.status === "GRADED"
              ).length
            }{" "}
            Graded
          </p>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Assignment</h2>
          {displayedStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center p-2 border rounded-md cursor-pointer"
              onClick={() => {
                // Find the matching completion based on student.id
                const matchingCompletion = completions?.completions.find(
                  (completion) => completion.user.id === student.id
                );
              
                // Extract user and completionId from the matching completion
                const trainee = matchingCompletion?.user;
                const selectedCompletionId = matchingCompletion?.id;
              
                console.log("User selected:", trainee, "Completion ID:", selectedCompletionId);
              
                // Update states
                setSelectedTrainee(trainee || null); // Pass the user object to setSelectedTrainee
                setCompletionId(selectedCompletionId || null); // Set the completionId
                setShowNoteForm(true); // Show the note form
              }}
              
            >
              <FaRegUserCircle className="text-xl mr-2" />
              <span>{student.name}</span>
              <span className="ml-auto text-gray-500">{student.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          {page > 1 && (
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setPage(page - 1)}
            >
              Back
            </button>
          )}
          {completions && endIndex < completions.completions.length && (
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* NoteForm Modal */}
      <Dialog open={showNoteForm} onOpenChange={setShowNoteForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grade Submisson</DialogTitle>
          </DialogHeader>
          <NoteLesson
            addNote={addNote}
            selectedTrainee={selectedTrainee}
            onCancel={handleCancel}
            completionId={completionId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Challenge;
