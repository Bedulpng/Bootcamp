import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import NoteForm from "./Notes/NoteForm";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Class, Completions } from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  status: "ASSIGNED" | "SUBMITTED";
}

const mockStudents: Student[] = [
  { id: "1", name: "Sza Zxa", status: "ASSIGNED" },
  { id: "2", name: "John Doe", status: "ASSIGNED" },
  { id: "3", name: "Jane Doe", status: "SUBMITTED" },
  { id: "4", name: "Alice Bob", status: "ASSIGNED" },
  { id: "5", name: "Charlie Eve", status: "SUBMITTED" },
  { id: "6", name: "David Foo", status: "ASSIGNED" },
  { id: "7", name: "Eve Bar", status: "SUBMITTED" },
];

function Challenge() {
  const { classId } = useParams<{ classId: string }>();
  const { id } = useParams<{ id: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [classes, setClasses] = useState<Class[]>([]);
  const [completions, setCompletions] = useState<Completions | null>(null);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;

  // State for NoteForm
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await fetchClassById(classId);
        console.log("Class Data:", classData);
        setClasses(classData);
      } catch (error) {
        console.error("Failed to fetch class:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const completionData = await axios.get(
          `http://192.168.1.6:4000/mentor/lesson/${id}/completions`
        );
        console.log("Completion:", completionData.data);
        setCompletions(completionData.data); // Set the entire response data
      } catch (error) {
        console.error("Failed to fetch class:", error);
      }
    };

    fetchCompletion();
  }, []);


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

  // Handle cancel for NoteForm
  const handleCancel = () => {
    setShowNoteForm(false);
    setSelectedStudent(null);
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
          <p>{classes.map((c) => c.users.length)} Assigned</p>
          <p>{completions?.completions.length} Submitted</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Ditugaskan</h2>
          {displayedStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center p-2 border rounded-md cursor-pointer"
              onClick={() => {
                setSelectedStudent(student); // Set the selected student
                setShowNoteForm(true); // Show the NoteForm
              }}
            >
              <FaRegUserCircle className="text-xl mr-2" />
              <span>{student.name}</span>
              <span className="ml-auto text-gray-500">{student.status}</span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex gap-2">
          {page > 1 && (
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setPage(page - 1)}
            >
              Back
            </button>
          )}
          {endIndex < students.length && (
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
      {showNoteForm && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
            <NoteForm
              addNote={addNote}
              selectedTrainee={{
                id: selectedStudent.id,
                fullName: selectedStudent.name,
                email: `${selectedStudent.name
                  .toLowerCase()
                  .replace(" ", ".")}@example.com`, // Mock email
              }}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Challenge;
