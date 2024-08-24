import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) => {
  const { tokens, user } = useAuth();

  const allowedRoles = roles ?? ["ADMIN"];

  if (!user || !tokens) return <Navigate to={"/auth/login"} replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
