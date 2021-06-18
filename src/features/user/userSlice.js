/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    passwordReset: false,
    passwordResetSuccess: false,
    email: '',
    loggedIn: false,
    name: '',
  },
  reducers: {
    confirmPasswordResetReducer: (state) => {
      state.passwordReset = false;
      state.passwordResetSuccess = true;
    },
    resetPasswordReducer: (state) => {
      state.passwordReset = true;
      state.passwordResetSuccess = false;
    },
    setUser: (state, action) => {
      state.loggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    signout: (state) => {
      state.loggedIn = false;
      state.name = '';
      state.email = '';
    },
  },
});

export const {
  confirmPasswordResetReducer,
  resetPasswordReducer,
  setUser,
  signout,
} = userSlice.actions;

export default userSlice.reducer;
