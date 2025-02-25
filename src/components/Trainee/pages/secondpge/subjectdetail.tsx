import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Challenge, Lesson, Presentation } from "@/types/Trainee";
import { NoLessons } from "./LessonChallenge/LessonPage";
import axios from "axios";
import SubmissionForm from "./CompletionButton";

type DataType = Challenge | Lesson | Presentation | null;

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DataType>(null);
  const [, setType] = useState<string>("");

  useEffect(() => {
    const determineType = () => {
      const path = window.location.pathname;
      if (path.includes("/trainee/challenge")) return "challenge";
      if (path.includes("/trainee/lesson")) return "lesson";
      if (path.includes("/trainee/presentation")) return "presentation";
      return "";
    };

    const fetchData = async () => {
      const currentType = determineType();
      setType(currentType);

      if (!currentType) {
        console.error("Invalid route type.");
        return;
      }

      try {
        const response = await axios.get(
          `http://10.10.103.248:4000/trainee/${currentType}/${id}`
        );
        setData(response.data);
        console.log(`${currentType} data:`, response.data);
      } catch (error: any) {
        console.error(`Error fetching ${currentType} data:`, error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-white overflow-hidden min-h-screen md:px-44 lg:px-10 xl:px-56">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          {/* Subject Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 rounded-full p-4 flex-shrink-0 flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {data?.title || "No Title Available"}
                </h1>
                <p className="text-sm font-bold text-gray-800 mt-1">
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "No Date Available"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {data?.mentor?.fullName || "No Mentor Available"}
                </p>
              </div>
            </div>

            <div className="ml-auto sm:ml-0 w-full sm:w-auto flex justify-end sm:justify-start">
              <SubmissionForm itemId={id} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{data?.description}</p>
            </div>
          </div>

          <div className="mt-8">
            {data?.files?.length ? (
              data.files.map((file, index) => (
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
