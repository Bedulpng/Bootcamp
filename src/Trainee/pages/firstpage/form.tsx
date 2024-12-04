import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ChevronRight } from 'lucide-react';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

const FormPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isInCollege, setIsInCollege] = useState<boolean | null>(null);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const InputField: React.FC<InputFieldProps> = ({ 
    label, 
    type = "text", 
    placeholder = "" 
  }) => (
    <div className="mb-6">
      <label className="text-2xl font-semibold mb-3 block text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-4 h-14 rounded-xl bg-gray-200/20 border-none 
                 text-white placeholder-gray-400 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );

  const renderStepOne = () => (
    <div className="grid grid-cols-2 gap-x-16 gap-y-6 w-full max-w-5xl">
      <div>
        <InputField label="Full Name" placeholder="Enter your full name" />
        <InputField label="Nickname" placeholder="Enter your nickname" />
        <InputField label="Place of Birth" placeholder="Enter your city" />
      </div>
      <div>
        <InputField label="Date of Birth" type="date" />
        <div className="relative">
          <InputField label="Home Address" placeholder="Enter your home address" />
          <button
            onClick={handleNextStep}
            className="absolute top-[45%] -right-6 transform -translate-y-1/2
                     w-12 h-12 bg-blue-600 rounded-full flex items-center 
                     justify-center hover:bg-blue-700 transition-colors"
            aria-label="Next step"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
        <InputField label="Phone Number" placeholder="Enter your phone number" />
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="grid grid-cols-2 gap-x-16 gap-y-6 w-full max-w-5xl">
      <div>
        <InputField label="Last Education" placeholder="Enter your last education" />
        <InputField label="Last Education Institutional Name" placeholder="Enter your institution name" />
        <InputField label="Major" placeholder="Enter your major" />
      </div>
      <div>
        <div className="mb-6">
          <label className="text-2xl font-semibold mb-3 block text-white">
            Are you currently in college?
          </label>
          <div className="flex gap-8 mt-2">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="college"
                className="w-6 h-6"
                checked={isInCollege === true}
                onChange={() => setIsInCollege(true)}
              />
              <span className="text-white text-xl">YES</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="college"
                className="w-6 h-6"
                checked={isInCollege === false}
                onChange={() => setIsInCollege(false)}
              />
              <span className="text-white text-xl">NO</span>
            </label>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={handleNextStep}
            className="absolute top-[45%] -right-6 transform -translate-y-1/2
                     w-12 h-12 bg-blue-600 rounded-full flex items-center 
                     justify-center hover:bg-blue-700 transition-colors"
            aria-label="Next step"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div className="grid grid-cols-2 gap-x-16 gap-y-6 w-full max-w-5xl">
      <div>
        {isInCollege === true && (
          <>
            <InputField label="College/University" placeholder="Enter your college/university name" />
            <InputField label="Major" placeholder="Enter your major" />
          </>
        )}
        <InputField label="Link Github" placeholder="Enter your Github link" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-10"
         style={{ backgroundImage: 'url(/image/bg.png)' }}>
      <div className="w-[90vw] max-w-6xl mx-auto bg-gradient-to-br from-blue-900/90 to-black/90 
                    backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-12">
          <div className="flex items-center gap-6 mb-12">
            <img src="/logo/W.png" alt="Logo" className="w-20" />
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                FILL IN YOUR DATA
              </h1>
              <p className="text-gray-300">
                Before your start let's fill in your data
              </p>
            </div>
          </div>

          {step === 1 ? renderStepOne() : step === 2 ? renderStepTwo() : renderStepThree()}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
