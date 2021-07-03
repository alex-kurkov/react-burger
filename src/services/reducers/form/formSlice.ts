import { createSlice } from '@reduxjs/toolkit';
import { TFormState } from '../../../types';

const initialState: TFormState = {
  login: {
    email: '',
    password: '',
  },
  register: {
    name: '',
    email: '',
    password: '',
  },
  forgot: {
    email: '',
  },
  reset: {
    password: '',
    code: '',
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setLoginFormValue: (state, action) => {
      state.login = { ...state.login, [action.payload.key]: action.payload.value };
    },
    setRegisterFormValue: (state, action) => {
      state.register = { ...state.register, [action.payload.key]: action.payload.value };
    },
    setForgotFormValue: (state, action) => {
      state.forgot = { ...state.forgot, [action.payload.key]: action.payload.value };
    },
    setResetFormValue: (state, action) => {
      state.reset = { ...state.reset, [action.payload.key]: action.payload.value };
    },
    clearForms: () => initialState,
  },
});

export const {
  setLoginFormValue,
  setRegisterFormValue,
  setForgotFormValue,
  setResetFormValue,
  clearForms,
} = formSlice.actions;

export default formSlice.reducer;
