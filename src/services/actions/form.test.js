import {
  LOGIN_FORM_SET_VALUE,
  REGISTER_FORM_SET_VALUE,
  FORGOT_FORM_SET_VALUE,
  RESET_FORM_SET_VALUE,
} from '../../utils/constants';
import * as actions from './form';

describe('Action creators', () => {
  it('should create an action with correct fields', () => {
    const field = 'password';
    const value = 'qwerty';

    expect(actions.setLoginFormValue(field, value))
      .toEqual({ type: LOGIN_FORM_SET_VALUE, field, value });
    expect(actions.setRegisterFormValue(field, value))
      .toEqual({ type: REGISTER_FORM_SET_VALUE, field, value });
    expect(actions.setForgotFormValue(field, value))
      .toEqual({ type: FORGOT_FORM_SET_VALUE, field, value });
    expect(actions.setResetFormValue(field, value))
      .toEqual({ type: RESET_FORM_SET_VALUE, field, value });
  });
});
