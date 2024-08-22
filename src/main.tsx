import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { AuthContextProvider } from "./context/auth/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import { EventContextProvider } from "./context/events/EventContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <SkeletonTheme>
          <ToastContainer />
          <App />
        </SkeletonTheme>
      </EventContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
