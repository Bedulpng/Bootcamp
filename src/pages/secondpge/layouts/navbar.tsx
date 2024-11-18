import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleProfileDropdown = () => 
    setProfileDropdownOpen(!isProfileDropdownOpen);

  const Notification = () => {
    navigate("/notification");
  }
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const logoutClick = () => {
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
    <nav className="flex items-center justify-between text-black bg-white shadow-lg sm:px-6 md:-mx-44 lg:px-8 lg:-mx-10 xl:-mx-56">
      <div className="flex items-center justify-between h-16">
        <img
          src="/logo/WGS.png"
          alt="Logo"
          className="w-48 cursor-pointer"
          onClick={handleLogoClick} // Tambahkan event onClick pada logo
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

        <div>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/user-female-circle.png"
            alt="User Icon"
            className="w-10 h-10 cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          {isProfileDropdownOpen && (
            <div className="absolute right-0 z-10 w-40 py-2 mt-2 text-white bg-[#0020F6]/75 rounded-lg shadow-md">
              <button className="block w-full px-4 py-2 text-left" onClick={handleProfileClick}>Profile</button>
              <button className="block w-full px-4 py-2 text-left" onClick={logoutClick}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
