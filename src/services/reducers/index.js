import {
  ADD_CHOSEN_INGREDIENT,
  ADD_CHOSEN_BUN,
  REMOVE_CHOSEN_INGREDIENT,
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  CHANGE_INGREDIENTS_TAB,
  SET_ACTIVE_INGREDIENT,
  RESET_ACTIVE_INGREDIENT,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  RESET_CURRENT_ORDER,
  ELEMENT_SORTED_BY_DND,
} from '../../utils/constants';

const initialState = {
    ingredients: [],
    chosenIngredients: [],
    chosenBun: {},
    currentIngredient: {},
    order: {},
    error: '',
    currentIngredientsTab: 'bun',
    activeIngredient: {},
    currentOrder: {}
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
      return { ...store, ingredients: initialState.ingredients, error: action.payload}
    }
    case POST_ORDER_SUCCESS: {
      return { ...store,  currentOrder: action.payload }
    }
    case POST_ORDER_FAILED: {
      return { ...store, currentOrder: initialState.currentOrder, error: action.payload}
    }
    case RESET_CURRENT_ORDER: {
      return { ...store, currentOrder: {}, chosenBun: {}, chosenIngredients: []}
    }
    case CHANGE_INGREDIENTS_TAB: {
      return { ...store, currentIngredientsTab: action.payload }
    }
    case ADD_CHOSEN_INGREDIENT: {
      return { ...store, chosenIngredients: [...store.chosenIngredients.concat(action.payload) ]}
    }
    case ADD_CHOSEN_BUN: {
      return { ...store, chosenBun: action.payload }
    }
    case ELEMENT_SORTED_BY_DND: {
      const ingredientsWithoutSorted = [
        ...store.chosenIngredients.slice(0, action.payload.positionIndex), 
        ...store.chosenIngredients.slice(action.payload.positionIndex + 1),
      ]
      const detachedHead = ingredientsWithoutSorted.slice(0, action.payload.targetIndex);
      const detachedTail = ingredientsWithoutSorted.slice(action.payload.targetIndex)
      const sortedElement = store.chosenIngredients[action.payload.positionIndex]

      return { ...store, chosenIngredients: [...detachedHead, sortedElement, ...detachedTail] }
    }
    case REMOVE_CHOSEN_INGREDIENT: {
      return { 
        ...store, 
        chosenIngredients: [
          ...store.chosenIngredients.slice(0, action.payload.positionIndex), 
          ...store.chosenIngredients.slice(action.payload.positionIndex + 1),
        ]}
    }
    default: {
      return store;
    }
  }
}

