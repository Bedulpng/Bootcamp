import React, { useState } from 'react';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';
import { LoginLayout } from './LoginLayout';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';

// Tipe untuk login data
type LoginData = {
  email: string;
  password: string;
};

export function TraineeLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, loginData: LoginData) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://10.10.103.160:4000/trainee/login', {
        ...loginData,
        role: 'TRAINEE', // Menambahkan role TRAINEE secara default
      });

      const { accessToken, refreshToken } = response.data;

      // Simpan token ke localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirect atau log pesan sukses
      navigate('/trainee/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || 'An error occurred. Please check your credentials.';
        setError(message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout
      icon={<GraduationCap className="h-12 w-12 mx-auto text-purple-600 mb-2" />}
      title="Trainee Login"
      subtitle="Welcome! Please login to access your learning journey"
    >
      <LoginForm
        type="trainee"
        onSubmit={(e, loginData) => handleSubmit(e, loginData)}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </LoginLayout>
  );
}
