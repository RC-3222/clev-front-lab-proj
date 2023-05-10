import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, SuccessMessages, ToastVariant } from '../../enums';
import { BookInfoType, BookingAddRequestWithBookId, BookType, ResponseUser } from '../../types';
import {
  authenticatedUserSuccess,
  getBookInfoSuccess,
  getBookingFailure,
  getBookingSuccess,
  getBooksSuccess,
  getEditBookingRequest,
  setToast,
} from '../slices';

export function* editBookingRequestWorker({ payload }: PayloadAction<BookingAddRequestWithBookId>) {
  try {
    yield call(axiosInstance.put, `${ApiPath.bookings}/${payload.bookingId}`, {
      data: payload.data,
    });

    if (payload.bookId) {
      const { data: bookDetailedData }: AxiosResponse<BookInfoType> = yield call(
        axiosInstance.get,
        `${ApiPath.books}/${payload.data.book}`
      );

      yield put(getBookInfoSuccess(bookDetailedData));
    } else {
      const { data: bookData }: AxiosResponse<BookType[]> = yield call(
        axiosInstance.get,
        ApiPath.books
      );

      yield put(getBooksSuccess(bookData));
    }

    const { data }: AxiosResponse<ResponseUser> = yield call(
      axiosInstance.get,
      `${ApiPath.users}/me`
    );

    yield put(authenticatedUserSuccess(data));

    yield put(getBookingSuccess());
    yield put(setToast({ message: SuccessMessages.EditBooking, type: ToastVariant.positive }));
  } catch {
    yield put(getBookingFailure());
    yield put(setToast({ message: FailureMessages.EditBooking, type: ToastVariant.negative }));
  }
}

export function* editBookingRequestWatcher() {
  yield takeLatest(getEditBookingRequest.type, editBookingRequestWorker);
}
