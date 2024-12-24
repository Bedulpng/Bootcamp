import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginLayoutProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export function LoginLayout({ children, icon, title, subtitle }: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {icon}
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {children}
        </div>

        <button 
          className="mt-8 text-gray-600 hover:text-gray-800 flex items-center gap-2 mx-auto"
        >
          <ChevronLeft className="h-4 w-4" />
          <Link to="/" >Back to Home</Link>
        </button>
      </div>
    </div>
  );
}