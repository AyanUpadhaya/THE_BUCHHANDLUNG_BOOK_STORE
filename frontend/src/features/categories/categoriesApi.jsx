import { apiSlice } from "../api/apiSlice";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      transformResponse: (category) => category.reverse(),
      providesTags: ["Categories"],
    }),
  }),
});

export const {useGetCategoriesQuery} = categoriesApi;