import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export const PrivateRoute = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) => {
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);

  if ((roles && !roles.includes(user.role)) || !isAuthenticated) {
    return <Navigate to='/auth/login' />;
  }

  return children;
};
