import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  CLEAR_PASSWORD_RESET,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED
} from '../../utils/constants';

const initialState = {
  passwordReset: false,
  email: '',
  loggedIn: false,
  name: '',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_SUCCESS: {
      return { ...state, passwordReset: true }
    }
    case PASSWORD_RESET_FAILED: {
      return { ...state, passwordReset: false }
    }
    case CLEAR_PASSWORD_RESET: {
      return { ...state, passwordReset: false }
    }
    case REGISTER_SUCCESS: {
      return { ...state, loggedIn: true, name: action.payload.name, email: action.payload.email }
    }
    case LOGOUT_SUCCESS: {
      return { ...state, loggedIn: false, name: '', email: '' }
    }
    case REGISTER_FAILED: {
      return { ...state, loggedIn: false }
    }
    case LOGIN_SUCCESS: {
      return { ...state, loggedIn: true, name: action.payload.name, email: action.payload.email }
    }
    case LOGIN_FAILED: {
      return { ...state, loggedIn: false, name: '', email: '' }
    }
    case GET_USER_SUCCESS: {
      return { ...state, loggedIn: true, name: action.payload.name, email: action.payload.email }
    }
    case GET_USER_FAILED: {
      return { ...state, loggedIn: false, name: '', email: '' }
    }
    case PATCH_USER_SUCCESS: {
      return { ...state, loggedIn: true, name: action.payload.name, email: action.payload.email }
    }
    case PATCH_USER_FAILED: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default user;
