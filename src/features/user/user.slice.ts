import { ApiService } from '../../app/service/api.service';

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

const UserApiSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query<Response, void>({
      query: () => ({
        url:`/auth/current-user`,
        method:"GET"
      }),
    }),
  }),
});

export const { useCurrentUserQuery } = UserApiSlice;
