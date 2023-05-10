import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, ToastVariant } from '../../enums';
import { BookInfoType } from '../../types';
import { getBookInfoFailure, getBookInfoRequest, getBookInfoSuccess, setToast } from '../slices';

function* bookInfoRequestWorker({ payload }: PayloadAction<number>) {
  try {
    const { data }: AxiosResponse<BookInfoType> = yield call(
      axiosInstance.get,
      `${ApiPath.books}/${payload}`
    );

    yield put(getBookInfoSuccess(data));
  } catch {
    yield put(getBookInfoFailure(FailureMessages.GenericError));
    yield put(setToast({ message: FailureMessages.GenericError, type: ToastVariant.negative }));
  }
}

export function* bookInfoRequestWatcher() {
  yield takeLatest(getBookInfoRequest.type, bookInfoRequestWorker);
}
