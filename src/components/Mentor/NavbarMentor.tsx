'use client';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {jwtDecode} from 'jwt-decode'; // You need to install this package: npm install jwt-decode

export default function NavbarMentor() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(location.pathname);
  const [mentorName, setMentorName] = useState('');
  const [mentorRole, setMentorRole] = useState('');

  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      const refreshToken = localStorage.getItem('refreshToken'); // Get the access token from localStorage
      if (!refreshToken) {
        alert('Access token not found. Please log in.');
        navigate('/login');
        return;
      }

      try {
        const decodedToken: any = jwtDecode(refreshToken); // Decode the token to extract user ID
        const userId = decodedToken.id; // Assuming the user ID is stored in 'userId'

        // Fetch the mentor details using the userId
        const response = await fetch(`http://10.10.103.20:4000/admin/mentor/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setMentorName(data.fullName);
          setMentorRole(data.role);
        } else {
          console.error('Failed to fetch mentor details');
        }
      } catch (error) {
        console.error('Error fetching mentor details:', error);
        alert('An error occurred while fetching mentor details.');
      }
    };

    fetchMentorDetails();
  }, [navigate]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/batch', label: 'Explore Batch' },
    { path: '/dashboard/trainee', label: 'Trainee' },
  ];

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken'); // Assume refresh token is stored in localStorage

    if (!refreshToken) {
      alert('No refresh token found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://10.10.103.20:4000/trainee/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        alert('Logout successful');
        localStorage.removeItem('refreshToken'); // Remove the token from localStorage
        navigate('/'); // Redirect to the login page
      } else {
        const errorData = await response.json();
        alert(`Logout failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out.');
    }
  };

  return (
    <header className="border-b">
      <div className="container relative flex h-16 items-center px-8 justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex-shrink-0">
          <img
            src="/Logo_black_big.png"
            alt="Logo"
            width={150}
            height={50}
            className="rounded"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setActiveNav(item.path)}
              className={`${
                activeNav === item.path ? 'text-wgs-blue font-semibold' : 'text-gray-700'
              } transition-colors hover:text-wgs-blue`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Bell className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1">
                <Avatar className="h-10 w-10 border-2 border-gray-200 rounded-full">
                  <AvatarImage src="/placeholder.svg" alt="Mentor" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="text-sm text-left">
                  <div>{mentorName || 'Loading...'}</div>
                  <div className="text-xs text-muted-foreground">{mentorRole || 'Loading...'}</div>
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
