import { configureStore } from "@reduxjs/toolkit";
import { ApiService } from "./service/api.service";
import { authReducer } from "../features/auth/auth.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [ApiService.reducerPath]: ApiService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiService.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
