import React from 'react';
import { useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface FileItem {
  name: string;
  type: string;
  uploadDate: string;
}

const SubjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - replace with actual data fetching
  const subjectData = {
    id,
    name: "SUBJECT NAME",
    mentor: "MENTOR NAME",
    description: "Subject Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    files: [
      { name: "FILE NAME 1", type: "PDF", uploadDate: "2024-03-15" },
      { name: "FILE NAME 2", type: "DOC", uploadDate: "2024-03-14" },
    ] as FileItem[]
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Subject Name{subjectData.id}</h1>
              <p className="text-sm text-gray-600 mt-1">{subjectData.mentor}</p>
              <div className="text-right">
              <p className="text-xs text-gray-400 mt-1">Date Upload</p>
              </div>
            </div>
          </div>

          {/* Subject Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Subject Description</h2>
            <p className="text-gray-600">{subjectData.description}</p>
          </div>

          {/* Files List */}
          <div>
            {subjectData.files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border mb-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.type}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{file.uploadDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;