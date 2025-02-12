import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { useCallback, useEffect } from "react";
import { LocalStorage } from "./app/util";
import { jwtDecode } from "jwt-decode";
import { useRefreshAccessTokenMutation } from "./features/auth/auth.slice";
import { TokensInterface } from "./types/context";

export default function App() {
  const [refreshAccessToken] = useRefreshAccessTokenMutation();

  const refreshToken = useCallback(
    async (inComingRefreshToken: string) => {
      try {
        const response = await refreshAccessToken({ inComingRefreshToken }).unwrap();

        const { data } = response;

        LocalStorage.set("tokens", data?.tokens);
      } catch (error: any) {
        console.log(error);
      }
    },
    [refreshAccessToken]
  );

  const authenticationExpires = useCallback((token: string) => {
    try {
      if (!token) {
        LocalStorage.set("authentified", false);
        return;
      }

      const decodedToken = jwtDecode<{ exp: number }>(token);
      const expirationTime = decodedToken?.exp;

      return !expirationTime || Date.now() >= expirationTime * 1000;
    } catch (error) {
      console.error("Error decoding token:", error);
      LocalStorage.set("authentified", false);
    }
  }, []);

  useEffect(() => {
    const tokens = LocalStorage.get("tokens") as TokensInterface;
    const isTokenExpired = authenticationExpires(tokens?.accessToken);

    if (isTokenExpired) {
      refreshToken(tokens?.refreshToken);
    }
  }, [authenticationExpires, refreshToken]);

  return <RouterProvider router={router()} />;
}
