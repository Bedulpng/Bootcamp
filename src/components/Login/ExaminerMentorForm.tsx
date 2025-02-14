import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface LoginFormProps {
  type: 'examiner' | 'mentor';
  onSubmit: (e: React.FormEvent<HTMLFormElement>, loginData: { email: string; password: string }) => Promise<void>;
}

export function ExaminerMentorForm({ type, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const accentColor = type === 'examiner' ? 'blue' : 'indigo';
  const switchTo = type === 'mentor' ? 'examiner' : 'mentor';
  const switchPath = `/login/${switchTo}`;
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e, { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}-500 focus:border-${accentColor}-500 transition-colors`}
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}-500 focus:border-${accentColor}-500 transition-colors`}
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Conditional Navigation Link */}
      <div className="flex items-center justify-between">
        <a href={switchPath} className={`text-sm font-medium text-${accentColor}-600 hover:text-${accentColor}-500 flex items-center gap-1`}>
          I'm {switchTo.charAt(0).toUpperCase() + switchTo.slice(1)}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <button type="submit" className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium transition-all duration-200 bg-wgs-blue">
        Sign In
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
