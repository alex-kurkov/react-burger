import { createSlice } from '@reduxjs/toolkit';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    apiRequestInProgress: false,
  },
  reducers: {
    startRequest: (state) => {
      state.apiRequestInProgress = true;
    },
    finishRequest: (state) => {
      state.apiRequestInProgress = false;
    },
  },
});

export const {
  startRequest, finishRequest,
} = apiSlice.actions;

export default apiSlice.reducer;
