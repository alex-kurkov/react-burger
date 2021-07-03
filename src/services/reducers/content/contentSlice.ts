import { createSlice } from '@reduxjs/toolkit';
import { TContentState } from '../../../types';

const initialState: TContentState = {
  ingredients: [],
  hasError: false,
  errors: [],
  currentError: null,
  orders: [],
  socketConnected: false,
  total: null,
  totalToday: null,
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
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
    openSocket: (state) => {
      state.socketConnected = true;
    },
    closeSocket: (state) => {
      state.socketConnected = false;
    },
    setSocketError: (state, action) => {
      state.socketConnected = false;
      state.currentError = action.payload;
    },
    getSocketMessage: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const {
  setIngredients,
  setCurrentError,
  resetCurrentError,
  openSocket,
  closeSocket,
  setSocketError,
  getSocketMessage,
} = contentSlice.actions;

export default contentSlice.reducer;
