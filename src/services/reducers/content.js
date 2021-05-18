import {
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  CHANGE_INGREDIENTS_TAB,
  SET_ACTIVE_INGREDIENT,
  RESET_ACTIVE_INGREDIENT,
} from '../../utils/constants';

const initialState = {
    ingredients: [],
    activeIngredient: {},
    currentIngredientsTab: 'bun',
    currentIngredient: {},
  }

const content = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: [...action.payload] }
    }
    case REQUEST_INGREDIENTS_FAILED: {
      return { ...state, ingredients: initialState.ingredients}
    }
    case SET_ACTIVE_INGREDIENT: {
      return { ...state, activeIngredient: action.payload }
    }
    case RESET_ACTIVE_INGREDIENT: {
      return { ...state, activeIngredient: {} }
    }
    case CHANGE_INGREDIENTS_TAB: {
      return { ...state, currentIngredientsTab: action.payload }
    }
    default: {
      return state;
    }
  }
}

export default content;
