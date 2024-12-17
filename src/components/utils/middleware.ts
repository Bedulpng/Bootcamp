// src/utils/middleware.ts
import { jwtDecode, JwtPayload } from 'jwt-decode';

// Extend JwtPayload to include custom fields
interface CustomJwtPayload extends JwtPayload {
  id?: string;
  role?: string;
  status?: string;
}

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('refreshToken');
  if (!token) return false;

  try {
    jwtDecode<CustomJwtPayload>(token); // Verify the token by decoding it
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

// Verify if the user has the required roles
export const verifyRoles = (allowedRoles: string[]): boolean => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return allowedRoles.includes(decoded.role || '');
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

// Check if the user is verified
export const isVerified = (): boolean => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.status === 'VERIFIED';
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};
