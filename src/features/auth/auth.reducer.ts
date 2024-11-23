import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { AuthApiSlice } from "./auth.slice";
import { TokensInterface } from "../../types/context";
import { UserInterface } from "../../types/user";

interface InitialState {
  tokens: TokensInterface;
  user: UserInterface;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  tokens: LocalStorage.get("tokens") as TokensInterface,
  user: LocalStorage.get("user") as UserInterface,
  isAuthenticated: LocalStorage.get("authentified") as boolean,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Login builder casing
     */
    builder.addMatcher(AuthApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { data } = payload;

      state.isAuthenticated = true;
      state.user = data.user;
      state.tokens = data.tokens;

      LocalStorage.set("user", data.user);
      LocalStorage.set("authentified", data.user.isAuthenticated);
      LocalStorage.set("tokens", data.tokens);
    });

    /**
     * Logout builder casing
     */
    builder.addMatcher(AuthApiSlice.endpoints.logout.matchFulfilled, (state) => {
      state.user = null!;
      state.tokens = null!;
      state.isAuthenticated = false;

      LocalStorage.remove("user");
      LocalStorage.remove("authentified");
      LocalStorage.remove("tokens");
    });
  },
});

export const authReducer = authSlice.reducer;
