import { AxiosResponse } from "axios";
import { ToastOptions } from "react-toastify";

export interface ApiRequestHandlerProps {
  api: () => Promise<AxiosResponse<ApiResponseInterface, any>>;
  setLoading: ((loading: boolean) => void) | null;
  onSuccess: (
    data: ApiResponseInterface,
    message: string,
    toast: (content: React.ReactNode, options?: ToastOptions) => React.ReactText,
  ) => void;
  onError: (
    error: string,
    toast: (content: React.ReactNode, options?: ToastOptions) => React.ReactText,
  ) => void;
}

export interface ApiResponseInterface {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}
