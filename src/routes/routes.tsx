import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/register/Register";

const BookingLayout = lazy(() => import("../layout/BookingLayout"));
const BookingHome = lazy(() => import("../pages/home/Home"));
const BookingEvents = lazy(() => import("../pages/events/Events"));
const BookingEventForm = lazy(() => import("../pages/form/Event"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BookingLayout />,
    children: [
      {
        path: "home",
        element: <BookingHome />,
      },
      {
        path: "events",
        children: [
          {
            index: true,
            element: <BookingEvents />,
          },
          {
            path: "create-event",
            element: <BookingEventForm />,
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
