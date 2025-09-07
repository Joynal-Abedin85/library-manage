import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';
import borrowsReducer from '../features/borrowsSlice';
import { apiSlice } from '@/features/apiSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    books: booksReducer,
    borrows: borrowsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

