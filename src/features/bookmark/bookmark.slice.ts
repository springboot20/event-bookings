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

      userBookmark: builder.query<Response, void>({
        query: () => ({
          url: `/bookmarks`,
          method: 'GET',
        }),
        providesTags: (result) =>
          result?.data?.bookmark
            ? [{ type: "Bookmark", id: result?.data?.bookmark._id }]
            : [{ type: "Bookmark", id: "BOOKMARK_ITEM" }],
      }),

      removeItemFromBookmark: builder.mutation<Response, string>({
        query: (eventId) => ({
          url: `/bookmarks/${eventId}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Bookmark", id: "BOOKMARK_ITEM" }],
      }),
    };
  },
});

export const { useAddEventToBookmarkMutation, useUserBookmarkQuery, useRemoveItemFromBookmarkMutation } = BookmarkSlice;
export { BookmarkSlice };
