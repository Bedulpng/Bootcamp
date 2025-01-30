import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SkillInputProps {
  label: string;
}

const SkillInput: React.FC<SkillInputProps> = ({ label }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="mb-6">
      <label className="text-lg font-medium mb-2 block text-white">{label}</label>
      <input
        type="text"
        placeholder="Type your skill"
        className="w-full p-3 h-12 rounded-lg bg-gray-200/20 border 
                   border-gray-400 text-white placeholder-gray-400 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <p className="text-white text-sm mt-4">Your Level Skill</p>
      <div className="flex gap-3 mt-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-2 ${
              rating > index ? "bg-blue-500 border-blue-500" : "bg-gray-700 border-gray-500"
            }`}
            onClick={() => setRating(index + 1)}
          >
            <span className="text-white text-sm">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const skillfinish = () =>{
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const confirmFinish = () => {
    setShowModal(false);
    navigate('/dashboard')
  }

  return (
    <div
      className="flex items-start justify-center min-h-screen bg-cover bg-center pt-12"
      style={{ backgroundImage: `url(/bg.png)` }}
    >
      <div className="w-[85vw] h-auto bg-black/70 rounded-lg shadow-lg p-12 backdrop-blur-md">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-10">
          <img src="/Logo_black.png" alt="Logo" className="w-16" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Let's find out your skills</h1>
            <p className="text-gray-300 text-sm">You can fill this skill with hard skills or soft skills</p>
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-2 gap-8">
            <SkillInput label="Skill 1" />
            <SkillInput label="Skill 5" />
            <SkillInput label="Skill 2" />
            <SkillInput label="Skill 6" />
            <SkillInput label="Skill 3" />
            <SkillInput label="Skill 7" />
            <SkillInput label="Skill 4" />
            <SkillInput label="Skill 8" />
          </div>
        )}

        {step === 2 && (
          <div className="text-center ">
            <h1 className="text-3xl font-bold text-white mb-6">When do you feel the most confident?</h1>
            <textarea
              placeholder="Type your answer here..."
              className="w-full p-4 h-[500px] rounded-lg bg-gray-200/20 border 
                         border-gray-400 text-white placeholder-gray-400 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 transition-all"
            ></textarea>
          </div>
        )}

        {/* Navigation Section */}
        <div className="flex justify-between mt-8">
          {step === 2 && (
            <>
              <button
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500"
                onClick={() => setStep(1)}
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500"
                onClick={skillfinish}
              >
                Finish
                <Check size={20} />
              </button>
            </>
          )}

          {step === 1 && (
            <div className="flex justify-end w-full">
              <button
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500"
                onClick={() => setStep(2)}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          )}
    {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] text-center relative">
            <h2 className="text-lg font-semibold mb-4">ARE YOU SURE ?</h2>
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
    </div>
  );
};

export default SkillPage;