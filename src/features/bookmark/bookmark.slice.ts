import { ApiService } from '../../app/service/api.service';

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface BookmarkMutation {
  [x: string]: any;
}

const BookmarkSlice = ApiService.injectEndpoints({
  endpoints: function (builder) {
    return {
      addEventToBookmark: builder.mutation<Response, BookmarkMutation>({
        query: ({ eventId, seats = [] }) => ({
          url: `/bookmarks/${eventId}`,
          body: { seats },
          method: 'POST',
        }),
      }),
    };
  },
});

export const { useAddEventToBookmarkMutation } = BookmarkSlice;
