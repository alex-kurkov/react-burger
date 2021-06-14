import {
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  CHANGE_INGREDIENTS_TAB,
} from '../../utils/constants';

const initialState = {
  ingredients: [],
  currentIngredientsTab: 'bun',
};

const content = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: [...action.payload] };
    }
    case REQUEST_INGREDIENTS_FAILED: {
      return { ...state, ingredients: state.ingredients };
    }
    case CHANGE_INGREDIENTS_TAB: {
      return { ...state, currentIngredientsTab: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default content;
