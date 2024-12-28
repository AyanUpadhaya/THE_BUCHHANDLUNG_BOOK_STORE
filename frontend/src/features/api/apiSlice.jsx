import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/getToken";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const respose = result?.error?.data?.error;
    // if (respose === "No token provided!" || respose === "Invalid token.") {
    //   api.dispatch(logOutUser());
    // }
    return result;
  },
  tagTypes: ["Books", "StoreBooks", "Categories"],
  endpoints: (builder) => ({}),
});
