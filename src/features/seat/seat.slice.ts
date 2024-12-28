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
      query: ({ seat, reservedAt, eventId }) => ({
        url: `/seats/book-seat/${eventId}`,
        method: 'POST',
        body: { seat, reservedAt },
      }),
    }),
  }),
});

export const { useGetAllEventSeatsQuery, useReserveSeatForEventMutation } = SeatApiSlice;
