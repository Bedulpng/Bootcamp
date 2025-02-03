import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Challenge } from "@/types/Trainee";
import axios from "axios";

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [challenges, setChallenges] = useState<Challenge | null>(null);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          `http://10.10.103.160:4000/trainee/challenge/${id}`
        ); // API endpoint for challenges
        setChallenges(response.data); // Set challenges state with the response data
        console.log("challenge data:", response.data);
      } catch (error: any) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges(); // Call the fetch function when the component mounts
  }, [id]);

  return (
    <div className="bg-white overflow-hidden min-h-screen md:px-44 lg:px-10 xl:px-56">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          {/* Subject Header */}
          <div className="flex items-start space-x-4 mb-8">
            <div className="bg-blue-600 rounded-full p-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {challenges?.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {challenges?.mentor.fullName}
              </p>
              <div className="text-right">
                <p className="text-xs text-gray-400 mt-1">Date Upload</p>
              </div>
            </div>
          </div>

          {/* Subject Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              Challenge Description
            </h2>
            <p className="text-gray-600">{challenges?.description}</p>
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
            ) : (
              <div className="text-center text-gray-500">
                No files available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
