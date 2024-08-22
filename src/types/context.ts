import React from "react";
import { UserInterface } from "./user";

export interface AuthContext {
  user: UserInterface | undefined;
  tokens: TokensInterface;
  register: (data: { email: string; password: string; username: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
}

export interface TokensInterface {
  accessToken: string;
  refrehToken: string;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}
