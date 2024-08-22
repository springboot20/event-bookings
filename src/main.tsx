import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { AuthContextProvider } from "./context/auth/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SkeletonTheme>
        <App />
      </SkeletonTheme>
    </AuthContextProvider>
  </React.StrictMode>,
);
