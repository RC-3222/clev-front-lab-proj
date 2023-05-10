import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, SuccessMessages, ToastVariant } from '../../enums';
import {
  BookInfoType,
  ResponseReviewType,
  ResponseUserComment,
  ReviewFieldType,
  ReviewUpdateType,
} from '../../types';
import {
  addReviewUpdateUser,
  bookInfoSelector,
  getBookInfoSuccess,
  getReviewFailure,
  getReviewRequest,
  getReviewSuccess,
  reviewUpdateFailure,
  reviewUpdateRequest,
  reviewUpdateSuccess,
  setToast,
  updateReviewUpdateUser,
} from '../slices';

export function* reviewRequestWorker({ payload }: PayloadAction<ReviewFieldType>) {
  try {
    const { data: ReviewData }: AxiosResponse<ResponseReviewType> = yield call(
      axiosInstance.post,
      ApiPath.comments,
      { data: payload }
    );

    const { book } = yield select(bookInfoSelector);

    if (book) {
      const { data: dataBook }: AxiosResponse<BookInfoType> = yield call(
        axiosInstance.get,
        `${ApiPath.books}/${payload.book}`
      );

      yield put(getBookInfoSuccess(dataBook));
    }

    yield put(getReviewSuccess(ReviewData));

    const userCommentData: ResponseUserComment = {
      id: ReviewData.id,
      bookId: +payload.book,
      rating: payload.rating,
      text: payload.text,
    };

    yield put(addReviewUpdateUser(userCommentData));

    yield put(setToast({ message: SuccessMessages.Review, type: ToastVariant.positive }));
  } catch {
    yield put(getReviewFailure(FailureMessages.Review));
    yield put(setToast({ message: FailureMessages.Review, type: ToastVariant.negative }));
  }
}

export function* reviewUpdateRequestWorker({ payload }: PayloadAction<ReviewUpdateType>) {
  try {
    const { rating, commentId, user, book, text } = payload;

    const { data }: AxiosResponse<ResponseReviewType> = yield call(
      axiosInstance.put,
      `${ApiPath.comments}/${commentId}`,
      { data: { rating, user, book, text } }
    );

    
    const { book:bookInfo } = yield select(bookInfoSelector);

    if (bookInfo) {
      const { data: dataBook }: AxiosResponse<BookInfoType> = yield call(
        axiosInstance.get,
        `${ApiPath.books}/${payload.book}`
      );

      yield put(getBookInfoSuccess(dataBook));
    }

    yield put(reviewUpdateSuccess(data));

    const userCommentData: ResponseUserComment = {
      id: commentId,
      bookId: +payload.book,
      rating,
      text,
    };

    yield put(updateReviewUpdateUser(userCommentData));

    yield put(
      setToast({
        message: SuccessMessages.ReviewUpdate,
        type: ToastVariant.positive,
      })
    );
  } catch {
    yield put(reviewUpdateFailure(FailureMessages.Review));
    yield put(
      setToast({
        message: FailureMessages.ReviewUpdate,
        type: ToastVariant.negative,
      })
    );
  }
}

export function* reviewRequestWatcher() {
  yield takeLatest(getReviewRequest.type, reviewRequestWorker);
}

export function* reviewUpdateWatcher() {
  yield takeLatest(reviewUpdateRequest.type, reviewUpdateRequestWorker);
}
