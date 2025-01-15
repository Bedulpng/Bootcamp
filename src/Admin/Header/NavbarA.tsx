import { useState, useEffect } from 'react';
import { Bell, LogOut } from 'lucide-react';
import Logo from '../Layout/Logo';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const notifications = 3; // Example count
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/dashboarda');
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4">
        <div
        className="flex items-center justify-between h-16 btn ">
          <button
            onClick={backHome} >
          <Logo />
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-circle relative">
              <Bell size={30} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            <button className="btn btn-ghost btn-circle">
              <LogOut size={30} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;