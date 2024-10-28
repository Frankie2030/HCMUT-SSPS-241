import { apiSlice } from "./apiSlice";
import { CONFIG_URL } from "../constants";

export const configApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTypes: builder.query({
      query: () => `${CONFIG_URL}/type`,
    }),
    addType: builder.mutation({
      query: (fileType) => ({
        url: `${CONFIG_URL}/type`,
        method: "POST",
        body: { fileType },
      }),
    }),
    deleteType: builder.mutation({
      query: (fileType) => ({
        url: `${CONFIG_URL}/type`,
        method: "DELETE",
        body: { fileType },
      }),
    }),
    getDefaults: builder.query({
      query: () => `${CONFIG_URL}/defaults`,
    }),
    updateDefaults: builder.mutation({
      query: ({ defaultPages, distributionDates }) => ({
        url: `${CONFIG_URL}/defaults`,
        method: "PUT",
        body: { defaultPages, distributionDates },
      }),
    }),
  }),
});

export const {
  useGetTypesQuery,
  useAddTypeMutation,
  useDeleteTypeMutation,
  useGetDefaultsQuery,
  useUpdateDefaultsMutation,
} = configApiSlice;
