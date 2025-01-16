// src/components/RoleBasedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, verifyRoles } from './utils/middleware';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const Rbac: React.FC<RoleBasedRouteProps> = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/unauthorized" />;
  }

  if (!verifyRoles(allowedRoles)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default Rbac;
