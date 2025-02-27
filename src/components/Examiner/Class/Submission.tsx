import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { ChevronRight, ChevronLeft, Eye } from "lucide-react";
import {
  Class,
  Completions,
  Files,
  Trainee,
  PresentationCompletion,
} from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilePreview from "./FilePreview";
import NoSubmitted from "./NoTask";
import { DialogTrigger } from "@radix-ui/react-dialog";
import NotePresentation from "../NoteFinalPresentation";
const apiUrl = import.meta.env.VITE_API_URL;

function ExaminerSubmissionPage() {
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
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [presentations, setPresentations] = useState<PresentationCompletion[]>(
    []
  );

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
          `http://${apiUrl}/examiner/presentation/${id}/completions`
        );
        setCompletions(completionData.data); // Set the entire response data
        setPresentations(completionData.data.completions); // Set the presentations data
        console.log("Completions:", completionData.data);
      } catch (error) {
        console.error("An unexpected error occurred:");
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
            <p className="cursor-pointer mb-3">{trainees.length} Assigned</p>
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
          <p
            className="cursor-pointer hover:text-blue-500"
            onClick={() => handleFilterStatus("SUBMITTED")}
          >
            {completions?.completions.filter(
              (completion) => completion.status === "SUBMITTED"
            ).length || 0}{" "}
            Submitted
          </p>
          <p
            className="cursor-pointer hover:text-blue-500"
            onClick={() => handleFilterStatus("GRADED")}
          >
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
                      {student.files.map((file: Files) => (
                        <li key={file.id} className="flex items-center gap-2">
                          <span>{file.filename}</span>
                          {presentations.map(
                            (presentations, index) =>
                              index === 0 && ( // Only render the Eye for the first presentation
                                <Dialog key={presentations.id}>
                                  <DialogTrigger>
                                    <button className="p-1 text-muted-foreground hover:text-primary transition">
                                      <Eye className="w-5 h-5" />
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-[60vw] w-full max-h-[90vh] overflow-hidden">
                                    <DialogHeader className="p-6 bg-white border-b">
                                      <DialogTitle>
                                        {presentations.submissionFiles.map(
                                          (f) => f.filename
                                        )}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="flex-grow overflow-auto">
                                    {/* {console.log("File passed to FilePreview:", presentations.submissionFiles[0])} */}
                                      <FilePreview
                                        file={presentations.submissionFiles[0]}
                                      />
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Inline Preview */}
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
          <NotePresentation
            addNote={addNote}
            selectedTrainee={selectedTrainee}
            onCancel={handleCancel}
            presentationId={completionId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ExaminerSubmissionPage;
