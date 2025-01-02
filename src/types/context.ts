import React from "react";
import { UserInterface } from "./user";
import { EventInterface } from "./events";
export interface AuthContextInteface {
  user: UserInterface | undefined;
  tokens: TokensInterface;
  register: (data: { email: string; password: string; username: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export interface TokensInterface {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

/**
 * Events
 */

export interface EventContextInterface {
  isLoading: boolean;
  events: EventInterface[] | undefined;
  event: EventInterface;
  fetchEvent: (id: string) => Promise<void>;
  createEvent: (data: EventInput) => Promise<void>;
  updateEvent: (data: EventInput, id: string) => Promise<void>;
}

export interface EventContextProviderProps {
  children: React.ReactNode;
}

export type EventInput = {
  title: string;
  description: string;
  price: number;
  location: string;
  eventDate: string;
  category: string;
  from: string;
  to: string;
  capacity: number;
};
