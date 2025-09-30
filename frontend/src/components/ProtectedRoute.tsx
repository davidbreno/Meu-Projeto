import { Navigate, useLocation } from "react-router-dom";
import type { PropsWithChildren } from "react";

import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
