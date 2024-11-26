import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-700 text-white flex flex-col space-y-2 p-4">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/courses"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'
          }`
        }
      >
        Courses
      </NavLink>
      <NavLink
        to="/usermanagement"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'
          }`
        }
      >
        User Management
      </NavLink>
      <NavLink
        to="/classmanagement"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'
          }`
        }
      >
        Class Management
      </NavLink>
      <NavLink
        to="/certificatemanagement"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'
          }`
        }
      >
        Certificate Management
      </NavLink>
      <NavLink
        to="/viewnotes"
        className={({ isActive }) =>
          `p-3 rounded-lg ${
            isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-600'
          }`
        }
      >
        View Notes
      </NavLink>
    </div>
  );
};

export default Sidebar;
