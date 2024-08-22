import React, { useEffect, useState, createContext, useMemo } from "react";
import { AuthContext, AuthContextProviderProps, TokensInterface } from "../../types/context";
import { UserInterface } from "../../types/user";
import { EventBookingsApiReqeustHandler, LocalStorage } from "../../api/api";
import { EventBookingsClientApi, login_user, register_user } from "../../configs/api.config";
import { Loader } from "../../components/loaders/Loader";

export const AuthContextWrapper = createContext<AuthContext>({} as AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>(LocalStorage.get("user"));
  const [tokens, setTokens] = useState<TokensInterface>({} as TokensInterface);

  const register = async (data: { email: string; password: string; username: string }) => {
    await EventBookingsApiReqeustHandler({
      api: async () => await register_user(data),
      setLoading: setIsLoading,
      onSuccess: (response) => {
        const { data } = response;

        setUser(data.user);

        LocalStorage.set("user", data.user);

        return response;
      },
      onError(error, toast) {
        toast(error);
      },
    });
  };

  const login = async (data: { email: string; password: string }) => {
    await EventBookingsApiReqeustHandler({
      api: async () => await login_user(data),
      setLoading: setIsLoading,
      onSuccess: (response) => {
        const { data } = response;

        setUser(data.user);
        setTokens(data.tokens);

        LocalStorage.set("user", data.user);
        LocalStorage.set("tokens", data.tokens);
        return response;
      },
      onError(error, toast) {
        toast(error);
      },
    });
  };

  const value = useMemo(() => ({ user, tokens, register, login }), []);

  const setAuthorizationHeader = () => {
    if (tokens.accessToken) {
      EventBookingsClientApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokens.accessToken}`;
    } else {
      delete EventBookingsClientApi.defaults.headers.common["Authorization"];
      LocalStorage.remove("token");
    }
  };

  setAuthorizationHeader();

  useEffect(() => {
    setIsLoading(true);

    const userFromStore = LocalStorage.get("user");
    const tokensFromStore = LocalStorage.get("tokens");

    if (userFromStore && tokensFromStore) {
      setUser(userFromStore);
      setTokens(tokensFromStore);
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContextWrapper.Provider value={value}>
      {isLoading ? <Loader /> : children}
    </AuthContextWrapper.Provider>
  );
};
