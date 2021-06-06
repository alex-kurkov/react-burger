import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  CLEAR_PASSWORD_RESET,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from '../../utils/constants';

const initialState = {
  passwordReset: false,
  password: '',
  email: '',
  loggedIn: false,
  name: '',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_SUCCESS: {
      return { ...state, passwordReset: true, email: action.payload.email }
    }
    case PASSWORD_RESET_FAILED: {
      return { ...state, passwordReset: false }
    }
    case CLEAR_PASSWORD_RESET: {
      return { ...state, passwordReset: false }
    }
    case REGISTER_SUCCESS: {
      return { ...state, loggedIn: true, name: action.payload.user.name, email: action.payload.user.email }
    }
    case REGISTER_FAILED: {
      return { ...state, loggedIn: false }
    }
    default: {
      return state;
    }
  }
}

export default user;
