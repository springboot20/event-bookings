import { ApiService } from '../../app/service/api.service';
import { EventInterface } from '../../types/events';

interface Response {
  data: EventInterface | EventInterface[] | any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface EventQuery {
  [key: string]: any | undefined;
}

export interface EventMutation {
  [key: string]: any;
}

export const EventApiSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<Response, EventMutation>({
      query: (data) => ({
        url: '/events',
        method: 'POST',
        body: data,
        formData: true,
      }),
    }),

    getEventById: builder.query<Response, string>({
      query: (id) => `/events/${id}`,
      providesTags: (_, __, id) => [{ type: 'Event', id }],
    }),

    getAllEvents: builder.query<Response, EventQuery>({
      query: ({ limit = 10, page = 1, featured = false, title = '' }) =>
        `/events?limit=${limit}&page=${page}&featured=${featured}&title=${title}`,
      providesTags: (result) =>
        result?.data?.docs.length
          ? [
              ...(result.data?.docs || []).map((e: EventInterface) => ({
                type: 'Event' as const,
                id: e._id,
              })),
              { type: 'Event', id: 'EVENT' },
            ]
          : [{ type: 'Event', id: 'EVENT' }],
    }),

    updateEvent: builder.mutation<Response, Pick<EventInterface, '_id'> & Partial<EventInterface>>({
      query: ({ _id, ...patch }) => ({
        url: `/events/${_id}`,
        method: 'PATCH',
        body: patch,
        formData: true,
      }),
      invalidatesTags: (_, __, { _id }) => [{ id: _id, type: 'Event' }],
    }),

    getEventsByCategory: builder.query<Response, string>({
      query: (id) => `/events/${id}`,
      providesTags: (_, __, id) => [{ type: 'Event', id }],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetEventsByCategoryQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} = EventApiSlice;
