import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked');
    // Tambahkan logika logout di sini
  };

  return (
    <div className="h-screen flex flex-col bg-blue-900">
      {/* Header */}
      <header className="bg-black py-4 px-6 flex justify-between items-center">
        <img src="/image/logo.png" alt="WGS Logo" className="h-8" />

        <div className="flex items-center space-x-6">
          {/* Bell Icon */}
          <button
            onClick={() => navigate('/notification')}
            className="text-white relative p-2 rounded-full hover:bg-gray-800 transition"
          >
            <img src="/image/bell (1).png" alt="Bell Icon" className="h-6 w-6" />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-600 transition"
          >
            <img src="/image/switch.png" alt="Logout" className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Konten Utama */}
        <main className="flex-1 bg-gray-200 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
