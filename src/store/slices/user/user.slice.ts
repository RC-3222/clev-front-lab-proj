import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ResponseUser,
  ResponseUserComment,
  UpdateUserActionType,
  UploadAvatarActionType,
  UserBooking,
  UserStateType,
} from '../../../types';

const initialState: UserStateType = {
  isLoading: false,
  isSuccess: false,
  isUpdateSuccess: false,
  isUpdateLoading: false,
  isUpdateError: false,
  isError: false,
  data: {} as ResponseUser,
};

const initialBooking = {
  book: null,
  dateOrder: null,
  id: null,
  order: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticatedUserRequest: state => {
      state.isLoading = true;
    },
    authenticatedUserSuccess: (state, action: PayloadAction<ResponseUser>) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    userRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    userRequestSuccess: (state, action: PayloadAction<ResponseUser>) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    userRequestError: state => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    },
    updateUserRequest: (state, action: PayloadAction<UpdateUserActionType>) => {
      state.isUpdateLoading = true;
    },
    updateUserSuccess: (state, action: PayloadAction<ResponseUser>) => {
      state.isUpdateLoading = false;
      state.isUpdateError = false;
      state.isUpdateSuccess = true;
      state.data = action.payload;
    },
    uploadAvatarRequest: (state, action: PayloadAction<UploadAvatarActionType>) => {
      state.isLoading = true;
    },
    uploadAvatarSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    },
    deleteBookingUpdateUser: state => {
      state.data.booking = initialBooking as UserBooking;
    },
    addBookingUpdateUser: (state, action: PayloadAction<UserBooking>) => {
      state.data.booking = action.payload;
    },
    updateReviewUpdateUser: (state, action: PayloadAction<ResponseUserComment>) => {
      const index = state.data.comments.findIndex(comment => action.payload.id === comment.id);

      state.data.comments[index] = action.payload;
    },
    addReviewUpdateUser: (state, action: PayloadAction<ResponseUserComment>) => {
      state.data.comments.push(action.payload);
    },
  },
});

export const {
  userRequest,
  userRequestSuccess,
  userRequestError,
  authenticatedUserRequest,
  authenticatedUserSuccess,
  updateUserRequest,
  updateUserSuccess,
  uploadAvatarRequest,
  uploadAvatarSuccess,
  deleteBookingUpdateUser,
  addBookingUpdateUser,
  addReviewUpdateUser,
  updateReviewUpdateUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
