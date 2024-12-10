import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import Sidebar from '../../Layouts/Sidebar';

const Courses: React.FC = () => {
  return (
    <div className="bg-[#D9D9D9] overflow-hidden min-h-screen relative">
      <div className="relative z-30">
        <MainLayout />
      </div>
      <Sidebar />
      <div className="ml-[300px] pt-20 flex flex-col justify-center">
        <h2 className="text-[70px] text-black font-semibold mt-[30px]">Courses</h2>
      </div>;
      </div>
  );
};

export default Courses;
