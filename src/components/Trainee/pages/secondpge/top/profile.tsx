import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Eye, Eyeoff} from "lucide-react";
import ImageUpload from "../layouts/imageupload";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkeletonProfile from "@/components/Trainee/Skeleton/ProfileSkeleton";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGit] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [casProfile, setCasProfile] = useState<string | null>(null);
  const [delay,setDelay] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setDelay(false), 1000)
    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const decodedToken: any = jwtDecode(refreshToken as string);
        const userId = decodedToken.id; // Assuming the user ID is stored in 'id'

        // Fetch mentor details
        const response = await axios.get(
          `http://192.168.254.104:4000/trainee/users/${userId}`
        );
        setName(response.data.fullName);
        setNick(response.data.nickname);
        setEmail(response.data.email);
        setGit(response.data.github);

        // Fetch the professional profile image
        const profileResponse = await axios.get(
          `http://192.168.254.104:4000/trainee/${userId}/pro`
        );
        const casualProfile = await axios.get(
          `http://192.168.254.104:4000/trainee/${userId}/casual`
        );
        if (
          profileResponse.data &&
          profileResponse.data.profileImage &&
          casualProfile.data &&
          casualProfile.data.profileImage
        ) {
          setProfileImage(profileResponse.data.profileImage);
          setCasProfile(casualProfile.data.profileImage);
        } else {
          setProfileImage("path/to/default-image.jpg");
          setCasProfile("path/to/default-image.jpg");
        }
        // console.log(
        //   "profile trainee page: ",
        //   profileResponse.data.profileImage,
        //   casualProfile.data.profileImage
        // );
      } catch (error) {
        console.error("Error fetching mentor details:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // const [showPassword, setShowPassword] = useState({
  //   current: false,
  //   new: false,
  //   confirm: false,
  // });

  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    homeAddress: "",
    email: "",
    phoneNumber: "",
    linkGithub: "",
  });

  const [photos, setPhotos] = useState({
    professional: null as File | null,
    informal: null as File | null,
  });

  const [activePhoto, setActivePhoto] = useState<"professional" | "informal">(
    "professional"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange =
    (type: "professional" | "informal") => (file: File) => {
      setPhotos((prev) => ({ ...prev, [type]: file }));
    };

  const togglePhoto = () => {
    setActivePhoto((prev) =>
      prev === "professional" ? "informal" : "professional"
    );
  };

  const handleReset = (section: "data" | "photos" | "password") => {
    if (section === "data") {
      setFormData({
        fullName: "",
        nickname: "",
        homeAddress: "",
        email: "",
        phoneNumber: "",
        linkGithub: "",
      });
    } else if (section === "photos") {
      setPhotos({
        professional: null,
        informal: null,
      });
    }
  };

  const handleSubmit = async (section: "data" | "photos" | "password") => {
    if (section === "data") {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const decoded: any = jwtDecode(refreshToken as string);
        const userId = decoded.id; // Get the user ID from the decoded token
  
        // Prepare the payload for the new router
        const payload = {
          fullName: formData.fullName,
          nickname: formData.nickname,
          address: formData.homeAddress,
          mobile: formData.phoneNumber,
          // Exclude fields like email and github as they are not part of the new router
        };
  
        // Send the request to the new router
        const response = await axios.put(
          `http://192.168.254.104:4000/trainee/edit/${userId}`, // Updated endpoint
          payload,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
  
        console.log("Data submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    } else if (section === "photos") {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const decoded: any = jwtDecode(refreshToken as string);
        const userId = decoded.id; // Get the user ID from the decoded token
  
        // Upload Professional Photo
        if (photos.professional) {
          const professionalFormData = new FormData();
          professionalFormData.append("type", "PROFESSIONAL");
          professionalFormData.append("userId", userId);
          professionalFormData.append("file", photos.professional);
  
          const professionalResponse = await axios.post(
            "http://192.168.254.104:4000/uploads/profile",
            professionalFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          console.log(
            "Professional photo uploaded:",
            professionalResponse.data
          );
        }
  
        // Upload Informal Photo
        if (photos.informal) {
          const informalFormData = new FormData();
          informalFormData.append("type", "CASUAL");
          informalFormData.append("userId", userId);
          informalFormData.append("file", photos.informal);
  
          const informalResponse = await axios.post(
            "http://192.168.254.104:4000/uploads/profile",
            informalFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          console.log("Informal photo uploaded:", informalResponse.data);
        }
  
        console.log("Photos submitted successfully");
      } catch (error) {
        console.error("Error submitting photos:", error);
      }
    } else if (section === "password") {
      console.log("Submitting password update.");
      // Add API call for password update if needed
    }
  };

    if (delay) {
      return (
        <SkeletonProfile />
      );
    }
  
  return (
    <div className="bg-white overflow-hidden min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Header Card */}
      <div className="w-full max-w-4xl mt-8 mb-12">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-950 to-blue-800">
          <div className="absolute inset-0 bg-[url('/image/bg.png')] opacity-20"></div>
          <div className="relative p-8 flex justify-between items-start">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">
                {name || "Full Name Not Set"}
              </h1>
              <p className="text-xl mb-4">{nick || "Nickname Not Set"}</p>
              <div className="flex gap-2 text-gray-200">
                <span>{email || "Email Not Set"}</span>
                <span>|</span>
                <span>{github || "Github Link Not Set"}</span>
              </div>
            </div>
            <div className="bg-white p-2 rounded-full relative group">
              <Avatar className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                {activePhoto === "professional" && profileImage ? (
                  <AvatarImage
                    src={`http://192.168.254.104:4000${profileImage
                      .replace(/\\/g, "/")
                      .replace("public", "")}`}
                    alt="Professional Photo"
                  />
                ) : activePhoto === "informal" && casProfile ? (
                  <AvatarImage
                    src={`http://192.168.254.104:4000${casProfile
                      .replace(/\\/g, "/")
                      .replace("public", "")}`}
                    alt="Casual Photo"
                  />
                ) : (
                  <AvatarFallback>
                    {name
                      ? name
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase())
                          .join("")
                      : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={togglePhoto}
                  className="bg-black bg-opacity-50 text-white p-1 rounded-full -ml-2 hover:bg-opacity-75 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePhoto}
                  className="bg-black bg-opacity-50 text-white p-1 rounded-full -mr-2 hover:bg-opacity-75 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activePhoto === "professional" ? "Pro" : "Casual"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Edit Data */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">EDIT DATA</h2>
          <div className="space-y-4">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Nickname", name: "nickname" },
              { label: "Home Address", name: "homeAddress" },
              { label: "Phone Number", name: "phoneNumber" },
              { label: "Link Github", name: "linkGithub" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={label}
                />
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => handleReset("data")}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                RESET
              </button>
              <button
                onClick={() => handleSubmit("data")}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Edit Photo */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">EDIT PHOTO</h2>
            <div className="flex justify-center gap-8 mb-6">
              <ImageUpload
                label="Professional Photo"
                onImageChange={handlePhotoChange("professional")}
                previewUrl={
                  photos.professional
                    ? URL.createObjectURL(photos.professional)
                    : undefined
                }
              />
              <ImageUpload
                label="Casual Photo"
                onImageChange={handlePhotoChange("informal")}
                previewUrl={
                  photos.informal
                    ? URL.createObjectURL(photos.informal)
                    : undefined
                }
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleReset("photos")}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                RESET
              </button>
              <button
                onClick={() => handleSubmit("photos")}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                SAVE
              </button>
            </div>
          </div>

          {/* Edit Password */}
          {/* <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              EDIT PASSWORD
            </h2>
            <div className="space-y-4">
              {[
                { label: "Current Password", key: "current" },
                { label: "New Password", key: "new" },
                { label: "Confirm Your New Password", key: "confirm" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={
                        showPassword[key as keyof typeof showPassword]
                          ? "text"
                          : "password"
                      }
                      className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          [key]: !prev[key as keyof typeof showPassword],
                        }))
                      }
                      className="absolute right-2 top-2 text-gray-500"
                    >
                      {showPassword[key as keyof typeof showPassword] ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => handleReset("password")}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  RESET
                </button>
                <button
                  onClick={() => handleSubmit("password")}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
