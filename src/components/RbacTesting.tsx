// src/components/RoleBasedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isAuthenticated } from "./utils/middleware";
import { DotSpinner } from "./SpinnerLoading";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  routeName: string;
}

interface DecodedToken {
  role: string;
  exp: number;
}

const getUserRole = (): string | null => {
  const token = localStorage.getItem("refreshToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

const RbacTest: React.FC<RoleBasedRouteProps> = ({ children, routeName }) => {
  const [allowedRoles, setAllowedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const userRole = getUserRole();
  console.log("current role", userRole);

  useEffect(() => {
    const fetchAllowedRoles = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.12:4000/api/allowed?route=${routeName}`
        );
        setAllowedRoles(response.data.allowedRoles);
      } catch (error) {
        console.error("Failed to fetch allowed roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllowedRoles();
  }, [routeName]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <DotSpinner />
      </div>
    );

  const hasAccess = userRole && allowedRoles.includes(userRole);

  if (!isAuthenticated() || !hasAccess) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default RbacTest;
