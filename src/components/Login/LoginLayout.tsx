import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export function LoginLayout({ children, icon, title, subtitle }: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md relative">        
        <div className="text-center mb-8">
          {icon}
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 relative">
          {children}
        </div>
      </div>
    </div>
  );
}
