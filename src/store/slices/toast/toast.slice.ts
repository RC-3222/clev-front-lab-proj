import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ToastVariant } from '../../../enums';

export type ToastState = {
  isToastVisible: boolean;
  message: string | null;
  type: ToastVariant | null;
};

export type ToastPayload = Omit<ToastState, 'isToastVisible'>;
const initialState: ToastState = {
  isToastVisible: false,
  message: null,
  type: null,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastPayload>) => {
      state.isToastVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearToast: state => {
      state.isToastVisible = false;
      state.message = null;
      state.type = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
