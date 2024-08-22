import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Loader } from "./components/loaders/Loader";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
