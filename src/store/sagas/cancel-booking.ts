import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, SuccessMessages, ToastVariant } from '../../enums';
import { BookInfoType, BookingCancelRequest, BookType } from '../../types';
import {
  deleteBookingUpdateUser,
  getBookInfoSuccess,
  getBookingFailure,
  getBookingSuccess,
  getBooksSuccess,
  getCancelBookingRequest,
  setToast,
} from '../slices';

export function* cancelBookingRequestWorker({ payload }: PayloadAction<BookingCancelRequest>) {
  try {
    yield call(axiosInstance.delete, `${ApiPath.bookings}/${payload.bookingId}`);

    if (payload.bookId) {
      const { data: bookDetailedData }: AxiosResponse<BookInfoType> = yield call(
        axiosInstance.get,
        `${ApiPath.books}/${payload.bookId}`
      );

      yield put(getBookInfoSuccess(bookDetailedData));
    } else {
      const { data: bookData }: AxiosResponse<BookType[]> = yield call(
        axiosInstance.get,
        ApiPath.books
      );

      yield put(getBooksSuccess(bookData));
    }

    yield put(getBookingSuccess());
    yield put(setToast({ message: SuccessMessages.CancelBooking, type: ToastVariant.positive }));
    yield put(deleteBookingUpdateUser());
  } catch {
    yield put(getBookingFailure());
    yield put(setToast({ message: FailureMessages.CancelBooking, type: ToastVariant.negative }));
  }
}

export function* cancelBookingRequestWatcher() {
  yield takeLatest(getCancelBookingRequest.type, cancelBookingRequestWorker);
}
