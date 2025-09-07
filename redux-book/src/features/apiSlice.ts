import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "@/types/book";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
   
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    // ADD book
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = apiSlice;
