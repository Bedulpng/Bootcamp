import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import Sidebar from '../../Layouts/Sidebar';

const Dashboarda: React.FC = () => {
  return (
    <div className="bg-[#D9D9D9] overflow-hidden min-h-screen relative">
      <div className="relative z-30">
        <MainLayout />
      </div>
      <Sidebar />
      <div className="ml-[300px] pt-20 flex flex-col justify-center items-start h-[40vh] w-[80vw] rounded-lg shadow-lg mt-12 mt-[100px]
      bg-[url('/image/background.jpeg')] bg-cover bg-center pl-24">
        <h2 className="text-[96px] font-extrabold text-white">Welcome Back,</h2>
        <h2 className="text-[96px] font-extrabold text-white">Admin</h2>
      </div>;
      </div>
  );
};

export default Dashboarda;
