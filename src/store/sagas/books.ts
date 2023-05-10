import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, ToastVariant } from '../../enums';
import { BookType } from '../../types';
import { getBooksFailure, getBooksRequest, getBooksSuccess, setToast } from '../slices';

function* booksRequestWorker() {
  try {
    const [books]: [AxiosResponse<BookType[]>] = yield all([
      call(axiosInstance.get, ApiPath.books),
    ]);

    yield put(getBooksSuccess(books.data));
  } catch {
    yield put(getBooksFailure(FailureMessages.GenericError));
    yield put(setToast({ message: FailureMessages.GenericError, type: ToastVariant.negative }));
  }
}

export function* booksRequestWatcher() {
  yield takeLatest(getBooksRequest.type, booksRequestWorker);
}
