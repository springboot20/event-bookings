import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tokens, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  if (tokens && isAuthenticated) return <Navigate to={'/'} />;

  return children;
};
