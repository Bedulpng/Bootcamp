// src/utils/middleware.ts
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';

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
export const isVerified = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("refreshToken");
    if (!token) return false;

    const response = await axios.get("http://10.10.103.248:4000/trainee/status", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.Status === "VERIFIED";
  } catch (error) {
    console.error("Error fetching user status:", error);
    return false;
  }
};

export const isLoggedIn = (): boolean => {
  const accessToken = localStorage.getItem('accessToken'); // Replace 'token' with your key for the token
  if (!accessToken) {
    console.warn('No token found. User is not logged in.');
    return false;
  }

  try {
    const decoded = jwtDecode<CustomJwtPayload>(accessToken); // Decode the token

    // Check for token expiration (if exp exists)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.warn('Token has expired.');
      return false;
    }

    // If token exists and is valid, the user is logged in
    return true;
  } catch (error) { 
    console.error('Error decoding token:', error);
    return false;
  }
};

export const checkTokenValidity = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve token from storage

  try {
    await axios.post(
      'http://10.10.103.248:4000/api/check-token',
      {}, 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Send token in Authorization header
        },
      }
    );

    // If the response is successful, the token is valid  
    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const data = error.response.data;
      alert(data.message); // Notify user of token expiration and logout
      localStorage.removeItem('refreshToken'); // Clear token from storage
    } else {
      console.error('Unexpected error during token validation:', error);
    }
    return false; // Return false for invalid token or other errors
  }
};


