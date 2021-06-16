import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  PASSWORD_RESET_CONFIRMATION_SUCCESS,
  PASSWORD_RESET_CONFIRMATION_FAILED,
} from '../../utils/constants';
import reducer from './user';

const state = {
  passwordReset: false,
  passwordResetSuccess: false,
  email: '',
  loggedIn: false,
  name: '',
};

const mockData = {
  name: 'Joe Dow',
  email: 'example@example.com',
};

describe('user reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set password-reset switches on successful request', () => {
    expect(reducer(state, { type: PASSWORD_RESET_SUCCESS }))
      .toStrictEqual({ ...state, passwordReset: true, passwordResetSuccess: false });
  });
  it('should set password-reset switches on failed request', () => {
    expect(reducer(state, { type: PASSWORD_RESET_FAILED }))
      .toStrictEqual({ ...state, passwordReset: false, passwordResetSuccess: false });
  });
  it('should set password-reset switches on successful confirmation request', () => {
    expect(reducer(state, { type: PASSWORD_RESET_CONFIRMATION_SUCCESS }))
      .toStrictEqual({ ...state, passwordReset: false, passwordResetSuccess: true });
  });
  it('should set password-reset switches on failed confirmation request', () => {
    expect(reducer(state, { type: PASSWORD_RESET_CONFIRMATION_FAILED }))
      .toStrictEqual({ ...state, passwordReset: true, passwordResetSuccess: false });
  });
  it('should set user values on successful register', () => {
    expect(reducer(state, { type: REGISTER_SUCCESS, payload: mockData }))
      .toStrictEqual({
        ...state, loggedIn: true, name: mockData.name, email: mockData.email,
      });
  });
  it('should reset user values on failed register', () => {
    expect(reducer({ ...state, someOtherValue: 'exists' }, { type: REGISTER_FAILED, payload: mockData }))
      .toStrictEqual({ ...state, someOtherValue: 'exists' });
  });
  it('should set user values on successful login', () => {
    expect(reducer(state, { type: LOGIN_SUCCESS, payload: mockData }))
      .toStrictEqual({
        ...state, loggedIn: true, name: mockData.name, email: mockData.email,
      });
  });
  it('should reset user values on failed login', () => {
    expect(reducer({ ...state, someOtherValue: 'exists' }, { type: LOGIN_FAILED, payload: mockData }))
      .toStrictEqual({ ...state, someOtherValue: 'exists' });
  });
  it('should set user values on successful getUserRequest', () => {
    expect(reducer(state, { type: GET_USER_SUCCESS, payload: mockData }))
      .toStrictEqual({
        ...state, loggedIn: true, name: mockData.name, email: mockData.email,
      });
  });
  it('should reset user values on failed getUserRequest', () => {
    expect(reducer({ ...state, someOtherValue: 'exists' }, { type: GET_USER_FAILED, payload: mockData }))
      .toStrictEqual({ ...state, someOtherValue: 'exists' });
  });
  it('should set user values on successful patch request', () => {
    expect(reducer(state, { type: PATCH_USER_SUCCESS, payload: mockData }))
      .toStrictEqual({
        ...state, loggedIn: true, name: mockData.name, email: mockData.email,
      });
  });
  it('should reset user values on failed patch request', () => {
    expect(reducer({ ...state, someOtherValue: 'exists' }, { type: PATCH_USER_FAILED, payload: mockData }))
      .toStrictEqual({ ...state, someOtherValue: 'exists' });
  });
  it('should reset user values on logout', () => {
    expect(reducer({ ...state, someOtherValue: 'exists' }, { type: LOGOUT_SUCCESS, payload: mockData }))
      .toStrictEqual({ ...state, someOtherValue: 'exists' });
  });
});
