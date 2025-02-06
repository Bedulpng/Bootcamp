import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";

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
  const [students, setStudents] = useState<Student[]>([]);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClick = (name: string) => {
    console.log("berhasil");
  };

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedStudents = students.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${expanded ? "w-1/4" : "w-16"} bg-white shadow-md p-4 rounded-lg overflow-hidden`}>
        <h2 className="text-lg font-semibold mb-4 cursor-pointer" onClick={toggleExpand}>
          {expanded ? "Semua Siswa ▲" : "▶"}
        </h2>
        {expanded && (
          <div>
            {students.map((student) => (
              <div key={student.id} className="flex items-center p-2 border-b">
                <FaRegUserCircle className="text-xl mr-2" />
                <span>{student.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg transition-all duration-300">
        <h1 className="text-xl font-bold mb-4">Tugas Siswa</h1>
        <div className="flex items-center gap-8">
          <p>{students.filter((s) => s.status === "SUBMITTED").length} Diserahkan</p>
          <p>{students.filter((s) => s.status === "ASSIGNED").length} Ditugaskan</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Ditugaskan</h2>
          {displayedStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center p-2 border rounded-md cursor-pointer"
              onClick={() => handleClick(student.name)}
            >
              <FaRegUserCircle className="text-xl mr-2" />
              <span>{student.name}</span>
              <span className="ml-auto text-gray-500">{student.status === "ASSIGNED" ? "Ditugaskan" : "Diserahkan"}</span>
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
    </div>
  );
}

export default Challenge;
