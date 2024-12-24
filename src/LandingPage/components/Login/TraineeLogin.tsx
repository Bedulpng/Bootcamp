import React from 'react';
import { GraduationCap } from 'lucide-react';
import { LoginLayout } from './LoginLayout';
import { LoginForm } from './LoginForm';

export function TraineeLogin() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle trainee login logic here
  };

  return (
    <LoginLayout
      icon={<GraduationCap className="h-12 w-12 mx-auto text-purple-600 mb-2" />}
      title="Trainee Login"
      subtitle="Welcome! Please login to access your learning journey"
    >
      <LoginForm type="trainee" onSubmit={handleSubmit} />
    </LoginLayout>
  );
}