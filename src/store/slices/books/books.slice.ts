import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookType } from '../../../types';

type BooksState = {
  books: BookType[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: null,
  isLoading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooksRequest: state => {
      state.books = null;
      state.error = null;
      state.isLoading = true;
    },
    getBooksSuccess: (state, action: PayloadAction<BookType[]>) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    getBooksFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getBooksSuccess, getBooksRequest, getBooksFailure } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
