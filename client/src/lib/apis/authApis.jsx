const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");
const { userApis } = require("./userApis");
import { clearCurrentUser } from "../redux/userSlice";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApis.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCurrentUser());
          localStorage.removeItem("refreshToken");
        } catch (error) {}
      },
    }),

    loginUserWithGoogle: builder.mutation({
      query: (userData) => ({
        url: "/auth/google/login",
        method: "POST",
        body: userData,
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApis.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
      },
    }),

    resetUserPassword: builder.mutation({
      query: (payLoad) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payLoad,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginUserWithGoogleMutation,
  useLogoutUserMutation,
  useResetUserPasswordMutation,
} = authApis;
