import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const accountDetailsApi = createApi({
  reducerPath: "accountDetailsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/account" }),
  tagTypes: ["GetAccountDetails"],
  endpoints: (builder) => ({
    getAccountDetails: builder.query({
      query: () => "/get_account_details",
      providesTags: ["GetAccountDetails"],
    }),
    addAccountDetails: builder.mutation({
      query(body) {
        return {
          url: "/add_account_details",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GetAccountDetails"],
    }),
    deleteAccountDetails: builder.mutation({
      query(id) {
        return {
          url: `/delete_account_details/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["GetAccountDetails"],
    }),
  }),
});

export const {
  useGetAccountDetailsQuery,
  useAddAccountDetailsMutation,
  useDeleteAccountDetailsMutation,
} = accountDetailsApi;
