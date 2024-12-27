import { apiSlice } from "../api/apiSlice";

const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      transformResponse: (book) => book.reverse(),
      providesTags: ["Books"],
    }),

    getSingleBook: builder.query({
      query: (book_id) => `/books/${book_id}`,
    }),
    getStoreBooks: builder.query({
      query: (store_id) => `/books/store/${store_id}`,
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetStoreBooksQuery,
  useCreateBookMutation,
  useGetSingleBookQuery,
} = booksApi;
