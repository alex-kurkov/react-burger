import reducer from './formSlice';

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
    expect(reducer(undefined, { type: 'form/' })).toEqual(state);
  });

  it('should set login form email value', () => {
    expect(reducer({
      ...state,
      login: { password: 'something', email: 'something' },
    },
    { type: 'form/setLoginFormValue', payload: { key: 'email', value: mock.email } }))
      .toEqual(
        expect.objectContaining({
          ...state, login: expect.objectContaining({ password: 'something', email: mock.email }),
        }),
      );
  });

  it('should set login form password value', () => {
    expect(reducer({
      ...state,
      login: { password: 'something', email: '' },
    },
    { type: 'form/setLoginFormValue', payload: { key: 'password', value: mock.password } }))
      .toEqual(
        expect.objectContaining({
          ...state, login: expect.objectContaining({ email: '', password: mock.password }),
        }),
      );
  });

  it('should set register form email value', () => {
    expect(reducer({ ...state, register: { name: 'Name', password: 'something', email: 'something' } },
      { type: 'form/setRegisterFormValue', payload: { key: 'email', value: mock.email } }))
      .toEqual(
        expect.objectContaining({
          ...state, register: expect.objectContaining({ name: 'Name', password: 'something', email: mock.email }),
        }),
      );
  });

  it('should set register form password value', () => {
    expect(reducer({
      ...state,
      register: { name: 'Name', password: 'something', email: '' },
    },
    { type: 'form/setRegisterFormValue', payload: { key: 'password', value: mock.password } }))
      .toEqual(
        expect.objectContaining({
          ...state, register: expect.objectContaining({ name: 'Name', email: '', password: mock.password }),
        }),
      );
  });

  it('should set register form name value', () => {
    expect(reducer({
      ...state,
      register: { name: 'Name', ...state.register },
    },
    { type: 'form/setRegisterFormValue', payload: { key: 'name', value: mock.name } }))
      .toEqual(
        expect.objectContaining({
          ...state, register: expect.objectContaining({ name: mock.name }),
        }),
      );
  });

  it('should set forgot form email value', () => {
    expect(reducer({ ...state, forgot: { email: 'something' } },
      { type: 'form/setForgotFormValue', payload: { key: 'email', value: mock.email } }))
      .toStrictEqual(
        expect.objectContaining({
          ...state, forgot: expect.objectContaining({ email: mock.email }),
        }),
      );
  });

  it('should set reset form password value', () => {
    expect(reducer({ ...state, reset: { password: '333', code: '' } },
      { type: 'form/setResetFormValue', payload: { key: 'password', value: mock.password } }))
      .toEqual(
        expect.objectContaining({
          ...state, reset: expect.objectContaining({ password: mock.password }),
        }),
      );
  });

  it('should set reset form code value', () => {
    expect(reducer({ ...state, reset: { password: '333', code: 'aaa' } },
      { type: 'form/setResetFormValue', payload: { key: 'code', value: mock.code } }))
      .toEqual(
        expect.objectContaining({
          ...state, reset: expect.objectContaining({ code: mock.code }),
        }),
      );
  });
});
