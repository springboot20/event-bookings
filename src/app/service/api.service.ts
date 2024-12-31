import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorage } from '../../util';
import { TokensInterface } from '../../types/context';

export const ApiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5020/api/v1',
    prepareHeaders: (headers) => {
      const tokens = LocalStorage.get('tokens') as TokensInterface;
      if (tokens) {
        headers.set('Authorization', `Bearer ${tokens?.accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Auth', 'Event', 'Category', 'Seat'],
  endpoints: () => ({}),
});
