import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
      role: 'ADMIN',
    };

    try {
      const response = await axios.post('http://10.10.103.195:4000/trainee/login', payload);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/admin/dashboard');
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Email or password is incorrect');
      } else {
        setError('An unexpected error occurred during login.');
      }
    }
  };

  return (
    <div className="w-full max-w-[400px] p-8 rounded-xl bg-[#1A1A1A] space-y-6">
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full bg-black-500 flex items-center justify-center">
          <img src='/lil_white.png' className='h-10 w-10' />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="email"
              placeholder="Email Address"
              className="pl-10 bg-[#222222] border-0 text-white placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 bg-[#222222] border-0 text-white placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <Button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Login
        </Button>
      </form>
    </div>
  )
}
