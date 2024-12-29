import BookingLayout from '../layout/BookingLayout';
import { PublicRoute } from '../components/PublicRoute';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/login';
import Register from '../pages/register';
import { PrivateRoute } from '../components/PrivateRoute';
import { AcceptedPersmissonRoles } from '../util';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Events from '../pages/events';
import EditEvent from '../pages/events/edit/edit-event';
import Event from '../pages/events/event';
import BookingHome from '../pages';
import Seats from '../pages/events/event/seats';
import CreateEvent from '../pages/events/create-event';
import Bookings from '../pages/bookings';
import Settings from '../pages/settings';
import Profile from '../pages/settings/profile/Index';

const authroutes = () => ({
  element: (
    <PublicRoute>
      <AuthLayout />
    </PublicRoute>
  ),
  children: [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'logout',
      element: <Navigate to={'/login'} replace state={{ path: window.location.pathname }} />,
    },
  ],
});

const bookingsroutes = () => {
  return {
    element: <BookingLayout />,
    children: [
      {
        path: '/',
        element: <BookingHome />,
      },
      {
        path: 'bookings',
        element: <Bookings />,
      },
      {
        path: 'settings',
        element: (
          <PrivateRoute roles={[AcceptedPersmissonRoles.USER, AcceptedPersmissonRoles.ADMIN]}>
            <Settings />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'account',
            element: <Profile />,
          },
        ],
      },
      {
        path: 'events',
        children: [
          {
            index: true,
            element: (
              <PrivateRoute roles={[AcceptedPersmissonRoles.USER, AcceptedPersmissonRoles.ADMIN]}>
                <Events />
              </PrivateRoute>
            ),
          },
          {
            path: 'create-event',
            element: (
              <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN]}>
                <CreateEvent />
              </PrivateRoute>
            ),
          },
          {
            path: ':eventId',
            children: [
              {
                index: true,
                element: (
                  <PrivateRoute
                    roles={[AcceptedPersmissonRoles.USER, AcceptedPersmissonRoles.ADMIN]}>
                    <Event />
                  </PrivateRoute>
                ),
              },
              {
                path: 'edit-event',
                element: (
                  <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN]}>
                    <EditEvent />
                  </PrivateRoute>
                ),
              },
              {
                path: 'seats',
                element: (
                  <PrivateRoute
                    roles={[AcceptedPersmissonRoles.ADMIN, AcceptedPersmissonRoles.USER]}>
                    <Seats />
                  </PrivateRoute>
                ),
              },
            ],
          },
        ],
      },
    ],
  };
};

export const router = () => {
  const router = createBrowserRouter([authroutes(), bookingsroutes()]);

  return router;
};
