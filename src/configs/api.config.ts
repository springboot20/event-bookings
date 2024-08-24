import axios from "axios";
import { EventInput } from "../types/context";
import { LocalStorage } from "../api/api";

export const EventBookingsClientApi = axios.create({
  baseURL: "http://localhost:5020/api/v1",
});

EventBookingsClientApi.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const tokens = LocalStorage.get("tokens");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${tokens.acceccToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const register_user = (data: { email: string; password: string; username: string }) =>
  EventBookingsClientApi.post("/auth/register", data);

export const login_user = (data: { email: string; password: string }) =>
  EventBookingsClientApi.post("/auth/login", data);

export const logOut = () =>
  EventBookingsClientApi.post("/auth/logout");

// event

export const createNewEvent = (data: EventInput) => EventBookingsClientApi.post("/events", data);

export const updateExistingEvent = (data: EventInput, id: string) =>
  EventBookingsClientApi.patch(`/events/${id}`, data);

export const fetchEvents = () => EventBookingsClientApi.get("/events");

export const fetchUserEvent = (id: string) => EventBookingsClientApi.get(`/events/${id}`);
