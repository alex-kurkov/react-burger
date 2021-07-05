import { createSlice } from '@reduxjs/toolkit';

interface TApiState {
  readonly apiRequestInProgress: boolean;
};

const initialState: TApiState = {
  apiRequestInProgress: false,
}

export const apiSlice = createSlice({
  name: 'api',
  initialState,
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
