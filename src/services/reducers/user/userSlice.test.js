import reducer from './userSlice';

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
    expect(reducer(state, { type: 'user/resetPasswordReducer' }))
      .toStrictEqual({ ...state, passwordReset: true, passwordResetSuccess: false });
  });

  it('should set password-reset switches on successful confirmation request', () => {
    expect(reducer(state, { type: 'user/confirmPasswordResetReducer' }))
      .toStrictEqual({ ...state, passwordReset: false, passwordResetSuccess: true });
  });

  it('should set user values on setUser reducer', () => {
    expect(reducer(state, { type: 'user/setUser', payload: mockData }))
      .toStrictEqual({
        ...state, loggedIn: true, name: mockData.name, email: mockData.email,
      });
  });
  it('should reset user values on logout', () => {
    expect(reducer({ ...state, someOtherValue: 'exists' }, { type: 'user/signout', payload: mockData }))
      .toStrictEqual({ ...state, someOtherValue: 'exists' });
  });
});
