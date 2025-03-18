import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCurrentUser, setCurrentUser } from "../redux/userSlice";

let baseUrl = import.meta.env.VITE_API_URL;

export const userApis = createApi({
  reducerPath: "userApis",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        body: userData,
      }),
    }),

    verifyUser: builder.mutation({
      query: (payload) => ({
        url: "/user/verify",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),

    getCurrentUser: builder.mutation({
      query: () => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCurrentUser(data?.user));
        } catch (error) {
          if (error?.error?.status === 403) {
            console.log("Access token expired. Attempting refresh...");

            // Attempt to refresh access token
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
              const baseUrl = import.meta.env.VITE_API_URL;

              try {
                const refreshResponse = await fetch(`${baseUrl}/auth/token`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                  },
                  credentials: "include",
                });
                if (refreshResponse.ok) {
                  const refreshedData = await refreshResponse.json();
                  dispatch(setCurrentUser(refreshedData?.user));
                } else {
                  dispatch(clearCurrentUser());
                }
              } catch (error) {
                dispatch(clearCurrentUser());
              }
            } else {
              dispatch(clearCurrentUser());
            }
          }
        }
      },
    }),

    uploadUserProfile: builder.mutation({
      query: (formData) => ({
        url: "/user/upload-image",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data?.data));
        } catch (error) {}
      },
    }),

    updateUserDetails: builder.mutation({
      query: (userData) => ({
        url: "/user/change-userdetails",
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data?.data));
        } catch (error) {}
      },
    }),

    getUserByUsername: builder.mutation({
      query: (username) => ({
        url: `/user/${username}`,
        method: "GET",
        body: username,
        credentials: "include",
      }),
    }),

    getUserById: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
        body: userId,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useGetCurrentUserMutation,
  useUploadUserProfileMutation,
  useUpdateUserDetailsMutation,
  useGetUserByUsernameMutation,
  useGetUserByIdMutation,
} = userApis;
