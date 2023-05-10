import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookingAddRequestWithBookId, BookingCancelRequest } from '../../../types';

type BookingState = {
  isLoadingBooking: boolean;
  selectBookId: string | null;
};

const initialState: BookingState = {
  isLoadingBooking: false,
  selectBookId: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    getBookingSuccess: state => {
      state.isLoadingBooking = false;
    },
    getBookingRequest: (state, _: PayloadAction<BookingAddRequestWithBookId>) => {
      state.selectBookId = null;
      state.isLoadingBooking = true;
    },
    getEditBookingRequest: (state, _: PayloadAction<BookingAddRequestWithBookId>) => {
      state.selectBookId = null;
      state.isLoadingBooking = true;
    },
    getCancelBookingRequest: (state, _: PayloadAction<BookingCancelRequest>) => {
      state.selectBookId = null;
      state.isLoadingBooking = true;
    },
    getBookingFailure: state => {
      state.isLoadingBooking = false;
    },
    setBookId: (state, action: PayloadAction<string | null>) => {
      state.selectBookId = action.payload;
    },
  },
});

export const {
  getBookingFailure,
  getBookingRequest,
  getBookingSuccess,
  setBookId,
  getEditBookingRequest,
  getCancelBookingRequest,
} = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
