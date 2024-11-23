/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import AuthLayout from '../layout/AuthLayout';
import Register from '../pages/register/Register';

const BookingLayout = lazy(() => import('../layout/BookingLayout'));
const BookingHome = lazy(() => import('../pages'));
const BookingEvents = lazy(() => import('../pages/events'));
const IndividualBookingEvent = lazy(() => import('../pages/events/$id'));
const CreateEventForm = lazy(() => import('../pages/events/create'));
const EditEventForm = lazy(() => import('../pages/events/edit/$id'));

import { PrivateRoute } from '../components/PrivateRoute';

import { AcceptedPersmissonRoles } from '../util';
import { PublicRoute } from '../components/PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BookingLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN, AcceptedPersmissonRoles.USER]}>
            <BookingHome />
          </PrivateRoute>
        ),
      },
      {
        path: 'events',
        children: [
          {
            index: true,
            element: (
              <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN, AcceptedPersmissonRoles.USER]}>
                <BookingEvents />
              </PrivateRoute>
            ),
          },
          {
            path: ':eventId',
            element: (
              <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN, AcceptedPersmissonRoles.USER]}>
                <IndividualBookingEvent />
              </PrivateRoute>
            ),
          },
          {
            path: 'create-event',
            element: (
              <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN]}>
                <CreateEventForm />
              </PrivateRoute>
            ),
          },
          {
            path: 'edit-event/:eventId',
            element: (
              <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN]}>
                <EditEventForm />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
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
    ],
  },
]);
