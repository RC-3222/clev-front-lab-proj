import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { ApiPath, axiosInstance } from '../../api';
import {
  AuthError,
  AuthResponse,
  Credentials,
  ForgotCredentials,
  RegistrationData,
  ResetPasswordCredentials,
} from '../../types';
import {
  authFailure,
  authRequest,
  authSuccess,
  createPasswordFailure,
  createPasswordRequest,
  createPasswordSuccess,
  forgotPasswordFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  registrationFailure,
  registrationRequest,
  registrationSuccess,
  setIsAlredyUsedError,
} from '../slices';

function* authRequestWorker({ payload }: PayloadAction<Credentials>) {
  try {
    const response: AxiosResponse<AuthResponse> = yield call(
      axiosInstance.post,
      `${ApiPath.auth}`,
      {
        ...payload,
      }
    );

    const { jwt, user } = response.data;

    localStorage.setItem('user', JSON.stringify(user));
    Cookies.set('token', jwt);
    yield put(authSuccess(user));
  } catch (error) {
    const { response } = error as AxiosError;

    if (response?.status === 400) {
      yield put(authFailure('Неверный логин или пароль!'));
    } else {
      yield put(authFailure(true));
    }
  }
}

function* registrationRequestWorker({ payload }: PayloadAction<RegistrationData>) {
  try {
    yield call(axiosInstance.post, `${ApiPath.register}`, {
      ...payload,
    });
    yield put(registrationSuccess());
  } catch (error) {
    const { response } = error as AxiosError<AuthError>;

    if (response?.status === 400) {
      yield put(setIsAlredyUsedError());
    } else {
      yield put(registrationFailure(response?.data.error.message || ' '));
    }
  }
}

function* forgotPasswordRequestWorker({ payload }: PayloadAction<ForgotCredentials>) {
  try {
    yield call(axiosInstance.post, `${ApiPath.forgotPassword}`, {
      ...payload,
    });

    yield put(forgotPasswordSuccess());
  } catch (error) {
    const { response } = error as AxiosError<AuthError>;

    yield put(forgotPasswordFailure(response?.data.error.message || ''));
  }
}

function* resetPasswordRequestWorker({ payload }: PayloadAction<ResetPasswordCredentials>) {
  try {
    yield call(axiosInstance.post, `${ApiPath.resetPassword}`, {
      ...payload,
    });

    yield put(createPasswordSuccess());
  } catch (error) {
    const { response } = error as AxiosError<AuthError>;

    yield put(createPasswordFailure(response?.data.error.message || ''));
  }
}

export function* watchAuthRequest() {
  yield takeLatest(authRequest, authRequestWorker);
}

export function* watchRegistrationRequest() {
  yield takeLatest(registrationRequest, registrationRequestWorker);
}

export function* watchForgotPasswordRequest() {
  yield takeLatest(forgotPasswordRequest, forgotPasswordRequestWorker);
}

export function* watchResetPasswordRequest() {
  yield takeLatest(createPasswordRequest, resetPasswordRequestWorker);
}
