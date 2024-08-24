import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tokens, user } = useAuth();

  console.log("loaded");

  if (tokens && user?._id) return <Navigate to={"/"} />;

  console.log(children)

  return children;
};
