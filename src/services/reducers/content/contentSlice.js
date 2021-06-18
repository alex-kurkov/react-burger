/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    ingredients: [],
    hasError: false,
    errors: [],
    currentError: null,
  },
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = [...action.payload];
    },
    setCurrentError: (state, action) => {
      state.hasError = true;
      state.currentError = action.payload;
      state.errors = [...state.errors, action.payload];
    },
    resetCurrentError: (state) => {
      state.hasError = false;
      state.currentError = null;
    },
  },
});

export const {
  setIngredients, setCurrentError, resetCurrentError,
} = contentSlice.actions;

export default contentSlice.reducer;
