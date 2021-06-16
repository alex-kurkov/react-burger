import {
  LOGIN_FORM_SET_VALUE,
  REGISTER_FORM_SET_VALUE,
  FORGOT_FORM_SET_VALUE,
  RESET_FORM_SET_VALUE,
  CLEAR_FORM_VALUES,
} from '../../utils/constants';
import reducer from './form';

const state = {
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

const mock = {
  email: 'mock@example.com',
  password: 'topsecret',
  name: 'bond',
  code: '007',
};

describe('form reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should clear all forms\' values', () => {
    expect(reducer(undefined, { type: CLEAR_FORM_VALUES })).toEqual(state);
  });

  it('should set login form email value', () => {
    expect(reducer({ ...state, login: { password: 'something', email: 'something' } }, { type: LOGIN_FORM_SET_VALUE, field: 'email', value: mock.email }))
      .toEqual(
        expect.objectContaining({
          ...state, login: expect.objectContaining({ password: 'something', email: mock.email }),
        }),
      );
  });
  it('should set login form password value', () => {
    expect(reducer({ ...state, login: { password: 'something', email: '' } }, { type: LOGIN_FORM_SET_VALUE, field: 'password', value: mock.password }))
      .toEqual(
        expect.objectContaining({
          ...state, login: expect.objectContaining({ email: '', password: mock.password }),
        }),
      );
  });
  it('should set register form email value', () => {
    expect(reducer({ ...state, register: { name: 'Name', password: 'something', email: 'something' } }, { type: REGISTER_FORM_SET_VALUE, field: 'email', value: mock.email }))
      .toEqual(
        expect.objectContaining({
          ...state, register: expect.objectContaining({ name: 'Name', password: 'something', email: mock.email }),
        }),
      );
  });
  it('should set register form password value', () => {
    expect(reducer({ ...state, register: { name: 'Name', password: 'something', email: '' } }, { type: REGISTER_FORM_SET_VALUE, field: 'password', value: mock.password }))
      .toEqual(
        expect.objectContaining({
          ...state, register: expect.objectContaining({ name: 'Name', email: '', password: mock.password }),
        }),
      );
  });
  it('should set register form name value', () => {
    expect(reducer({ ...state, register: { name: 'Name', ...state.register } }, { type: REGISTER_FORM_SET_VALUE, field: 'name', value: mock.name }))
      .toEqual(
        expect.objectContaining({
          ...state, register: expect.objectContaining({ name: mock.name }),
        }),
      );
  });
  it('should set forgot form email value', () => {
    expect(reducer({ ...state, forgot: { email: 'something' } }, { type: FORGOT_FORM_SET_VALUE, field: 'email', value: mock.email }))
      .toStrictEqual(
        expect.objectContaining({
          ...state, forgot: expect.objectContaining({ email: mock.email }),
        }),
      );
  });
  it('should set reset form password value', () => {
    expect(reducer({ ...state, reset: { password: '333', code: '' } }, { type: RESET_FORM_SET_VALUE, field: 'password', value: mock.password }))
      .toEqual(
        expect.objectContaining({
          ...state, reset: expect.objectContaining({ password: mock.password }),
        }),
      );
  });
  it('should set reset form code value', () => {
    expect(reducer({ ...state, reset: { password: '333', code: 'aaa' } }, { type: RESET_FORM_SET_VALUE, field: 'code', value: mock.code }))
      .toEqual(
        expect.objectContaining({
          ...state, reset: expect.objectContaining({ code: mock.code }),
        }),
      );
  });
});
