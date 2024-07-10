import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/admin" }),
  tagTypes: ["AllUsers"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/get_users",
      providesTags: ["AllUsers"],
    }),
    activateOrDeactivateUser: builder.mutation({
      query(id) {
        return {
          url: `/activate_or_deactivate/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["AllUsers"],
    }),
    getUserDetails: builder.query({
      query: (id) => `/get_user_details/${id}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useActivateOrDeactivateUserMutation,
  useGetUserDetailsQuery,
} = adminApi;
