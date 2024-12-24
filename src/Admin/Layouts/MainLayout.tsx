import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const navbara: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const Notification = () => {
    navigate("/notification");
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
<nav className="fixed top-0 left-0 right-0 flex items-center justify-between text-white bg-black shadow-lg sm:px-6 lg:px-8 z-30">
  <div className="flex items-center h-16">
    <img
      src="/image/logo.png"
      alt="Logo"
      className="w-48 cursor-pointer"
      onClick={handleLogoClick}
    />
  </div>
  <div className="flex items-center space-x-6">
    <button
      onClick={Notification}
      className="text-white relative p-2 rounded-full hover:bg-gray-800 transition"
    >
      <img src="/image/bell (1).png" alt="Bell Icon" className="h-6 w-6" />
    </button>
    <button
      className="p-2 rounded-full hover:bg-red-600 transition"
      onClick={logoutClick}
    >
      <img src="/image/Logout.png" alt="Logout" className="h-5 w-5" />
    </button>
  </div>
</nav>
        )};
        

export default navbara;
