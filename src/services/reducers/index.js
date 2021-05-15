import {
  ADD_CHOSEN_INGREDIENT,
  REMOVE_CHOSEN_INGREDIENT,
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  CHANGE_INGREDIENTS_TAB,
  SET_ACTIVE_INGREDIENT,
  RESET_ACTIVE_INGREDIENT,
  
} from '../../utils/constants';

const initialState = {
    ingredients: [],
    chosenIngredients: [],
    currentIngredient: {},
    order: {},
    error: '',
    currentIngredientsTab: 'bun',
    activeIngredient: {},
  }


export const rootReducer = (store = initialState, action) => {
  switch (action.type) {
    case RESET_ACTIVE_INGREDIENT: {
      return { ...store, activeIngredient: {} }
    }
    case SET_ACTIVE_INGREDIENT: {
      return { ...store, activeIngredient: action.payload }
    }
    case REQUEST_INGREDIENTS_SUCCESS: {
      return { ...store, ingredients: [...action.payload] }
    }
    case REQUEST_INGREDIENTS_FAILED: {
      return { ...store, error: action.payload}
    }
    case CHANGE_INGREDIENTS_TAB: {
      return { ...store, currentIngredientsTab: action.payload }
    }
    case ADD_CHOSEN_INGREDIENT: {
      return { ...store, chosenIngredients: [...store.chosenIngredients.concat(action.payload) ]}
    }
    case REMOVE_CHOSEN_INGREDIENT: {
      return { ...store, chosenIngredients: [...store.chosenIngredients.filter(i => i._id !== action.payload._id)]}
    }
    default: {
      return store;
    }
  }
}

