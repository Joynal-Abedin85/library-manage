import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "@/types/book";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), // Change if backend port is different
  endpoints: (builder) => ({
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
    }),
  }),
});

export const { useAddBookMutation, useGetBooksQuery } = apiSlice;
