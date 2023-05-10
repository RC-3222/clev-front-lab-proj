import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ApiPath, axiosInstance } from '../../api';
import { FailureMessages, SuccessMessages, ToastVariant } from '../../enums';
import {
  FileUploadResponseType,
  ResponseUser,
  UpdateUserActionType,
  UploadAvatarActionType,
} from '../../types';
import {
  authenticatedUserRequest,
  authenticatedUserSuccess,
  setToast,
  updateUserRequest,
  updateUserSuccess,
  uploadAvatarRequest,
  uploadAvatarSuccess,
  userRequest,
  userRequestError,
  userRequestSuccess,
} from '../slices';

function* userRequestWorker({ payload }: PayloadAction<string>) {
  try {
    const { data }: AxiosResponse<ResponseUser> = yield call(
      axiosInstance.get,
      `${ApiPath.users}/${payload}`
    );

    yield put(userRequestSuccess(data));
  } catch {
    yield put(userRequestError());
    yield put(
      setToast({
        type: ToastVariant.negative,
        message: FailureMessages.UserDataRequest,
      })
    );
  }
}

function* getAuthenticatedUserWorker() {
  try {
    const { data }: AxiosResponse<ResponseUser> = yield call(
      axiosInstance.get,
      `${ApiPath.users}/me`
    );

    yield put(authenticatedUserSuccess(data));
  } catch {
    yield put(userRequestError());
    yield put(
      setToast({
        type: ToastVariant.negative,
        message: FailureMessages.UserDataRequest,
      })
    );
  }
}

function* updateUserWorker({ payload }: PayloadAction<UpdateUserActionType>) {
  const { id, username, password, email, firstName, lastName, phone } = payload;

  try {
    const { data }: AxiosResponse<ResponseUser> = yield call(
      axiosInstance.put,
      `${ApiPath.users}/${id}`,
      { username, password, email, firstName, lastName, phone }
    );

    yield put(updateUserSuccess(data));
    yield put(
      setToast({
        type: ToastVariant.positive,
        message: SuccessMessages.UserDataUpdate,
      })
    );
  } catch {
    yield put(userRequestError());
    yield put(
      setToast({
        type: ToastVariant.negative,
        message: FailureMessages.UserDataUpdate,
      })
    );
  }
}

function* uploadAvatarWorker({ payload }: PayloadAction<UploadAvatarActionType>) {
  const { id, formData } = payload;

  try {
    const { data }: AxiosResponse<FileUploadResponseType[]> = yield call(
      axiosInstance.post,
      `${ApiPath.upload}`,
      formData,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
    );

    let user = {} as ResponseUser;

    const body = {
      avatar: data[0].id,
    };

    if (data) {
      const { data: userData }: AxiosResponse<ResponseUser> = yield call(
        axiosInstance.put,
        `${ApiPath.users}/${id}`,
        body
      );

      user = userData;
    }

    yield put(uploadAvatarSuccess(user));
    yield put(updateUserSuccess(user));
    yield put(
      setToast({
        type: ToastVariant.positive,
        message: SuccessMessages.UserAvatarUpdate,
      })
    );
  } catch {
    yield put(userRequestError());
    yield put(
      setToast({
        type: ToastVariant.negative,
        message: FailureMessages.UserAvatarUpdate,
      })
    );
  }
}

export function* userRequestMainWatcher() {
  yield takeLatest(userRequest, userRequestWorker);
  yield takeLatest(authenticatedUserRequest, getAuthenticatedUserWorker);
  yield takeLatest(updateUserRequest, updateUserWorker);
  yield takeLatest(uploadAvatarRequest, uploadAvatarWorker);
}
