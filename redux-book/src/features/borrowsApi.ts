import { apiSlice } from "./apiSlice";

export interface Borrow {
  _id?: string;
  book: string;
  quantity: number;
  dueDate: string;
  returnDate: string;
}

export const borrowsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      Borrow,
      { bookId: string; quantity: number; dueDate: string; returnDate: string }
    >({
      query: ({ bookId, quantity, dueDate, returnDate }) => ({
        url: "/borrows",
        method: "POST",
        body: { book: bookId, quantity, dueDate, returnDate },
      }),
      invalidatesTags: ["Borrows", "Books"],
    }),
    getBorrowSummary: builder.query<{ _id: string; totalQuantity: number }[], void>({
      query: () => "/borrows/summary",
      providesTags: ["Borrows"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowsApi;
