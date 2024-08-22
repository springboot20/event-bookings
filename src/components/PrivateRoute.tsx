import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { tokens, user } = useAuth();

  if (!user || !tokens) return <Navigate to={"/auth/login"} replace />;

  return children;
};
