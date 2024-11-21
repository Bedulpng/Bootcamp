import React, { useState } from 'react';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(/image/bg.png)` }}>
        <div className="flex h-[90vh] w-[90vw] max-w-[100%] max-h-[100%] bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-md">

        {/* Bagian Form Login */}
        <div className="flex flex-col flex-1 p-10 items-start text-white bg-black/70">
          <img src="/image/W.png" alt="Logo" className="w-24 mb-9" />
          <h2 className="text-3xl font-semibold mb-1">Hello there!</h2>
          <p className="text-sm text-gray-300 mb-9">Lorem ipsum dolor sit amet</p>
          
          <form className="w-full">
            <label className="text-xs mb-1 block">Email</label> 
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="mb-5 w-full p-3 mt-1 rounded-lg bg-gray-200/20 border border-gray-500 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            
            <label className="text-xs mt-4 mb-1 block">Password</label>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password" 
              className="w-full p-3 mt-1 rounded-lg bg-gray-200/20 border border-gray-500 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none"
            >
            {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
            </button>
            <button 
              type="submit" 
              className="w-full p-3 mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
            >
              Log In
            </button>
            <button className="p-3 rounded-full bg-white text-black hover:bg-gray-300 transition">
              &larr;
            </button>
          </form>
        </div>  
        
        {/* Bagian Testimonial */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black p-10 text-white">
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

export default LoginPage;