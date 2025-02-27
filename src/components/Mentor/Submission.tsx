import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { Class, Completions, Files, Trainee } from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NoteLesson from "./Notes/NoteLesson";
import FilePreview from "./FilePreview";
import NoSubmitted from "./NoTask";
const apiUrl = import.meta.env.VITE_API_URL;

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
  const [completionId, setCompletionId] = useState<string | undefined>(
    undefined
  );
  const [previewedFile, setPreviewedFile] = useState<string | null>(null);
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);

  // Function to handle file preview
  const handlePreviewFile = (filePath: string) => {
    setPreviewedFile(filePath);
  };

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
          `http://${apiUrl}/mentor/lesson/${id}/completions`
        );
        setCompletions(completionData.data); // Set the entire response data
        console.log("Completions:", completionData.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Narrow down the error type to AxiosError
          if (error.response && error.response.status === 404) {
            console.log("Lesson not found, falling back to challenge route...");
            try {
              const challengeData = await axios.get(
                `http://${apiUrl}/mentor/challenge/${id}/completions`
              );
              setCompletions(challengeData.data); // Set the data from the challenge route
              console.log("Challenge completions:", challengeData.data);
            } catch (challengeError) {
              console.error("Failed to fetch challenge:", challengeError);
            }
          } else {
            console.error("Failed to fetch lesson:", error);
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
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
        files: completion.submissionFiles,
      }))
    : [];

  console.log("Displayed students:", displayedStudents);
  // Add Note to the list (mock implementation)
  const addNote = (note: any) => {
    console.log("Note added:", note);
    setShowNoteForm(false); // Close the modal after adding a note
  };

  const handleCancel = () => {
    setShowNoteForm(false);
    setSelectedTrainee(null); // Reset selected trainee
  };


const handleFilterStatus = (status: string) => {
  setFilteredStatus(status);
};

// Determine the displayed students based on the selected filter
const filteredStudents =
  filteredStatus !== null
    ? displayedStudents.filter((student) => student.status === filteredStatus)
    : displayedStudents;

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
            <p className="cursor-pointer mb-3">
            {trainees.length} Assigned
          </p>
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
          <p className="cursor-pointer hover:text-blue-500" onClick={() => handleFilterStatus("SUBMITTED")}>
            {completions?.completions.filter(
              (completion) => completion.status === "SUBMITTED"
            ).length || 0}{" "}
            Submitted
          </p>
          <p className="cursor-pointer hover:text-blue-500" onClick={() => handleFilterStatus("GRADED")}>
            {completions?.completions.filter(
              (completion) => completion.status === "GRADED"
            ).length || 0}{" "}
            Graded
          </p>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Assignment</h2>
          {filteredStudents.length === 0 ? (
            <NoSubmitted />
          ) : (
            filteredStudents.map((student) => (
              <div key={student.id} className="p-2 border rounded-md">
                {/* Main Student Info */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    // Find the matching completion based on student.id
                    const matchingCompletion = completions?.completions.find(
                      (completion) => completion.user.id === student.id
                    );

                    // Extract user and completionId from the matching completion
                    const trainee = matchingCompletion?.user;
                    const selectedCompletionId = matchingCompletion?.id;

                    console.log(
                      "User selected:",
                      trainee,
                      "Completion ID:",
                      selectedCompletionId
                    );

                    // Update states
                    setSelectedTrainee(trainee || null); // Pass the user object to setSelectedTrainee
                    setCompletionId(selectedCompletionId || null); // Set the completionId
                    setShowNoteForm(true); // Show the note form
                  }}
                >
                  <FaRegUserCircle className="text-xl mr-2" />
                  <span>{student.name}</span>
                  <span className="ml-auto text-gray-500">
                    {student.status}
                  </span>
                </div>

                {/* Render File Names if Available */}
                {student.files && student.files.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-sm font-medium">Files:</h3>
                    <ul className="list-disc pl-4">
                      {student.files.map((file : Files) => (
                        <li key={file.id} className="flex items-center gap-2">
                          <span>{file.filename}</span>
                          <button
                            className="p-1 text-muted-foreground hover:text-primary transition"
                            onClick={() => handlePreviewFile(file.filepath)}
                            aria-label="Preview file"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Inline Preview */}
                {previewedFile && (
                  <FilePreview
                    filePath={previewedFile}
                    onClose={() => setPreviewedFile(null)}
                  />
                )}
              </div>
            ))
          )}
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
