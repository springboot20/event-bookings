import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorage } from "../../util";
import { TokensInterface } from "../../types/context";
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
  
export const ApiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/bookings",
    prepareHeaders: (headers) => {
      const tokens = LocalStorage.get("tokens") as TokensInterface;
      if (tokens) {
        headers.set("Authorization", `Bearer ${tokens?.accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Event", "Category", "Seat", "Bookmark"],
  endpoints: () => ({}),
});

/**
 * Log a warning and show a toast!
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const message = action.payload
      ? (action.payload as { data: any }).data?.message
      : action.error.message;
    toast.error(message, { className: "text-xs" });
  } else if (isFulfilled(action)) {
    const message = (action.payload as { message: string })?.message;
    toast.success(message, { className: "text-xs" });
  }

  return next(action);
};
