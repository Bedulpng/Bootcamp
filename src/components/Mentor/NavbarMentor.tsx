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
import { jwtDecode } from 'jwt-decode'; // You need to install this package: npm install jwt-decode
import axios from 'axios'; // You need to install this package: npm install axios

export default function NavbarMentor() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(location.pathname);
  const [mentorName, setMentorName] = useState('');
  const [mentorRole, setMentorRole] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const decodedToken: any = jwtDecode(refreshToken as string);
        const userId = decodedToken.id; // Assuming the user ID is stored in 'id'

        // Fetch mentor details
        const response = await axios.get(`http://10.10.103.104:4000/admin/mentor/${userId}`);
        setMentorName(response.data.fullName);
        setMentorRole(response.data.role);

        // Fetch the professional profile image
        const profileResponse = await axios.get(`http://10.10.103.104:4000/trainee/${userId}/pro`);
        if (profileResponse.data && profileResponse.data.profileImage) {
          setProfileImage(profileResponse.data.profileImage); // Store the profile image path
        } else {
          setProfileImage('path/to/default-image.jpg'); // Set a default image path
        }
      } catch (error) {
        console.error('Error fetching mentor details:', error);
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
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('No token found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('http://10.10.103.104:4000/trainee/logout', {
        accessToken,
      });

      if (response.status === 200) {
        alert('Logout successful');
        localStorage.removeItem('accessToken'); // Remove the token from localStorage
        navigate('/'); // Redirect to the login page
      }
    } catch (error: any) {
      console.error('Error during logout:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while logging out.';
      alert(`Logout failed: ${errorMessage}`);
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
          {navItems.map((item) => {
            const isActive =
              activeNav === item.path || (item.path === '/dashboard/batch' && activeNav.startsWith('/dashboard/batch'));

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setActiveNav(item.path)}
                className={`${
                  isActive ? 'text-wgs-blue font-semibold' : 'text-gray-700'
                } transition-colors hover:text-wgs-blue`}
              >
                {item.label}
              </Link>
            );
          })}
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
                  <AvatarImage src={`http://10.10.103.104:4000${profileImage}`} alt="Mentor" />
                  <AvatarFallback>
                    {mentorName
                      ? mentorName
                          .split(' ') // Split the name by spaces
                          .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word and capitalize it
                          .join('') // Join the initials
                      : '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm text-left">
                  <div>{mentorName || 'THIS MENTOR NAME'}</div>
                  <div className="text-xs text-muted-foreground">{mentorRole || 'THIS MENTOR ROLE'}</div>
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
