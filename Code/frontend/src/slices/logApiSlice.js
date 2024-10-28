import { apiSlice } from "./apiSlice";
import { LOG_URL } from "../constants";

export const printerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: () => ({
        url: `${LOG_URL}`,
      }),
    }),
    getLogsByUser: builder.query({
      query: () => ({
        url: `${LOG_URL}/mine`,
      }),
    }),
    createLog: builder.mutation({
      query: (log) => ({
        url: `${LOG_URL}`,
        method: 'POST',
        body: log,
      }),
    }),
    cancelLog: builder.mutation({
      query: (id) => ({
        url: `${LOG_URL}/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useGetLogsQuery, useGetLogsByUserQuery, useCreateLogMutation, useCancelLogMutation } = printerApiSlice;
