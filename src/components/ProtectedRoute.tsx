import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, checkTokenValidity, isVerified } from './utils/middleware';
import { MultiStepFormModal } from './Trainee/pages/secondpge/Verification/multi-step-form-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (!isVerified()) {
      toast.error('You have to verify first!');
      setIsModalOpen(true);
    }
  }, []);

  if (!isVerified()) {
    return (
      <>
        {isModalOpen && <MultiStepFormModal onClose={() => setIsModalOpen(false)} isOpen/>}
      </>
    );
  }

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" />; // Redirect to login page if checks fail
  }

  return <>{children}</>; // Render the child components if valid
};

export default ProtectedRoute;
