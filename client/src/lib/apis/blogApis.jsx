import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setBlog } from "../redux/blogSlice";

const baseUrl = import.meta.env.VITE_API_URL;

export const blogApis = createApi({
  reducerPath: "blogApis",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blog/create",
        method: "POST",
        body: blogData,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBlog(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useCreateBlogMutation } = blogApis;
