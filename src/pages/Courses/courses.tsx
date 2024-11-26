// src/pages/Courses/Courses.tsx
import React from 'react';

const Courses: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>
      {/* Tab Menu */}
      <div className="flex space-x-4 text-lg font-semibold">
        <button className="text-gray-700">Courses <span className="text-gray-500">1</span></button>
        <button className="text-gray-700">Bundle Course <span className="text-gray-500">1</span></button>
      </div>

      {/* Course List */}
      <div className="mt-4 p-4 border rounded-lg bg-gray-100 h-48">
        {/* Placeholder for Course Content */}
        <p className="text-gray-600">Here is where course information will be displayed.</p>
      </div>
    </div>

  );
};

export default Courses;
