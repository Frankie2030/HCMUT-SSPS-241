// src/slices/buyingLogApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const buyingLogApi = createApi({
  reducerPath: "buyingLogApi", // Unique reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/buyingLogs`,
    credentials: "include",
  }), // Adjust the path to match the backend API
  tagTypes: ["BuyingLog"], // Tag type for cache invalidation
  endpoints: (builder) => ({
    createBuyingLog: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BuyingLog"],
    }),
    getBuyingLogsByUser: builder.query({
      query: () => "/mine",
      providesTags: ["BuyingLog"],
    }),
  }),
});

export const { useCreateBuyingLogMutation, useGetBuyingLogsByUserQuery } =
  buyingLogApi;
