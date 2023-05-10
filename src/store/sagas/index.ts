import { fork } from 'redux-saga/effects';

import {
  watchAuthRequest,
  watchForgotPasswordRequest,
  watchRegistrationRequest,
  watchResetPasswordRequest,
} from './auth';
import { bookInfoRequestWatcher } from './book-info';
import { bookingRequestWatcher } from './booking';
import { booksRequestWatcher } from './books';
import { cancelBookingRequestWatcher } from './cancel-booking';
import { categoriesRequestWatcher } from './categories';
import { editBookingRequestWatcher } from './edit-booking';
import { reviewRequestWatcher, reviewUpdateWatcher } from './review';
import { userRequestMainWatcher } from './user';

export function* rootSaga() {
  yield fork(categoriesRequestWatcher);
  yield fork(booksRequestWatcher);
  yield fork(bookInfoRequestWatcher);
  yield fork(bookingRequestWatcher);
  yield fork(cancelBookingRequestWatcher);
  yield fork(editBookingRequestWatcher);
  yield fork(reviewRequestWatcher);
  yield fork(reviewUpdateWatcher);
  yield fork(userRequestMainWatcher);
  yield fork(watchAuthRequest);
  yield fork(watchRegistrationRequest);
  yield fork(watchForgotPasswordRequest);
  yield fork(watchResetPasswordRequest);
}
