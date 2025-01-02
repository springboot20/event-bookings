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
    getAllEventSeats: builder.query<Response, SeatQuery>({
      query: ({ eventId, isReserved }) => ({
        url: `/seats?eventId=${eventId}&isReserved=${isReserved}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...(result.data?.seats || result?.data || []).map((s: any) => ({
                type: 'Seat' as const,
                id: s._id,
              })),
              { type: 'Seat', id: 'SEAT' },
            ]
          : [{ type: 'Seat', id: 'SEAT' }],
    }),

    reserveSeatForEvent: builder.mutation<Response, SeatQuery>({
      query: ({ seats, reservedAt, eventId }) => ({
        url: `/seats/book-seat/${eventId}`,
        method: 'POST',
        body: { seats, reservedAt },
      }),
    }),

    getSeatsByEvent: builder.query<Response, string>({
      query: (eventId) => ({
        url: `/seats/${eventId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllEventSeatsQuery, useGetSeatsByEventQuery, useReserveSeatForEventMutation } =
  SeatApiSlice;
