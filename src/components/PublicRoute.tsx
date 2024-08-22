import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { tokens, user } = useAuth();

  if (user?._id && tokens.accessToken) return <Navigate to={"/home"} replace />;

  return children;
};
