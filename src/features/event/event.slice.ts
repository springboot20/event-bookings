import { ApiService } from '../../app/service/api.service';
import { EventInterface } from '../../types/events';

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface EventQuery {
  [key: string]: undefined;
}

export interface EventMutation {
  [key: string]: any;
}

export const EventApiSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<Response, EventMutation>({
      query: (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          const eventDate = new Date(data['eventDate']);

          if (key === 'image' && data[key]) {
            formData.append(key, data[key]);
          } else if (key === 'from' && data[key]) {
            const [fromHours, fromMinutes] = data[key].split(':').map(Number);
            const fromDate = new Date(eventDate);
            fromDate.setHours(fromHours, fromMinutes);
            formData.append(key, fromDate.toISOString());
          } else if (key === 'to' && data[key]) {
            const [toHours, toMinutes] = data[key].split(':').map(Number);
            const toDate = new Date(eventDate);
            toDate.setHours(toHours, toMinutes);
            formData.append(key, toDate.toISOString());
          } else if (Array.isArray(data[key]) || typeof data[key] === 'object') {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        });

        console.log(data);

        return {
          url: '/events',
          method: 'POST',
          body: formData,
        };
      },
    }),

    getEventById: builder.query<Response, string>({
      query: (id) => `/events/${id}`,
      providesTags: (_, __, id) => [{ type: 'Event', id }],
    }),

    deleteEvent: builder.mutation<Response, string>({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, eventId) => [{ type: 'Event', eventId }],
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

    updateEvent: builder.mutation<Response, Pick<EventMutation, '_id'> & Partial<EventMutation>>({
      query: ({ _id, ...patch }) => {
        const formData = new FormData();

        Object.keys(patch).forEach((key) => {
          const eventDate = new Date(patch['eventDate']);

          if (key === 'from' && patch[key]) {
            const [fromHours, fromMinutes] = patch[key].split(':').map(Number);
            const fromDate = new Date(eventDate);
            fromDate.setHours(fromHours, fromMinutes);
            formData.append(key, fromDate.toISOString());
          } else if (key === 'to' && patch[key]) {
            const [toHours, toMinutes] = patch[key].split(':').map(Number);
            const toDate = new Date(eventDate);
            toDate.setHours(toHours, toMinutes);
            formData.append(key, toDate.toISOString());
          } else if (Array.isArray(patch[key]) || typeof patch[key] === 'object') {
            formData.append(key, JSON.stringify(patch[key]));
          } else {
            formData.append(key, patch[key]);
          }
        });

        return { url: `/events/${_id}`, method: 'PATCH', body: patch, formData: true };
      },
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
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} = EventApiSlice;
