import { ApiService } from '../../app/service/api.service';

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface UserQuery {
  [key: string]: any;
}

const UserApiSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query<Response, void>({
      query: () => ({
        url: `/auth/current-user`,
        method: 'GET',
      }),
    }),

    updateUserAvatar: builder.mutation<Response, UserQuery>({
      query: (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        return {
          url: '/auth/upload-avatar',
          body: formData,
          method: 'PUT',
        };
      },
    }),

    changeCurrentPassword: builder.mutation<Response, UserQuery>({
      query: (data) => {
        return {
          url: '/auth/change-current-password',
          body: data,
          method: 'PUT',
        };
      },
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useChangeCurrentPasswordMutation,
  useUpdateUserAvatarMutation,
} = UserApiSlice;
