import { configureStore } from "@reduxjs/toolkit";
import { ApiService, rtkQueryErrorLogger } from "./service/api.service";
import { authReducer } from "../features/auth/auth.reducer";
import { bookmarkReducer } from "../features/bookmark/bookmark.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmark: bookmarkReducer,
    [ApiService.reducerPath]: ApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiService.middleware, rtkQueryErrorLogger),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
