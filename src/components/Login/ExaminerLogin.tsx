import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { LoginLayout } from './LoginLayout';
import { ExaminerMentorForm } from './ExaminerMentorForm';

export function ExaminerLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    loginData: { email: string; password: string }
  ) => {
    e.preventDefault();

    const payload = {
      ...loginData,
      role: 'EXAMINER', // Add default role
    };

    try {
      const response = await fetch('http://192.168.1.12:4000/trainee/login', {
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

        navigate('/examiner/dashboard');
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
      title="Examiner Login"
      subtitle="Welcome back! Please login to access your examiner dashboard"
    >
      <ExaminerMentorForm type="examiner" onSubmit={handleSubmit} />
    </LoginLayout>
  );
}
