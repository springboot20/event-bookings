import { ApiService } from '../../app/service/api.service';

interface Response {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
}

interface ProfileQuery {
  [key: string]: any;
}

const ProfileSlice = ApiService.injectEndpoints({
  endpoints(builder) {
    return {
      updateProfile: builder.mutation<Response, ProfileQuery>({
        query: (data) => {
          return {
            url: '/profile',
            method: 'PUT',
            body: data,
          };
        },
      }),

      getUserProfile: builder.query<Response, void>({
        query: () => `/profile`,
      }),
    };
  },
});

export const { useUpdateProfileMutation, useGetUserProfileQuery } = ProfileSlice;
