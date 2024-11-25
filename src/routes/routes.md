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
  ErrorBoundary?: React.ComponentType;
  children?: RouteType[];
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

const nestedroutes = (routes: RouteType[]) => {
  const routemap: Record<string, RouteType> = {};

  for (const route of routes) {
    const pathSegments = route.path.split("/");

    let currentPath = "";

    for (let i = 0; i < pathSegments.length; i++) {
      const pathSegment = pathSegments[i];
      currentPath = currentPath ? `${currentPath}/${pathSegment}` : pathSegment;

      if (!routemap[currentPath]) {
        routemap[currentPath] = {
          ...route,
          path: currentPath,
          children: [],
        };
      }

      if (i > 0) {
        const parentPath = currentPath.replace(new RegExp(`/${pathSegment}$`), "");
        routemap[parentPath]?.children?.push(routemap[currentPath]);
      }
    }
  }

  return Object.values(routemap).filter((route) => !route.path.includes("/"));
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

const transformPath = (filePath: string): string => {
  let match = filePath.match(/\.\/pages\/(.*)\.tsx$/);
  if (!match) return "";

  let filename = match[1];

  // Replace special characters and handle nested folder
  return filename
    .replace(/\/index$/, "") // remove `/index` from the end of the path
    .replace(/\$/g, ":") // replace `$` with `:` for dynamic routes
    .toLowerCase();
};

export const router = () => {
  const pages: PagesTypes = import.meta.glob("../pages/**/*.tsx", { eager: true });

  const routes: RouteType[] = Object.keys(pages).map((filePath) => {
    const path = transformPath(filePath);

    return {
      path,
      Element: pages[path]?.default,
      loader: pages[path]?.loader,
      action: pages[path]?.action,
      ErrorBoundary: pages[path]?.ErrorBoundary,
    };
  });

  const bookingsroutes = {
    element: <BookingLayout />,
    children: nestedroutes(
      routes.map(({ Element, ErrorBoundary, ...rest }) => ({
        ...rest,
        element: getRouteElement(rest.path, Element),
        ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
      })),
    ),
  };

  console.log(routes);

  const router = createBrowserRouter([authroutes(), bookingsroutes]);

  return router;
};
