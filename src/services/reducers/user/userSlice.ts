import { createSlice } from '@reduxjs/toolkit';
import { TUserState } from '../../../types';

const initialState: TUserState = {
  passwordReset: false,
  passwordResetSuccess: false,
  email: '',
  loggedIn: false,
  name: '',
  userOrders: [],
  socketConnected: false,
  total: null,
  totalToday: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
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
    openAuthSocket: (state) => {
      state.socketConnected = true;
    },
    closeAuthSocket: (state) => {
      state.socketConnected = false;
    },
    setAuthSocketError: (state) => {
      state.socketConnected = false;
    },
    getAuthSocketMessage: (state, action) => {
      state.userOrders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const {
  confirmPasswordResetReducer,
  resetPasswordReducer,
  setUser,
  signout,
  openAuthSocket,
  closeAuthSocket,
  setAuthSocketError,
  getAuthSocketMessage,
} = userSlice.actions;

export default userSlice.reducer;
