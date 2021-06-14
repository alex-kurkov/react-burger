import {
  LOGIN_FORM_SET_VALUE,
  REGISTER_FORM_SET_VALUE,
  FORGOT_FORM_SET_VALUE,
  RESET_FORM_SET_VALUE,
  CLEAR_FORM_VALUES,
} from '../../utils/constants';

const initialState = {
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

const form = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_SET_VALUE: {
      return {
        ...state,
        login: {
          ...state.login,
          [action.field]: action.value,
        },
      };
    }
    case REGISTER_FORM_SET_VALUE: {
      return {
        ...state,
        register: {
          ...state.register,
          [action.field]: action.value,
        },
      };
    }
    case FORGOT_FORM_SET_VALUE: {
      return {
        ...state,
        forgot: {
          ...state.forgot,
          [action.field]: action.value,
        },
      };
    }
    case RESET_FORM_SET_VALUE: {
      return {
        ...state,
        reset: {
          ...state.reset,
          [action.field]: action.value,
        },
      };
    }
    case CLEAR_FORM_VALUES: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default form;
