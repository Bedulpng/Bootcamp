import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { LoginLayout } from './LoginLayout';
import { ExaminerMentorForm } from './ExaminerMentorForm';

export function MentorLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    loginData: { email: string; password: string }
  ) => {
    e.preventDefault();

    const payload = {
      ...loginData,
      role: 'MENTOR', // Add default role
    };

    try {
      const response = await fetch('http://10.10.103.13:4000/trainee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken, refreshToken } = data;

        // Save tokens to localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An unexpected error occurred during login.');
    }
  };

  return (
    <LoginLayout
      icon={<Users className="h-12 w-12 mx-auto text-indigo-600 mb-2" />}
      title="Mentor Login"
      subtitle="Welcome back! Please login to access your mentoring dashboard"
    >
      <ExaminerMentorForm type="mentor" onSubmit={handleSubmit} />
    </LoginLayout>
  );
}
