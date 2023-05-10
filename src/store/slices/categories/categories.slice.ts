import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryType } from '../../../types';

type CategoriesState = {
  categories: CategoryType[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: null,
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesRequest: state => {
      state.categories = null;
      state.error = null;
      state.isLoading = true;
    },
    getCategoriesSuccess: (state, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    getCategoriesFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getCategoriesRequest, getCategoriesSuccess, getCategoriesFailure } =
  categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
