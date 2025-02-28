import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { Class } from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import { NoLessons } from "./NothingHandle/NoLesson";
import { NoChallenge } from "./NothingHandle/NoChallenge";
import { ClassDetailCover } from "./ClassDetailCover";
import { NoPresentation } from "./NothingHandle/NoPresentation";

export default function TraineeMain() {
  const { classId } = useParams<{ classId: string }>();
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<"Newest" | "Oldest">(
    "Newest"
  );
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "lesson" | "challenge" | "presentation"
  >("lesson");
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = filterOption === "Oldest" ? "asc" : "desc"; // Map filter to order
        const classData = await fetchClassById(classId, order);
        setClasses(classData);
      } catch (error) {
        console.error("Failed to fetch class:", error);
      }
    };

    fetchData();
  }, [classId, filterOption]); // Refetch on filter change

  const toggleFilterDropdown = () =>
    setFilterDropdownOpen(!isFilterDropdownOpen);

  const handleTabClick = (tab: "lesson" | "challenge" | "presentation") =>
    setActiveTab(tab);

  const handleChallenge = (id: string) => navigate(`/trainee/challenge/${id}`);
  const handleLesson = (id: string) => navigate(`/trainee/lesson/${id}`);
  const handlePresentation = (id: string) =>
    navigate(`/trainee/presentation/${id}`);

  return (
    <div className="bg-white overflow-hidden min-h-screen md:px-44 lg:px-10 xl:px-56">
      <div className="relative flex justify-center items-end h-[250px] w-full overflow-hidden rounded-xl">
        <ClassDetailCover
          coverImage={classes.length > 0 ? classes[0].cover.filePath : ""}
          title={classes.length > 0 ? classes[0].className : "Class Name"}
        />
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex space-x-3">
          {["lesson", "challenge", "presentation"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-bold rounded-lg ${
                activeTab === tab
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handleTabClick(tab as typeof activeTab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={toggleFilterDropdown}
            className="px-4 py-2 font-bold text-gray-700 rounded-lg flex items-center space-x-2"
          >
            <span>{filterOption}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
              {["Newest", "Oldest"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilterOption(option as "Newest" | "Oldest");
                    setFilterDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-4 mb-16">
        {activeTab === "lesson" &&
          (classes.every((c) => c.lessons.length === 0) ? (
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
                      <FileText className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{lesson.title}</h3>
                      <p className="text-sm">{lesson.description}</p>
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

        {activeTab === "presentation" &&
          (classes.every((classItem) => classItem.presentation.length === 0) ? (
            <NoPresentation />
          ) : (
            classes.map((classItem) =>
              classItem.presentation.map((presentation) => (
                <div
                  key={presentation.id}
                  className="p-4 bg-gray-100 border-black border text-black rounded-lg shadow-md cursor-pointer"
                  onClick={() => handlePresentation(presentation.id)}
                >
                  <div className="flex items-start space-x-4 mb-8">
                    <div className="bg-white border border-black rounded-lg p-4">
                      <FileText className="h-8 w-8 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">
                        {presentation.title}
                      </h3>
                      <p className="text-sm font-semibold text-black-500">
                        {presentation.description}
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
