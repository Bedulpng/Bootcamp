import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Challenge, Lesson } from "@/types/Trainee";
import { NoLessons } from "./Lesson-Challenge/LessonPage";
import axios from "axios";
import TaskCompletion from "./CompletionButton";

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [challenges, setChallenges] = useState<Challenge | null>(null);
  const [lessons, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.10.103.160:4000/trainee/challenge/${id}`
        ); // API endpoint for challenges
        setChallenges(response.data); // Set challenges state with the response data
        console.log("Challenge data:", response.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.warn(
            "Challenge not found, attempting to fetch lesson data..."
          );
          try {
            const lessonResponse = await axios.get(
              `http://10.10.103.160:4000/trainee/lesson/${id}`
            ); // API endpoint for lessons
            setLesson(lessonResponse.data); // Set challenges state with lesson data
            console.log("Lesson data:", lessonResponse.data);
          } catch (lessonError) {
            console.error("Error fetching lesson data:", lessonError);
          }
        } else {
          console.error("Error fetching challenges:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-white overflow-hidden min-h-screen md:px-44 lg:px-10 xl:px-56">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          {/* Subject Header */}
          <div className="flex items-center space-x-4 mb-8">
            {/* Icon */}
            <div className="bg-blue-600 rounded-full p-4 flex-shrink-0 flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>

            {/* Title and Details */}
            <div className="flex-1 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {challenges?.title || lessons?.title || "No Title Available"}
              </h1>
              <div className="ml-auto sm:ml-0 w-full sm:w-auto flex justify-end sm:justify-start">
                <TaskCompletion Id={id}/>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-bold text-gray-800 mt-1">
              {challenges?.createdAt
                ? new Date(challenges.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : lessons?.createdAt
                ? new Date(lessons.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "No Date Available"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {challenges?.mentor.fullName ||
                lessons?.mentor.fullName ||
                "No Mentor Available"}
            </p>
          </div>

          {/* Subject Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">
              {challenges?.description || lessons?.description}
            </p>
          </div>

          {/* Files List */}
          <div>
            {challenges && challenges.files ? (
              challenges.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border mb-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {file.filename}
                      </p>
                      <p className="text-sm text-gray-500">{file.mimetype}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : lessons && lessons.files ? (
              lessons.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border mb-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {file.filename}
                      </p>
                      <p className="text-sm text-gray-500">{file.mimetype}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoLessons />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
