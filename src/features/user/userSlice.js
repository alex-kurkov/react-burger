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
    confirmPasswordReset: (state) => {
      state.passwordReset = false;
      state.passwordResetSuccess = true;
    },
    resetPassword: (state) => {
      state.passwordReset = true;
      state.passwordResetSuccess = false;
    },
    setUser: (state, action) => {
      state.loggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.name = '';
      state.email = '';
    },
  },
});

export const {
  confirmPasswordReset,
  resetPassword,
  setUser,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
