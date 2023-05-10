import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, SuccessMessages, ToastVariant } from '../../enums';
import { BookInfoType, BookingAddRequestWithBookId, BookType, UserBooking } from '../../types';
import {
  addBookingUpdateUser,
  bookInfoSelector,
  booksSelector,
  getBookInfoSuccess,
  getBookingFailure,
  getBookingRequest,
  getBookingSuccess,
  getBooksSuccess,
  setToast,
} from '../slices';

export function* bookingRequestWorker({ payload }: PayloadAction<BookingAddRequestWithBookId>) {
  try {
    const { data }: AxiosResponse = yield call(axiosInstance.post, ApiPath.bookings, {
      data: payload.data,
    });

    let { book } = yield select(bookInfoSelector)

    const { id } = data;
    const { order, dateOrder } = data.attributes;

    let userBookingUpdate:UserBooking;

    if (book) {
      userBookingUpdate = {
        id,
        order,
        dateOrder,
        book: {
          id: book.id,
          title: book.title,
          issueYear: book.issueYear,
          image: book.images[0],
          authors: book.authors,
        },
      };

      const { data: bookDetailedData }: AxiosResponse<BookInfoType> = yield call(
        axiosInstance.get,
        `${ApiPath.books}/${payload.bookId}`
      );

      yield put(getBookInfoSuccess(bookDetailedData));
    } else {
      const { books } = yield select(booksSelector);

      book = books.find(({ id: itemId }: BookType) => itemId === +payload.data.book);

      userBookingUpdate = {
        id,
        order,
        dateOrder,
        book: {
          id: book.id,
          title: book.title,
          issueYear: book.issueYear,
          image: book.image,
          authors: book.authors,
        },
      };

      const { data: bookData }: AxiosResponse<BookType[]> = yield call(
        axiosInstance.get,
        ApiPath.books
      );

      yield put(getBooksSuccess(bookData));
    }

    yield put(getBookingSuccess());
    yield put(setToast({ message: SuccessMessages.Booking, type: ToastVariant.positive }));
    yield put(addBookingUpdateUser(userBookingUpdate));
  } catch {
    yield put(getBookingFailure());
    yield put(setToast({ message: FailureMessages.Booking, type: ToastVariant.negative }));
  }
}

export function* bookingRequestWatcher() {
  yield takeLatest(getBookingRequest.type, bookingRequestWorker);
}
