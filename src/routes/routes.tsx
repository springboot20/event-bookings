import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/register/Register";
import { BookingHome } from "../pages/home/Home";

const BookingLayout = lazy(() => import("../layout/BookingLayout"));
// const BookingHome = lazy(() => import("../pages/home/Home"));
const BookingEvents = lazy(() => import("../pages/events/Events"));
const IndividualBookingEvent = lazy(() => import("../pages/events/Event"));
const BookingEventForm = lazy(() => import("../pages/form/Event"));

import { PrivateRoute } from "../components/PrivateRoute";

import { AcceptedPersmissonRoles } from "../util";
import { PublicRoute } from "../components/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
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
        path: "events",
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
            path: ":id",
            element: <IndividualBookingEvent />,
          },
          {
            path: "create-event",
            element: (
              <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN]}>
                <BookingEventForm />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
