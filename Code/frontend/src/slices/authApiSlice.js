import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: () => ({
        url: `${AUTH_URL}/profile`,
      }),
    }),
    updatePage: builder.mutation({
      query: ({quantity, id}) => ({
        url: `${AUTH_URL}/page`,
        method: 'POST',
        body: {
          quantity: quantity,
          id: id,
        }
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
      }),
    }),
  }),
});

export const { useGetInfoQuery, useUpdatePageMutation, useLogoutMutation } = userApiSlice;
