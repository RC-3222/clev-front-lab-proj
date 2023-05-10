import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Credentials,
  ForgotCredentials,
  RegistrationData,
  ResetPasswordCredentials,
  User,
} from '../../../types';

type BaseState = {
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  auth: BaseState & {
    isError: boolean;
    userData: User | null;
  };
  register: BaseState & {
    isAlreadyUsedError: boolean;
  };
  forgot: BaseState;
  createPassword: BaseState;
};

const initialState: AuthState = {
  isAuthenticated: false,
  auth: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    userData: null,
  },
  register: {
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    isAlreadyUsedError: false,
  },
  forgot: {
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  createPassword: {
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    authRequest: (state, action: PayloadAction<Credentials>) => {
      state.auth.isLoading = true;
      state.auth.isError = false;
      state.auth.errorMessage = '';
      state.auth.isSuccess = false;
      state.isAuthenticated = false;
      state.auth.userData = null;
    },
    authSuccess: (state, action: PayloadAction<User>) => {
      state.auth.isLoading = false;
      state.auth.isSuccess = true;
      state.auth.isError = false;
      state.auth.errorMessage = '';
      state.auth.userData = action.payload;
      state.isAuthenticated = true;
    },
    authFailure: (state, { payload }: PayloadAction<string | boolean>) => {
      state.auth.isLoading = false;
      state.auth.isSuccess = false;
      state.isAuthenticated = false;
      state.auth.userData = null;
      if (typeof payload === 'string') {
        state.auth.errorMessage = payload;
      } else {
        state.auth.isError = true;
        state.auth.errorMessage = '';
      }
    },
    resetAuthError: state => {
      state.auth.isError = false;
      state.auth.errorMessage = '';
      state.register.errorMessage = '';
      state.register.isAlreadyUsedError = false;
      state.forgot.errorMessage = '';
      state.createPassword.errorMessage = '';
    },
    registrationRequest: (state, action: PayloadAction<RegistrationData>) => {
      state.register.isLoading = true;
      state.register.errorMessage = '';
      state.register.isSuccess = false;
      state.register.isAlreadyUsedError = false;
    },
    registrationSuccess: state => {
      state.register.isLoading = false;
      state.register.isSuccess = true;
      state.register.errorMessage = '';
      state.register.isAlreadyUsedError = false;
    },
    registrationFailure: (state, { payload }: PayloadAction<string>) => {
      state.register.isLoading = false;
      state.register.isSuccess = false;
      state.register.errorMessage = payload;
      state.register.isAlreadyUsedError = false;
    },
    resetRegistrationState: state => {
      state.register.isLoading = false;
      state.register.errorMessage = '';
      state.register.isSuccess = false;
      state.register.isAlreadyUsedError = false;
    },
    setIsAlredyUsedError: state => {
      state.register.errorMessage = '';
      state.register.isLoading = false;
      state.register.isSuccess = false;
      state.register.isAlreadyUsedError = true;
    },
    forgotPasswordRequest: (state, action: PayloadAction<ForgotCredentials>) => {
      state.forgot.isLoading = true;
      state.forgot.errorMessage = '';
      state.forgot.isSuccess = false;
    },
    forgotPasswordSuccess: state => {
      state.forgot.isLoading = false;
      state.forgot.isSuccess = true;
      state.forgot.errorMessage = '';
    },
    forgotPasswordFailure: (state, { payload }: PayloadAction<string>) => {
      state.forgot.isLoading = false;
      state.forgot.isSuccess = false;
      state.forgot.errorMessage = payload;
    },
    resetForgotPasswordState: state => {
      state.forgot.isLoading = false;
      state.forgot.isSuccess = false;
      state.forgot.errorMessage = '';
    },
    createPasswordRequest: (state, action: PayloadAction<ResetPasswordCredentials>) => {
      state.createPassword.isLoading = true;
      state.createPassword.errorMessage = '';
      state.createPassword.isSuccess = false;
    },
    createPasswordSuccess: state => {
      state.createPassword.isLoading = false;
      state.createPassword.isSuccess = true;
      state.createPassword.errorMessage = '';
    },
    createPasswordFailure: (state, { payload }: PayloadAction<string>) => {
      state.createPassword.isLoading = false;
      state.createPassword.isSuccess = false;
      state.createPassword.errorMessage = payload;
    },
    resetCreatePasswordState: state => {
      state.createPassword.isLoading = false;
      state.createPassword.isSuccess = false;
      state.createPassword.errorMessage = '';
    },
  },
});

export const {
  authRequest,
  authSuccess,
  authFailure,
  resetAuthError,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  resetRegistrationState,
  setIsAlredyUsedError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetForgotPasswordState,
  createPasswordRequest,
  createPasswordSuccess,
  createPasswordFailure,
  resetCreatePasswordState,
  setAuthenticated,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
