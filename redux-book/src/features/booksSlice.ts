import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', available: false },
  ],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((b) => b.id !== action.payload);
    },
    toggleAvailability: (state, action: PayloadAction<string>) => {
      const book = state.books.find((b) => b.id === action.payload);
      if (book) {
        book.available = !book.available;
      }
    },
  },
});

export const { addBook, updateBook, removeBook, toggleAvailability } = booksSlice.actions;
export default booksSlice.reducer;
