import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { useCallback, useEffect } from 'react';
import { LocalStorage } from './util';
import { jwtDecode } from 'jwt-decode';
import { useRefreshAccessTokenMutation } from './features/auth/auth.slice';
import { TokensInterface } from './types/context';
import { AuthInitialState } from './features/auth/auth.reducer';

export default function App() {
  const [refreshAccessToken] = useRefreshAccessTokenMutation();

  const refreshToken = useCallback(
    async (inComingRefreshToken: string) => {
      try {
        const response = await refreshAccessToken({ inComingRefreshToken }).unwrap();

        const { data } = response;

        AuthInitialState.tokens = data?.tokens;

        LocalStorage.set('tokens', data?.tokens);
      } catch (error: any) {
        console.log(error);
      }
    },
    [refreshAccessToken]
  );

  const authenticationExpires = useCallback((token: string) => {
    try {
      if (!token) {
        AuthInitialState.isAuthenticated = false;
        return;
      }

      const decodedToken = jwtDecode<{ exp: number }>(token);
      const expirationTime = decodedToken?.exp;

      return !expirationTime || Date.now() >= expirationTime * 1000;
    } catch (error) {
      console.error('Error decoding token:', error);
      AuthInitialState.isAuthenticated = false;
    }
  }, []);

  useEffect(() => {
    const tokens = LocalStorage.get('tokens') as TokensInterface;
    const isTokenExpired = authenticationExpires(tokens?.accessToken);

    console.log(isTokenExpired);

    if (isTokenExpired) {
      refreshToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzZlNzUwNDU1YzJiZTAwZjQ5ZGZiMjUiLCJpYXQiOjE3MzU1MDA0MjUsImV4cCI6MTczODA5MjQyNX0.Y_FxPEwZp_Q7kGJOFVcTln2rLA4lcZhnR6fEUCj0cE4'
      );
    }
  }, [authenticationExpires, refreshToken]);

  return <RouterProvider router={router()} />;
}
