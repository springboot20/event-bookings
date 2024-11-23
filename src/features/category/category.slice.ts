import { ApiService } from '../../app/service/api.service';
import { CategoryInterface } from '../../types/events';

interface Response {
  data: CategoryInterface | CategoryInterface[] | any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface EventCategoryMutation {
  name: string;
}

export const CategoryApiSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation<Response, EventCategoryMutation>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
    }),

    getCategoryById: builder.query<Response, string>({
      query: (id) => ({ url: `/categories/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Category', id }],
    }),

    getAllCategories: builder.query<Response, void>({
      query: () => ({ url: '/categories' }),
      providesTags: (result) =>
        result?.data?.categories?.length > 0
          ? [
              ...(result?.data?.categories || []).map((category: CategoryInterface) => ({
                type: 'Category' as const,
                id: category._id,
              })),
              [{ type: 'Category', id: 'CATEGORY' }],
            ]
          : [{ type: 'Category', id: 'CATEGORY' }],
    }),

    updateCategory: builder.mutation<Response, EventCategoryMutation & { id: string }>({
      query: ({ name, id }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: name,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Category', id }],
    }),

    deleteCategory: builder.mutation<Response, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Category', id }],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoryByIdQuery,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CategoryApiSlice;
