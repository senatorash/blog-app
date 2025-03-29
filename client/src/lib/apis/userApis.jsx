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
          console.log(error);
          if (error?.error?.status === 403 || error?.error?.status === 401) {
            // Attempt to refresh access token

            const refreshToken = localStorage.getItem("refreshToken");
            console.log(refreshToken);

            if (refreshToken) {
              const baseUrl = import.meta.env.VITE_API_URL;
              console.log(baseUrl);
              try {
                const refreshResponse = await fetch(
                  `${baseUrl}/auth/access-token`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${refreshToken}`,
                    },
                    credentials: "include",
                  }
                );
                if (refreshResponse.ok) {
                  const refreshedData = await refreshResponse.json();
                  dispatch(setCurrentUser(refreshedData?.user));
                } else {
                  localStorage.removeItem("user");
                  dispatch(clearCurrentUser());
                }
              } catch (error) {
                localStorage.removeItem("user");
                dispatch(clearCurrentUser());
              }
            } else {
              localStorage.removeItem("user");
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
