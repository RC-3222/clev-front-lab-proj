import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookInfoType } from '../../../types';

type BookInfoState = {
  book: BookInfoType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookInfoState = {
  book: null,
  isLoading: false,
  error: null,
};

export const bookInfoSlice = createSlice({
  name: 'bookInfo',
  initialState,
  reducers: {
    getBookInfoSuccess: (state, action: PayloadAction<BookInfoType>) => {
      state.isLoading = false;
      state.book = action.payload;
    },
    getBookInfoRequest: (state, _: PayloadAction<string>) => {
      state.book = null;
      state.error = null;
      state.isLoading = true;
    },
    getBookInfoFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetBookInfo(state) {
      state.book = null;
      state.error = null;
      state.isLoading = false;
    }
  },
});

export const { getBookInfoSuccess, getBookInfoRequest, getBookInfoFailure, resetBookInfo } = bookInfoSlice.actions;

export const bookInfoReducer = bookInfoSlice.reducer;
