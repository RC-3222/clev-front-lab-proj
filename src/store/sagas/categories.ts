import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, ToastVariant } from '../../enums';
import { CategoryType } from '../../types';
import {
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
  setToast,
} from '../slices';

function* categoriesRequestWorker() {
  try {
    const { data }: AxiosResponse<CategoryType[]> = yield call(
      axiosInstance.get,
      ApiPath.categories
    );

    yield put(getCategoriesSuccess(data));
  } catch {
    yield put(getCategoriesFailure(FailureMessages.GenericError));
    yield put(setToast({ message: FailureMessages.GenericError, type: ToastVariant.negative }));
  }
}

export function* categoriesRequestWatcher() {
  yield takeLatest(getCategoriesRequest.type, categoriesRequestWorker);
}
