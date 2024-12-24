import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LoginFormProps {
  type: 'mentor' | 'trainee';
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({ type, onSubmit }: LoginFormProps) {
  const accentColor = type === 'mentor' ? 'indigo' : 'purple';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}-500 focus:border-${accentColor}-500 transition-colors`}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}-500 focus:border-${accentColor}-500 transition-colors`}
          placeholder="Enter your password"
        />
      </div>

      <div className="flex items-center justify-between">
        {/* <label className="flex items-center">
          <input
            type="checkbox"
            className={`rounded border-gray-300 text-${accentColor}-600 shadow-sm focus:border-${accentColor}-300 focus:ring focus:ring-${accentColor}-200 focus:ring-opacity-50`}
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label> */}
        <a
          href="#"
          className={`text-sm font-medium text-${accentColor}-600 hover:text-${accentColor}-500`}
        >
          Dont have an account?
        </a>
      </div>

      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium transition-all duration-200 bg-wgs-blue hover:bg-wgs-blue`}
      >
        Sign In
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}