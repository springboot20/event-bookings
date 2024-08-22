import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/register/Register";

const BookingLayout = lazy(() => import("../layout/BookingLayout"));
const BookingHome = lazy(() => import("../pages/home/Home"));
const BookingEvents = lazy(() => import("../pages/events/Events"));
const BookingEventForm = lazy(() => import("../pages/form/Event"));

import { PublicRoute } from "../components/PublicRoute";
import { PrivateRoute } from "../components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BookingLayout />,
    children: [
      {
        path: "home",
        element: (
          <PublicRoute>
            <BookingHome />
          </PublicRoute>
        ),
      },
      {
        path: "events",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <BookingEvents />
              </PrivateRoute>
            ),
          },
          {
            path: "create-event",
            element: (
              <PrivateRoute>
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
    element: <AuthLayout />,
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
