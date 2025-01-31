import React, { useState } from "react";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import ImageUpload from "../layouts/imageupload";

const Profile: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

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

  const handlePhotoChange = (type: "professional" | "informal") => (file: File) => {
    setPhotos((prev) => ({ ...prev, [type]: file }));
  };

  const togglePhoto = () => {
    setActivePhoto((prev) => (prev === "professional" ? "informal" : "professional"));
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

  const handleSubmit = (section: "data" | "photos" | "password") => {
    if (section === "data") {
      console.log("Submitting data:", formData);
    } else if (section === "photos") {
      console.log("Submitting photos:", photos);
    }
  };

  const currentPhoto = photos[activePhoto];

  return (
    <div className="bg-white overflow-hidden min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Header Card */}
      <div className="w-full max-w-4xl mt-8 mb-12">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-950 to-blue-800">
          <div className="absolute inset-0 bg-[url('/image/bg.png')] opacity-20"></div>
          <div className="relative p-8 flex justify-between items-start">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">
                {formData.fullName || "Full Name Not Set"}
              </h1>
              <p className="text-xl mb-4">
                {formData.nickname || "Nickname Not Set"}
              </p>
              <div className="flex gap-2 text-gray-200">
                <span>{formData.email || "Email Not Set"}</span>
                <span>|</span>
                <span>{formData.linkGithub || "Github Link Not Set"}</span>
              </div>
            </div>
            <div className="bg-white p-2 rounded-full relative group">
              {currentPhoto ? (
                <img
                  src={URL.createObjectURL(currentPhoto)}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400">No Photo</span>
                </div>
              )}
              {photos.professional && photos.informal && (
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
              )}
              {currentPhoto && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {activePhoto === "professional" ? "Pro" : "Casual"}
                </div>
              )}
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
              { label: "Email", name: "email" },
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
                label="Informal Photo"
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
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">EDIT PASSWORD</h2>
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
                      type={showPassword[key as keyof typeof showPassword] ? "text" : "password"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;