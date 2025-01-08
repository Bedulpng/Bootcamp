// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, checkTokenValidity } from './utils/middleware';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateAccess = async () => {
      if (isLoggedIn()) {
        const tokenValid = await checkTokenValidity();
        setIsValid(tokenValid);
      } else {
        setIsValid(false); 
      }
    };
    validateAccess();
  }, []);

  if (isValid === null) {
    // Render a loading state while checks are being performed
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" />; // Redirect to login page if checks fail
  }

  return <>{children}</>; // Render the child components if valid
};

export default ProtectedRoute;
