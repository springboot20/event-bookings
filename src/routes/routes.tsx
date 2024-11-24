import BookingLayout from "../layout/BookingLayout";
import { PublicRoute } from "../components/PublicRoute";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/login";
import Register from "../pages/register";
import { PrivateRoute } from "../components/PrivateRoute";
import { AcceptedPersmissonRoles } from "../util";
import { createBrowserRouter, Navigate } from "react-router-dom";

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

const authroutes = () => ({
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
    {
      path: "logout",
      element: <Navigate to={"/login"} replace state={{ path: window.location.pathname }} />,
    },
  ],
});

const bookingsroutes = (routes: RouteType[]) => {
  return {
    element: <BookingLayout />,
    children: routes.map(({ Element, ErrorBoundary, ...rest }) => ({
      ...rest,
      element: getRouteElement(rest.path, Element),
      ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    })),
  };
};
const getRouteElement = (path: string, Element: React.ComponentType): JSX.Element => {
  const isProtectedFile = path.split("/").includes("create") || path.split("/").includes("edit");
  if (isProtectedFile) {
    return (
      <PrivateRoute roles={[AcceptedPersmissonRoles.ADMIN]}>
        <Element />
      </PrivateRoute>
    );
  }

  if (path === "/") {
    return <Element />;
  }

  return (
    <PrivateRoute roles={[AcceptedPersmissonRoles.USER, AcceptedPersmissonRoles.ADMIN]}>
      <Element />
    </PrivateRoute>
  );
};

const transformPath = (filename: string): string => {
  if (filename === "index") return "/";

  return filename.includes("$")
    ? filename.replace("$", ":").toLowerCase()
    : filename.replace(/\/index/, "").toLowerCase();
};

export const router = () => {
  const pages: PagesTypes = import.meta.glob("../pages/**/*.tsx", { eager: true });

  const routes: RouteType[] = [];

  Object.keys(pages).reduce<RouteType[]>((acc, path) => {
    let filename = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];

    if (!filename) return acc;

    const pathname = transformPath(filename);

    routes.push({
      path: pathname,
      Element: pages[path]?.default,
      loader: pages[path]?.loader,
      action: pages[path]?.action,
      ErrorBoundary: pages[path]?.ErrorBoundary,
    });

    return acc;
  }, []);

  const router = createBrowserRouter([authroutes(), bookingsroutes(routes)]);

  return router;
};
