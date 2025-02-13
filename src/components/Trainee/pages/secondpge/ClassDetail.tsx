import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { Class } from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import { NoLessons } from "./LessonChallenge/LessonPage";
import { NoChallenge } from "./LessonChallenge/ChallengePage";

export default function TraineeMain() {
  const { classId } = useParams<{ classId: string }>();
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<string>("Featured");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"lesson" | "challenge">("lesson");
  const [classes, setClasses] = useState<Class[]>([]);

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

  const toggleFilterDropdown = () =>
    setFilterDropdownOpen(!isFilterDropdownOpen);

  const handleTabClick = (tab: "lesson" | "challenge") => setActiveTab(tab);

  const handleChallenge = (id: string) => navigate(`/trainee/challenge/${id}`);

  const handleLesson = (id: string) => navigate(`/trainee/lesson/${id}`);

  return (
    <div className="bg-white overflow-hidden min-h-screen md:px-44 lg:px-10 xl:px-56">
      <div className="flex justify-center items-center h-[40vh] w-full bg-gradient-to-r from-gray-900 to-black rounded-lg shadow-2xl mt-8 hover:shadow-3xl transition-shadow duration-300">
        <h2 className="text-[40px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-text">
          {classes.map((classes) => classes.className) || "Class Name"}
        </h2>
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex space-x-3">
          <button
            className={`px-4 py-2 font-bold rounded-lg ${
              activeTab === "lesson"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => handleTabClick("lesson")}
          >
            Lesson
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-lg ${
              activeTab === "challenge"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => handleTabClick("challenge")}
          >
            Challenge
          </button>
        </div>

        <div className="relative">
          <button
            onClick={toggleFilterDropdown}
            className="px-4 py-2 font-bold text-gray-700 rounded-lg flex items-center space-x-2"
          >
            <span>{filterOption}</span>
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
              <button
                onClick={() => {
                  setFilterOption("Newest");
                  setFilterDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
              >
                Newest
              </button>
              <button
                onClick={() => {
                  setFilterOption("Oldest");
                  setFilterDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
              >
                Oldest
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-4 mb-16">
        {activeTab === "lesson" &&
          (classes.every((classItem) => classItem.lessons.length === 0) ? (
            <NoLessons />
          ) : (
            classes.map((classItem) =>
              classItem.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 bg-gray-100 border-black border text-black rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleLesson(lesson.id)}
                >
                  <div className="flex items-start space-x-4 mb-8">
                    <div className="bg-white border border-black rounded-lg p-4">
                      <FileText className="h-8 w-8 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{lesson.title}</h3>
                      <p className="text-sm font-semibold text-black-500">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )
          ))}

        {activeTab === "challenge" &&
          (classes.every((classItem) => classItem.challenges.length === 0) ? (
            <NoChallenge />
          ) : (
            classes.map((classItem) =>
              classItem.challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-4 bg-gray-100 border-black border text-black rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleChallenge(challenge.id)}
                >
                  <div className="flex items-start space-x-4 mb-8">
                    <div className="bg-white border border-black rounded-lg p-4">
                      <FileText className="h-8 w-8 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{challenge.title}</h3>
                      <p className="text-sm font-semibold text-black-500">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )
          ))}
      </div>
    </div>
  );
}
