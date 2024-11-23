import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from './components/loaders/Loader';
import BookingLayout from './layout/BookingLayout';
import { PublicRoute } from './components/PublicRoute';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/login';
import Register from './pages/register';
import { PrivateRoute } from './components/PrivateRoute';
import { AcceptedPersmissonRoles } from './util';

type PagesTypes = Record<
  string,
  {
    default: React.ComponentType;
    loader?: () => Promise<any>;
    action?: () => Promise<any>;
    ErrorBoundary: React.ComponentType;
  }
>;

type RouteType = {
  Element: React.ComponentType;
  path: string;
  loader?: () => Promise<any>;
  action?: () => Promise<any>;
  ErrorBoundary: React.ComponentType;
};

export default function App() {
  const pages: PagesTypes = import.meta.glob('./pages/**/*.tsx', { eager: true });

  const routes: RouteType[] = [];
  let filename: string | undefined;
  for (const path of Object.keys(pages)) {
    filename = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];

    if (!filename) {
      continue;
    }

    const pathname = filename.includes('$')
      ? filename.replace('$', ':')
      : filename.replace(/\/index/, '');

    routes.push({
      path: filename === 'index' ? '/' : `/${pathname.toLowerCase()}`,
      Element: pages[path]?.default,
      loader: pages[path]?.loader,
      action: pages[path]?.action,
      ErrorBoundary: pages[path]?.ErrorBoundary,
    });
  }

  console.log(routes);

  const router = createBrowserRouter(
    routes.map(({ Element, ErrorBoundary, ...rest }) => {
      const { path } = rest;
      return {
        children: [
          {
            element: <BookingLayout />,
            children: [
              {
                ...rest,
                element:
                  path.split('/').includes('create') || path.split('/').includes('edit') ? (
                    <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN]}>
                      <Element />
                    </PrivateRoute>
                  ) : path === '/' ? (
                    <PublicRoute>
                      <Element />
                    </PublicRoute>
                  ) : (
                    <PrivateRoute
                      roles={[AcceptedPersmissonRoles.USER, AcceptedPersmissonRoles.ADMIN]}>
                      <Element />
                    </PrivateRoute>
                  ),
                ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
              },
            ],
          },
          {
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
        ],
      };
    })
  );

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
