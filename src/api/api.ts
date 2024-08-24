import { AxiosResponse } from "axios";
import { ApiResponseInterface } from "../types/api";

export const EventBookingsApiReqeustHandler = async (
  api: () => Promise<AxiosResponse<ApiResponseInterface, any>>,
  setLoading: ((loading: boolean) => void) | null,
  onSuccess: (data: ApiResponseInterface) => void,
  onError: (error: string) => void,
) => {
  setLoading && setLoading(true);

  try {
    const response = await api();
    const { data } = response;

    if (data?.success && response.status.toString().startsWith("2")) {
      onSuccess(data);
    }
  } catch (error: any) {
    if ([401, 403].includes(error?.response?.data.statusCode)) {
      LocalStorage.clear();
      if (isBrowser) window.location.href = "./home";
    }
    onError(error?.response?.data?.message ?? "something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

export const isBrowser = typeof window !== "undefined";

export class LocalStorage {
  static get(key: string) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static set(key: string, value: any) {
    if (!isBrowser) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
