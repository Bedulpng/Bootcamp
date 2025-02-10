'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { jwtDecode } from 'jwt-decode';

interface ProfileEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileEdit({ open, onOpenChange }: ProfileEditorProps) {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    fullName: '',
    nickname: '',
    address: '',
    profileImage: '',
    phone: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to decode userId from refreshToken
  const getUserIdFromToken = (): string | null => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token found. Please log in again.');
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(refreshToken);
      return decodedToken.id; // Extract the user ID
    } catch (error) {
      console.error('Error decoding token:', error);
      alert('Invalid or expired token. Please log in again.');
      return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = async (file: File) => {
    const userId = getUserIdFromToken();
    if (!userId) return null;

    const formData = new FormData();
    formData.append('type', 'PROFESSIONAL');
    formData.append('file', file); // Adjust this as needed
    formData.append('userId', userId);

    try {
      const response = await axios.post(
        'http://10.10.103.13:4000/uploads/profile',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      return response.data.profile?.filepath; // Use returned file URL
    } catch (error: any) {
      console.error('Error uploading profile image:', error.response?.data || error.message);
      alert('Failed to upload image. Please try again later.');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    if (!userId) return;

    const payload = {
      fullName: profile.fullName,
      nickname: profile.nickname,
      address: profile.address,
      profileImage: profile.profileImage,
      mobile: profile.phone,
    };

    try {
      let imageUrl = null;
      if (fileInputRef.current?.files?.[0]) {
        // Upload the image if a new one is selected
        const file = fileInputRef.current.files[0];
        imageUrl = await handleImageUpload(file);
      }

      // Add the image URL to the payload if uploaded
      if (imageUrl) {
        payload.profileImage = imageUrl;
      }

      const token = localStorage.getItem('refreshToken');
      const decodedToken: any = jwtDecode(token as string);
      const id = decodedToken.id; // Assuming the user ID is stored in 'id'
      // Send the updated profile data
      const response = await axios.put(
        `http://10.10.103.13:4000/trainee/edit/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
      alert(response.data.message);
      onOpenChange(false); // Close the dialog
    } catch (error: any) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert(
        error.response?.data?.message || 'Failed to update profile. Please try again later.'
      );
    }
  };

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const decodedToken: any = jwtDecode(refreshToken as string);
        const userId = decodedToken.id; // Assuming the user ID is stored in 'id'

        if (profileImage) {
          return; // Exit the function early if profile image already exists
        }


        // Fetch the professional profile image
        const profileResponse = await axios.get(`http://10.10.103.13:4000/trainee/${userId}/pro`);
  
        // Check if profile image exists
        if (profileResponse.data.profileImage) {
          setProfileImage(profileResponse.data.profileImage); // Store the profile image path
        } else {
          setProfileImage(null); // Set to null if profile image not found
        }
  
      } catch (error) {
        console.error('Error fetching mentor details:', error);
        
      }
    };
  
    fetchMentorDetails();
  }, [navigate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Basic Information</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-[2fr,1fr] gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  name="nickname"
                  value={profile.nickname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Profile photo
                </Label>
                <Avatar className="h-24 w-24">
                    {profileImage ? (
                      // If profileImage exists, render it
                      <AvatarImage src={`http://10.10.103.13:4000${profileImage}`} alt="Image" />
                    ) : (
                       // If profileImage doesn't exist, render imagePreview
                      <AvatarImage src={imagePreview || undefined} alt="Image Preview" />
                    )}
                    <AvatarFallback>Edit Profile</AvatarFallback>
                  </Avatar>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-xs text-muted-foreground">
                  Recommended 300 x 300
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
