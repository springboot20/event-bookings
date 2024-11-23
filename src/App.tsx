import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Loader } from './components/loaders/Loader';
import { router } from './routes/routes';

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router()} />
    </Suspense>
  );
}
