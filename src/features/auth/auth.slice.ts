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

interface Query {
  [key: string]: any;
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

    refreshAccessToken: builder.mutation<Response, { inComingRefreshToken: string }>({
      query: ({ inComingRefreshToken }) => ({
        url: "/auth/refresh-access-token",
        method: "POST",
        body: { inComingRefreshToken },
      }),
    }),

    verifyEmail: builder.mutation<Response, Query>({
      query: ({ id, token }) => {
        return {
          url: `/auth/verify-email?id=${id}&token=${token}`,
          method: "POST",
        };
      },
    }),

    resendEmailVerification: builder.mutation<Response, void>({
      query: () => ({
        url: "/auth/resend-email-verification",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation<Response, { email: string }>({
      query: ({ email }) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: { email },
      }),
    }),

    resetForgottenPassword: builder.mutation<Response, Query>({
      query: ({ newPassword, email, resetToken }) => ({
        url: `/auth/reset-forgotten-password?=resetToken=${resetToken}`,
        method: "POST",
        body: { newPassword, email },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshAccessTokenMutation,
  useResendEmailVerificationMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetForgottenPasswordMutation,
} = AuthApiSlice;
