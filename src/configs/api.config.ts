import axios, { isAxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { EventInput } from "../types/context";

export const EventBookingsClientApi = axios.create({
  baseURL: "http://localhost:5020/api/v1",
});

interface EventBookingsClientApiProps extends AxiosRequestConfig {
  showSuccessNotification: boolean;
}

export const EventBookingsService = ({
  showSuccessNotification = true,
  ...props
}: EventBookingsClientApiProps) => {
  EventBookingsClientApi.interceptors.response.use(
    (config: AxiosResponse) => {
      if (config.status.toString().startsWith("2")) {
        showSuccessNotification ? toast.success(config.data.message) : "";
      }

      return config;
    },
    (error) => {
      if (isAxiosError(error)) {
        const errorMsg = (error.response?.data as { error?: string })?.error;
        const errorWithMsg = (error.response?.data as { message?: string })?.message;

        if (errorMsg) {
          toast.error(errorMsg);
        } else if (errorWithMsg) {
          toast.error(errorWithMsg);
        }
      } else {
        toast.error(error.message);
      }

      return Promise.reject(error);
    },
  );

  return EventBookingsClientApi({ ...props });
};

export const register_user = (data: { email: string; password: string; username: string }) =>
  EventBookingsClientApi.post("/auth/register", data);

export const login_user = (data: { email: string; password: string }) =>
  EventBookingsClientApi.post("/auth/login", data);

// event

export const createNewEvent = (data: EventInput) => EventBookingsClientApi.post("/events", data);

export const updateExistingEvent = (data: EventInput, id: string) =>
  EventBookingsClientApi.patch(`/events/${id}`, data);

export const fetchEvents = () => EventBookingsClientApi.get("/events");

export const fetchUserEvent = (id: string) => EventBookingsClientApi.get(`/events/${id}`);
