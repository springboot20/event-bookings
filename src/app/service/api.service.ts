import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorage } from "../util";
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

let displayedMessages = new Set();

/**
 * Log a warning and show a toast!
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  console.log(action);
  if (isRejectedWithValue(action)) {
    const message = action.payload
      ? (action.payload as { data: any }).data?.message
      : action.error.message;
    if (message && !displayedMessages.has(message)) {
      displayedMessages.add(message);
      toast.error(message, {
        className: "text-xs",
        onClose: () => displayedMessages.delete(message),
      });
    }
  } else if (isFulfilled(action)) {
    const message = (action.payload as { message: string })?.message;
    // Check if the message has already been displayed
    if (message && !displayedMessages.has(message)) {
      displayedMessages.add(message);
      toast.success(message, {
        className: "text-xs",
        onClose: () => displayedMessages.delete(message),
      });
    }
  }

  return next(action);
};
