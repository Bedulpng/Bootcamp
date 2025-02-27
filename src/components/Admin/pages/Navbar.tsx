import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, User2Icon, UserCog2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { NotificationPopup } from '../../Mentor/Notification/Notification';
import ProfileEditor from '@/components/Mentor/Modal/ProfileEdit';

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [AdminName, setAdminName] = useState('');
  const [AdminRole, setAdminRole] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const decodedToken: any = jwtDecode(refreshToken as string);
        const userId = decodedToken.id; // Assuming the user ID is stored in 'id'
        
        // Fetch mentor details
        const response = await axios.get(`http://10.10.103.195:4000/admin/mentor/${userId}`);
        setAdminName(response.data.fullName);
        setAdminRole(response.data.role);

        // Fetch the professional profile image
        const profileResponse = await axios.get(`http://10.10.103.195:4000/trainee/${userId}/pro`);
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  const handleEditProfile = () => {
    setIsEdit(true);
  };


  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          
        </h1>
        <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className='h-10 w-10 mr-2'>
          <NotificationPopup />
        </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1">
                <Avatar className="h-10 w-10 border-2 border-gray-200 rounded-full">
                  <AvatarImage src={`http://10.10.103.195:4000${profileImage}`} alt="Mentor" />
                  <AvatarFallback>
                    {AdminName
                      ? AdminName
                          .split(' ') // Split the name by spaces
                          .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word and capitalize it
                          .join('') // Join the initials
                      : <User2Icon className="h-6 w-6" />}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm text-left">
                  <div>{AdminName || 'THIS ADMIN NAME'}</div>
                  <div className="text-xs text-muted-foreground">{AdminRole || 'THIS ADMIN ROLE'}</div>
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleEditProfile}>
                <UserCog2 className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ProfileEditor open={isEdit} onOpenChange={setIsEdit} />
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;