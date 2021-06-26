import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    passwordReset: false,
    passwordResetSuccess: false,
    email: '',
    loggedIn: false,
    name: '',
    orders: [],
    socketConnected: false,
    total: null,
    totalToday: null,
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
    openAuthSocket: (state) => {
      state.socketConnected = true;
    },
    closeAuthSocket: (state) => {
      state.socketConnected = false;
    },
    setAuthSocketError: (state, action) => {
      state.socketConnected = false;
      state.currentError = action.payload;
    },
    getAuthSocketMessage: (state, action) => {
      state = { ...state, ...action.payload };
      // state.orders = action.payload.orders;
      // state.total = action.payload.total;
      // state.totalToday = action.payload.totalToday;
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
