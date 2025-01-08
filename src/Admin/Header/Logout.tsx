import React from 'react';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <button 
      onClick={handleLogout}
      className="btn btn-ghost btn-circle"
    >
      <LogOut size={20} />
    </button>
  );
};

export default LogoutButton;