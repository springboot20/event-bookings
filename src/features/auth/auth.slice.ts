import { ApiService } from "../../app/service/api.service";

interface RegisterMutation {
  username: string;
  email: string;
  password: string;
}

interface LoginMutation {
  email: string;
  password: string;
}

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const AuthApiSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<Response, RegisterMutation>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation<Response, LoginMutation>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<Response, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = AuthApiSlice;
