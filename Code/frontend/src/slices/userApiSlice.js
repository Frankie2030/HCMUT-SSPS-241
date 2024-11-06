// src/slices/userApiSlice.js
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${BASE_URL}/auth/users/all`, // Full URL for getting all users
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, role }) => ({
        url: `${BASE_URL}/auth/users/${id}`, // URL to update the user's role
        method: "PUT",
        body: { role }, // Pass the role in the request body
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/auth/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
