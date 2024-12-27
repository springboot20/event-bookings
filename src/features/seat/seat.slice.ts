import { ApiService } from '../../app/service/api.service';

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface SeatQuery {
  [key: string]: any;
}

export const SeatApiSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventSeats: builder.query<Response, string>({
      query: (eventId) => ({
        url: `/seats/${eventId}`,
        method: 'GET',
      }),
      // providesTags: (result) =>
      //   result?.data?.seats.length
      //     ? [
      //         ...(result.data?.seats || []).map((s: any) => ({
      //           type: 'Seat' as const,
      //           id: s._id,
      //         })),
      //         { type: 'Seat', id: 'SEAT' },
      //       ]
      //     : [{ type: 'Seat', id: 'SEAT' }],
    }),

    reserveSeatForEvent: builder.mutation<Response, SeatQuery>({
      query: ({ seat, reservedAt }) => ({
        url: '/seats',
        method: 'POST',
        body: { seat, reservedAt },
      }),
    }),
  }),
});

export const { useGetAllEventSeatsQuery, useReserveSeatForEventMutation } = SeatApiSlice;
