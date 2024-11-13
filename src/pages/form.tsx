import React, { useState } from 'react';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';

const FormPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(/image/bg.png)` }}>
        <div className="flex h-[90vh] w-[90vw] max-w-[100%] max-h-[100%] bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-md">

        {/* Bagian Form Login */}
        <div className="flex flex-col flex-1 p-10 items-start text-white bg-black/70">
          <img src="/image/W.png" alt="Logo" className="w-12 mb-5" />
          <h2 className="text-5xl font-bold mb-1">Hello there!</h2>
          <p className="text-sm text-gray-300 mb-10">Before you are start pless fill this data first</p>
          
          <form className="w-full">
            <label className="text-3xl font-semibold mb-1 block">Full Name</label> 
            <input 
              type="text" 
              placeholder="Enter your full name" 
              className="w-full max-w-[45%] p-3 mt-1 rounded-lg bg-gray-200/20 border border-gray-500 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            
            <label className="text-xs mt-4 mb-1 block">Nickname</label>
            <input 
              type="text"
              placeholder="Enter your nickname" 
              className="w-full max-w-[45%] p-3 mt-1 rounded-lg bg-gray-200/20 border border-gray-500 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
          </form>
        </div>  
        
          </div>
        </div>
  );
};

export default FormPage;
