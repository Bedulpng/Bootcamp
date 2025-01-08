import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const RegisPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleformclick = () => {
    navigate("/form");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(/bg.png)` }}>
      <div className="flex h-[90vh] w-[90vw] max-w-[100%] max-h-[100%] bg-black/70 rounded-lg relative overflow-hidden shadow-lg backdrop-blur-md">

        {/* Left Side - Login Form */}
        <div className="flex flex-col flex-1 p-10 items-start text-white bg-black/0 relative">
          <img src="/lil_white.png" alt="Logo" className="w-24 mb-9" />
          <h2 className="text-3xl font-semibold mb-1">Hello there!</h2>
          <p className="text-sm text-gray-300 mb-9">Lorem ipsum dolor sit amet</p>
          
          <form className="w-full">
            <label className="text-[28px] font-[Plus-Jakarta-Sans] mb-1 block">Email</label> 
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="mb-5 w-full p-3 mt-1 rounded-lg bg-gray-200/20 border border-gray-500 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            
            <label className="text-[28px] font-[Plus-Jakarta-Sans] mt-4 mb-1 block">Password</label>
            <div className="relative w-full">
              <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="block w-full p-3 mt-1 rounded-lg bg-gray-200/20 border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
              </button>
            </div>
            <button 
              type="submit" 
              className="w-full p-3 mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
              onClick={handleformclick}
            >
              Log In
            </button>
          </form>

          {/* Tombol Kembali */}
          <div className="absolute bottom-5 left-5">
            <button className="p-1 w-[90px] rounded-lg bg-white text-[19px] text-black hover:bg-gray-300 transition">
              &larr;
            </button>
          </div>
        </div>  
        
        {/* Bagian Testimonial */}
        <div className="flex-1 flex flex-col items-center rounded-lg justify-center bg-black p-10 text-white">
          <h3 className="text-lg font-semibold mb-4">What’s our mentor said</h3>
          <blockquote className="italic text-md text-center mb-4">
            “Lorem ipsum dolor sit amet”
          </blockquote>
          <p className="text-sm text-center">Lorem<br />UI/UX Designer at WGS</p>
          
          <div className="flex gap-2 mt-4">
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisPage;