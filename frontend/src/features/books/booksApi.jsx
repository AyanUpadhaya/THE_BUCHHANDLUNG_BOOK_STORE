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
      providesTags: ["StoreBooks"],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
    }),

    updateBook: builder.mutation({
      query: ({ formData, book_id, store_id }) => ({
        url: `/books/${book_id}`,
        method: "PUT",
        body: formData,
      }),
      //pessimistic update
      async onQueryStarted(
        { formData, book_id, store_id },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getStoreBooks",
                store_id,
                (draft) => {
                  const itemIndx = draft.findIndex(
                    (item) => item._id == book_id
                  );
                  draft[itemIndx] = { ...draft[itemIndx], ...data?.data };
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteBook: builder.mutation({
      query: ({ book_id, store_id }) => ({
        url: `/books/${book_id}`,
        method: "DELETE",
      }),
      //pessimistic update
      async onQueryStarted(
        { book_id, store_id },
        { dispatch, queryFulfilled }
      ) {
        try {
          const data = await queryFulfilled;
          if (data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getStoreBooks",
                store_id,
                (draft) => {
                  const itemIndx = draft.findIndex(
                    (item) => item._id == book_id
                  );
                  draft.splice(itemIndx, 1);
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetStoreBooksQuery,
  useCreateBookMutation,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
