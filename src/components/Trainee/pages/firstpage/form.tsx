import React, { useState } from 'react';
import { Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isInCollege, setIsInCollege] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    placeOfBirth: "",
    dateOfBirth: "",
    homeAddress: "",
    phoneNumber: "",
    lastEducation: "",
    educationInstitution: "",
    major: "",
    university: "",
    universityMajor: "",
    githubLink: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key as keyof typeof formData] &&
        ((isInCollege === "yes" && key !== "universityMajor") || key !== "university")
      ) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formFinish = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const confirmFinish = () => {
    setShowModal(false);
    navigate("/skill");
  };

  const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    placeholder = "",
    fullWidth = false,
    value,
    onChange,
    error,
  }) => (
    <div className={`mb-6 ${fullWidth ? "col-span-2" : ""}`}>
      <label className="text-lg font-medium mb-2 block text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 h-12 rounded-lg bg-gray-200/20 border 
                   border-gray-400 text-white placeholder-gray-400 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 transition-all ${
                     error ? "border-red-500 focus:ring-red-500" : ""
                   }`}
        aria-label={label}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  const YesNoQuestion: React.FC<{ label: string }> = ({ label }) => (
    <div className="mb-6">
      <label className="text-lg font-medium mb-2 block text-white">{label}</label>
      <div className="flex gap-8">
        <button
          onClick={() => setIsInCollege("yes")}
          className={`w-16 h-16 rounded-lg ${
            isInCollege === "yes" ? "bg-blue-600" : "bg-gray-400"
          } text-white font-medium`}
        >
          YES
        </button>
        <button
          onClick={() => setIsInCollege("no")}
          className={`w-16 h-16 rounded-lg ${
            isInCollege === "no" ? "bg-blue-600" : "bg-gray-400"
          } text-white font-medium`}
        >
          NO
        </button>
      </div>
    </div>
  );

  const renderStepOne = () => (
    <div className="grid grid-cols-2 gap-8 w-full">
      {/* Kolom Kiri */}
      <div>
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(value) => handleChange("fullName", value)}
          error={errors.fullName}
        />
        <InputField
          label="Nickname"
          placeholder="Enter your nickname"
          value={formData.nickname}
          onChange={(value) => handleChange("nickname", value)}
          error={errors.nickname}
        />
        <InputField
          label="Place of Birth"
          placeholder="Enter your city"
          value={formData.placeOfBirth}
          onChange={(value) => handleChange("placeOfBirth", value)}
          error={errors.placeOfBirth}
        />
        <InputField
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(value) => handleChange("dateOfBirth", value)}
          error={errors.dateOfBirth}
        />
        <InputField
          label="Home Address"
          placeholder="Enter your home address"
          value={formData.homeAddress}
          onChange={(value) => handleChange("homeAddress", value)}
          error={errors.homeAddress}
        />
        <InputField
          label="Phone Number"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={(value) => handleChange("phoneNumber", value)}
          error={errors.phoneNumber}
        />
      </div>
  
      {/* Kolom Kanan */}
      <div>
        <InputField
          label="Last Education"
          placeholder="Enter your last education"
          value={formData.lastEducation}
          onChange={(value) => handleChange("lastEducation", value)}
          error={errors.lastEducation}
        />
        <InputField
          label="Last Education Institution"
          placeholder="Enter your last education institution"
          value={formData.educationInstitution}
          onChange={(value) => handleChange("educationInstitution", value)}
          error={errors.educationInstitution}
        />
        <InputField
          label="Major"
          placeholder="Enter your last education major"
          value={formData.major}
          onChange={(value) => handleChange("major", value)}
          error={errors.major}
        />
  
        {/* Pertanyaan Yes/No */}
        <YesNoQuestion label="Are you currently in college?" />
  
        {/* Render Form Tambahan Berdasarkan Jawaban */}
        {isInCollege === "yes" && (
          <>
            <InputField
              label="University"
              placeholder="Enter your university"
              value={formData.university}
              onChange={(value) => handleChange("university", value)}
              error={errors.university}
            />
            <InputField
              label="University Major"
              placeholder="Enter your university major"
              value={formData.universityMajor}
              onChange={(value) => handleChange("universityMajor", value)}
              error={errors.universityMajor}
            />
            <InputField
              label="GitHub Link"
              placeholder="Enter your GitHub link"
              value={formData.githubLink}
              onChange={(value) => handleChange("githubLink", value)}
              error={errors.githubLink}
              fullWidth
            />
          </>
        )}
  
        {isInCollege === "no" && (
          <InputField
            label="GitHub Link"
            placeholder="Enter your GitHub link"
            value={formData.githubLink}
            onChange={(value) => handleChange("githubLink", value)}
            error={errors.githubLink}
            fullWidth
          />
        )}
      </div>
    </div>
  );
  

  return (
    <div
      className="flex items-start justify-center min-h-screen bg-cover bg-center pt-12"
      style={{ backgroundImage: `url(/bg.png)` }}
    >
      <div className="w-[85vw] h-auto bg-black/70 rounded-lg shadow-lg p-12 backdrop-blur-md relative">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-10">
          <img src="/Logo_black.png" alt="Logo" className="w-16" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">FILL IN YOUR DATA</h1>
            <p className="text-gray-300 text-sm">Before your start let's fill in your data</p>
          </div>
        </div>
        {/* Form Section */}
        {renderStepOne()}
        {/* Save Button */}
        <button
          onClick={formFinish}
          className="absolute bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500"
        >
          Save
        </button>
        {/* Modal */} 
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] text-center relative">
              <h2 className="text-lg font-semibold mb-4">ARE YOU SURE?</h2>
              <hr className="border-t-2 border-blue-500 " />
              <div className="flex justify-around mt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600"
                >
                  BACK
                </button>
                <button
                  onClick={confirmFinish}
                  className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600"
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPage;