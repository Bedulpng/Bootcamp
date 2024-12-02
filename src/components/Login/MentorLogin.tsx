import React from 'react';
import { Users } from 'lucide-react';
import { LoginLayout } from './LoginLayout';
import { LoginForm } from './LoginForm';

export function MentorLogin() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle mentor login logic here
  };

  return (
    <LoginLayout
      icon={<Users className="h-12 w-12 mx-auto text-indigo-600 mb-2" />}
      title="Mentor Login"
      subtitle="Welcome back! Please login to access your mentoring dashboard"
    >
      <LoginForm type="mentor" onSubmit={handleSubmit} />
    </LoginLayout>
  );
}