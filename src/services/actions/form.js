import {
    LOGIN_FORM_SET_VALUE,
    REGISTER_FORM_SET_VALUE,
    FORGOT_FORM_SET_VALUE,
    RESET_FORM_SET_VALUE,
} from '../../utils/constants';

export const setLoginFormValue = (field, value) => ({
    type: LOGIN_FORM_SET_VALUE,
    field,
    value
})
export const setRegisterFormValue = (field, value) => ({
    type: REGISTER_FORM_SET_VALUE,
    field,
    value
})
export const setForgotFormValue = (field, value) => ({
    type: FORGOT_FORM_SET_VALUE,
    field,
    value
})
export const setResetFormValue = (field, value) => ({
    type: RESET_FORM_SET_VALUE,
    field,
    value
})