import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResponseReviewType, ReviewFieldType, ReviewUpdateType } from '../../../types';

type ReviewState = {
  review: ResponseReviewType | null;
  isLoading: boolean;
  error: null | string;
}

const initialState: ReviewState = {
  review: null,
  isLoading: false,
  error: null,
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getReviewSuccess: (state, action: PayloadAction<ResponseReviewType>) => {
      state.error = null;
      state.isLoading = false;
      state.review = action.payload;
    },
    getReviewRequest: (state, _: PayloadAction<ReviewFieldType>) => {
      state.review = null;
      state.error = null;
      state.isLoading = true;
    },
    getReviewFailure: (state, action: PayloadAction<string | null>) => {
      state.review = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    reviewUpdateRequest: (state, action: PayloadAction<ReviewUpdateType>) => {
      state.review = null;
      state.error = null;
      state.isLoading = true;
    },
    reviewUpdateSuccess: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.review = payload.data;
    },

    reviewUpdateFailure: (state, action: PayloadAction<string | null>) => {
      state.review = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    clearReview: state => {
      state.review = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  getReviewFailure,
  getReviewRequest,
  getReviewSuccess,
  reviewUpdateRequest,
  reviewUpdateSuccess,
  reviewUpdateFailure,
  clearReview,
} = reviewSlice.actions;

export const reviewReducer = reviewSlice.reducer;
