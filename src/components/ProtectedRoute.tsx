import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, checkTokenValidity, isVerified } from "./utils/middleware";
import { MultiStepFormModal } from "./Trainee/pages/secondpge/Verification/multi-step-form-modal";
import { toast } from "react-toastify";
import { DotSpinner } from "./SpinnerLoading";
import "react-toastify/dist/ReactToastify.css";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isVerifiedUser, setIsVerifiedUser] = useState<boolean | null>(null);
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
    const checkVerification = async () => {
      const verified = await isVerified();
      setIsVerifiedUser(verified);

      if (!verified) {
        toast.error("You have to verify first!");
        setIsModalOpen(true);
      }
    };

    checkVerification();
  }, []);

  if (isVerifiedUser === false) {
    return (
      <>
        {isModalOpen && <MultiStepFormModal onClose={() => setIsModalOpen(false)} isOpen />}
      </>
    );
  }

  if (isValid === null || isVerifiedUser === null) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <DotSpinner />
      </div>
    );
  }
  

  if (!isValid) {
    return <Navigate to="/" />; // Redirect to login page if checks fail
  }

  return <>{children}</>;
};

export default ProtectedRoute;
