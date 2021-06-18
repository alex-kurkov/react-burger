/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: {},
  },
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = {};
    },
  },
});

export const {
  setCurrentOrder, resetCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
