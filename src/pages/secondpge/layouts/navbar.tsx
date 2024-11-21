import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleProfileDropdown = () => 
    setProfileDropdownOpen(!isProfileDropdownOpen);

  const Notification = () => {
    navigate("/notification");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const logoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const confirmLogout = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleLogoClick = () => {
    if (location.pathname === "/dashboard") {
      window.location.reload();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <nav className="flex items-center justify-between text-black bg-white shadow-lg sm:px-6 md:-mx-44 lg:px-8 xl:-mx-56">
      <div className="flex items-center h-16">
        <img
          src="/logo/WGS.png"
          alt="Logo"
          className="w-48 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      <div className="flex items-center space-x-6">
        <div>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/bell.png"
            alt="Notification Icon"
            className="w-9 h-9 cursor-pointer"
            onClick={Notification}
          />
        </div>

        <div className="relative">
          <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2 cursor-pointer" onClick={toggleProfileDropdown}>
            <span className="text-sm">
              <div>TRAINEE NAME</div>
              <div className="text-xs text-gray-500">THIS IS TRAINEE EMAIL</div>
            </span>
            <div className="bg-gray-200 rounded-full p-2">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 py-2 bg-[#0020F6]/75 text-white rounded-lg shadow-md z-10">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-[#0020F6]/50"
                onClick={handleProfileClick}
              >
                Profile
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-[#0020F6]/50"
                onClick={logoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal untuk konfirmasi logout */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-90 text-center relative">
            <h2 className="text-lg font-semibold mb-4">ARE YOU SURE WANT TO LEAVE?</h2>
            <hr className="border-t-2 border-blue-500 " />
            <div className="flex justify-around mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600"
              >
                BACK
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
