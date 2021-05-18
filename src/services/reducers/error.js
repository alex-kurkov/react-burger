import {
  SET_CURRENT_ERROR,
  RESET_CURRENT_ERROR,
} from '../../utils/constants';

const initialState = {
  hasError: false,
  errors: [],
  currentError: '',
}

const error = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ERROR: {
      return { ...state,  hasError: true, errors: [...state.errors, action.payload], currentError: action.payload }
    }
    case RESET_CURRENT_ERROR: {
      return { ...state, currentError: '', hasError: false }
    }
    default: {
      return state;
    }
  }
}

export default error;
