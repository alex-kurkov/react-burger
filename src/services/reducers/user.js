const initialState = {
  passwordReset: false,
  passwordResetSuccess: false,
  email: '',
  loggedIn: false,
  name: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'PASSWORD_RESET_CONFIRMATION_SUCCESS': {
      return { ...state, passwordReset: false, passwordResetSuccess: true };
    }
    case 'PASSWORD_RESET_CONFIRMATION_FAILED': {
      return { ...state, passwordReset: true, passwordResetSuccess: false };
    }
    case 'PASSWORD_RESET_SUCCESS': {
      return { ...state, passwordReset: true, passwordResetSuccess: false };
    }
    case 'PASSWORD_RESET_FAILED': {
      return { ...state, passwordReset: false, passwordResetSuccess: false };
    }
    case 'REGISTER_SUCCESS': {
      return {
        ...state, loggedIn: true, name: action.payload.name, email: action.payload.email,
      };
    }
    case 'REGISTER_FAILED': {
      return { ...state, loggedIn: false };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state, loggedIn: true, name: action.payload.name, email: action.payload.email,
      };
    }
    case 'LOGIN_FAILED': {
      return {
        ...state, loggedIn: false, name: '', email: '',
      };
    }
    case 'GET_USER_SUCCESS': {
      return {
        ...state, loggedIn: true, name: action.payload.name, email: action.payload.email,
      };
    }
    case 'GET_USER_FAILED': {
      return {
        ...state, loggedIn: false, name: '', email: '',
      };
    }
    case 'PATCH_USER_SUCCESS': {
      return {
        ...state, loggedIn: true, name: action.payload.name, email: action.payload.email,
      };
    }
    case 'PATCH_USER_FAILED': {
      return state;
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state, loggedIn: false, name: '', email: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
