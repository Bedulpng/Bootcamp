import React, { useState, useEffect } from 'react';
import NotificationButton from './Notification';
import LogoutButton from './Logout';

const NavbarA = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-sm bg-white/80 backdrop-blur-sm' : 'border-b border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img 
            src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop" 
            alt="WGS Logo"
            className="h-8"
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg">WGS</span>
            <span className="text-xs text-gray-600">Walden Global Services</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default NavbarA;