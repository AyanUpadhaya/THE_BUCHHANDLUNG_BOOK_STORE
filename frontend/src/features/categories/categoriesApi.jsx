import { apiSlice } from "../api/apiSlice";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      transformResponse: (category) => category.reverse(),
      providesTags: ["Categories"],
    }),

    createCategory: builder.mutation({
      query: (newCateogry) => ({
        url: "/categories",
        method: "POST",
        body: newCateogry,
      }),
      async onQueryStarted(newCateogry, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getCategories",
                undefined,
                (draft) => {
                  const modifiedCategory = {
                    _id: crypto.randomUUID(),
                    createdAt: new Date().toLocaleDateString(),
                    updatedAt: new Date().toLocaleDateString(),
                    ...newCateogry,
                  };
                  draft.unshift(modifiedCategory);
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateCategory: builder.mutation({
      query: ({ updateData, id }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
