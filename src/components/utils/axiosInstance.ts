// src/utils/axiosInstance.ts
import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.254.104:4000', // Replace with your backend URL
});

// Request interceptor to include Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('accessToken');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
