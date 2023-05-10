import { RootState } from '../..';

export const authSelector = (state: RootState) => state.auth;
export const authenticationSelector = (state: RootState) => state.auth.auth;
export const registrationSelector = (state: RootState) => state.auth.register;
export const forgotSelector = (state: RootState) => state.auth.forgot;
export const createPasswordSelector = (state: RootState) => state.auth.createPassword;
