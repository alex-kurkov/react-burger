import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TFormState {
  login: {
    readonly email: string;
    readonly password: string;
  },
  register: {
    readonly name: string;
    readonly email: string;
    readonly password: string;
  },
  forgot: {
    readonly email: string;
  },
  reset: {
    readonly password: string;
    readonly code: string;
  },
}
type TFormPayload = {
  key: string;
  value: string;
}

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
    setLoginFormValue: (state, action: PayloadAction<TFormPayload>) => {
      state.login = { ...state.login, [action.payload.key]: action.payload.value };
    },
    setRegisterFormValue: (state, action: PayloadAction<TFormPayload>) => {
      state.register = { ...state.register, [action.payload.key]: action.payload.value };
    },
    setForgotFormValue: (state, action: PayloadAction<TFormPayload>) => {
      state.forgot = { ...state.forgot, [action.payload.key]: action.payload.value };
    },
    setResetFormValue: (state, action: PayloadAction<TFormPayload>) => {
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
