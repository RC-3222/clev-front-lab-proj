import createSagaMiddleware from 'redux-saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { rootSaga } from './sagas';
import {
  authReducer,
  bookInfoReducer,
  bookingReducer,
  booksReducer,
  categoriesReducer,
  reviewReducer,
  toastReducer,
  userReducer,
} from './slices';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  books: booksReducer,
  categories: categoriesReducer,
  bookInfo: bookInfoReducer,
  booking: bookingReducer,
  review: reviewReducer,
  user: userReducer,
  auth: authReducer,
  toast: toastReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
