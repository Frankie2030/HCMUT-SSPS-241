import { apiSlice } from "./apiSlice";
import { PRINTER_URL } from "../constants";

export const printerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrinter: builder.query({
      query: () => ({
        url: `${PRINTER_URL}`,
      }),
    }),
    addPrinter: builder.mutation({
      query: (body) => ({
        url: `${PRINTER_URL}/`,
        method: "POST",
        body: body,
      }),
    }),
    setStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${PRINTER_URL}/status`,
        method: "POST",
        body: { id, status },
      }),
    }),
    deletePrinter: builder.mutation({
      query: (id) => ({
        url: `${PRINTER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updatePrinterDetails: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${PRINTER_URL}/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetPrinterQuery,
  useAddPrinterMutation,
  useSetStatusMutation,
  useDeletePrinterMutation,
  useUpdatePrinterDetailsMutation, // Updated name
} = printerApiSlice;
