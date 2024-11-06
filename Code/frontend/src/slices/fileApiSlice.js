import { apiSlice } from "./apiSlice";
import { FILE_URL } from "../constants";

export const printerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: () => ({
        url: `${FILE_URL}`,
      }),
    }),
    getFilesByUser: builder.query({
      query: () => ({
        url: `${FILE_URL}/mine`,
      }),
    }),
    getFile: builder.query({
      query: (id) => ({
        url: `${FILE_URL}/${id}`,
      }),
    }),
    createFile: builder.mutation({
      query: (file) => ({
        url: `${FILE_URL}`,
        method: "POST",
        body: file,
      }),
    }),
    storeFile: builder.mutation({
      query: (file) => ({
        url: `${FILE_URL}/store`,
        method: "POST",
        body: file,
      }),
    }),
    getStoredFiles: builder.query({
      query: (id) => ({
        url: `${FILE_URL}/store/${id}`,
      }),
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileQuery,
  useGetFilesByUserQuery,
  useCreateFileMutation,
  useStoreFileMutation,
  useGetStoredFilesQuery,
} = printerApiSlice;
