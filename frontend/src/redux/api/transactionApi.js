import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/transaction" }),
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query(body) {
        return {
          url: "/create_transactions",
          method: "POST",
          body,
        };
      },
    }),
    getHistory: builder.query({
      query: () => "/history",
    }),
  }),
});

export const { useCreateTransactionMutation, useGetHistoryQuery } =
  transactionApi;
