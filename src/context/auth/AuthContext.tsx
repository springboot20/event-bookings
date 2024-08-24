import React, { useEffect, useState, createContext, useMemo } from "react";
import {
  AuthContextInteface,
  AuthContextProviderProps,
  TokensInterface,
} from "../../types/context";
import { UserInterface } from "../../types/user";
import { EventBookingsApiReqeustHandler, LocalStorage } from "../../api/api";
import { login_user, logOut, register_user } from "../../configs/api.config";
import { toast } from "react-toastify";

export const AuthContext = createContext<AuthContextInteface>({} as AuthContextInteface);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>(LocalStorage.get("user") as UserInterface);
  const [tokens, setTokens] = useState<TokensInterface>({} as TokensInterface);

  const register = async (data: { email: string; password: string; username: string }) => {
    await EventBookingsApiReqeustHandler(
      async () => await register_user(data),
      setIsLoading,
      (response) => {
        const { data } = response;

        setUser(data.user);

        LocalStorage.set("user", data.user);

        toast.success(data.message);

        return response;
      },
      toast.error,
    );
  };

  const login = async (data: { email: string; password: string }) => {
    await EventBookingsApiReqeustHandler(
      async () => await login_user(data),
      setIsLoading,
      (response) => {
        const { data } = response;

        setUser(data.user);
        setTokens(data.tokens);

        LocalStorage.set("user", data.user);
        LocalStorage.set("tokens", data.tokens);

        toast.success(data.message);
        return response;
      },
      toast.error,
    );
  };

  const logout = async () => {
    await EventBookingsApiReqeustHandler(
      async () => await logOut(),
      setIsLoading,
      (response) => {
        const { data } = response;

        setUser({} as UserInterface);
        setTokens({} as TokensInterface);

        LocalStorage.remove("user");
        LocalStorage.remove("tokens");

        toast.success(data.message);
        return data;
      },
      toast.error,
    );
  };

  const value = useMemo(() => ({ user, tokens, register, login, logout }), [user, tokens]);

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
