import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserCog2, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationPopup } from "@/components/Mentor/Notification/Notification";
import LogoutModal from "@/components/Trainee/pages/Modal/Logout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const NavbarExaminer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [traineeName, setTraineeName] = useState("");
  const [traineeRole, setTraineeRole] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const decodedToken: any = jwtDecode(refreshToken as string);
        const userId = decodedToken.id; // Assuming the user ID is stored in 'id'

        // Fetch mentor details
        const response = await axios.get(
          `http://10.10.103.195:4000/admin/mentor/${userId}`
        );
        setTraineeName(response.data.fullName);
        setTraineeRole(response.data.role);

        // Fetch the professional profile image
        const profileResponse = await axios.get(
          `http://10.10.103.195:4000/trainee/${userId}/pro`
        );
        if (profileResponse.data && profileResponse.data.profileImage) {
          setProfileImage(profileResponse.data.profileImage); // Store the profile image path
        } else {
          setProfileImage("path/to/default-image.jpg"); // Set a default image path
        }
        console.log(profileResponse.data.profileImage);
      } catch (error) {
        console.error("Error fetching mentor details:", error);
      }
    };

    fetchMentorDetails();
  }, [navigate]);

  const handleProfileClick = () => {
    navigate("/examiner/profile");
  };

  const logoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const confirmLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("No token found. Please log in again.");
      navigate("/login/examiner");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.10.103.195:4000/trainee/logout",
        {
          accessToken,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("accessToken"); // Remove the token from localStorage
        navigate("/login/examiner"); // Redirect to the login page
      }
    } catch (error: any) {
      console.error("Error during logout:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred while logging out.";
      alert(`Logout failed: ${errorMessage}`);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0"></div>
  
        {/* User Menu - Moved to the right */}
        <div className="flex-shrink-0 flex items-center gap-4 ml-auto">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <NotificationPopup />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1">
                <Avatar className="h-10 w-10 border-2 border-gray-200 rounded-full">
                  <AvatarImage
                    src={`http://10.10.103.195:4000${profileImage}`}
                    alt="Trainee"
                  />
                  <AvatarFallback>
                    {traineeName
                      ? traineeName
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase())
                          .join("")
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm text-left">
                  <div>{traineeName || "THIS TRAINEE NAME"}</div>
                  <div className="text-xs text-muted-foreground">
                    {traineeRole || "THIS TRAINEE ROLE"}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleProfileClick}>
                <UserCog2 className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutClick}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LogoutModal
            isOpen={showModal}
            onClose={handleCloseModal}
            onConfirm={confirmLogout}
          />
        </div>
      </div>
    </header>
  );
  
};

export default NavbarExaminer;
