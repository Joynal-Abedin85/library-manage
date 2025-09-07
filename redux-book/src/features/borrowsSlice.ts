import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Borrow {
  id: string;
  bookId: string;
  user: string;
  borrowDate: string;
  returnDate?: string;
}

interface BorrowsState {
  borrows: Borrow[];
}

const initialState: BorrowsState = {
  borrows: [],
};

const borrowsSlice = createSlice({
  name: 'borrows',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<Borrow>) => {
      state.borrows.push(action.payload);
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const borrow = state.borrows.find((b) => b.id === action.payload);
      if (borrow) {
        borrow.returnDate = new Date().toISOString();
      }
    },
    removeBorrow: (state, action: PayloadAction<string>) => {
      state.borrows = state.borrows.filter((b) => b.id !== action.payload);
    },
  },
});

export const { borrowBook, returnBook, removeBorrow } = borrowsSlice.actions;
export default borrowsSlice.reducer;
