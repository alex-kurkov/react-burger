import {
  ADD_CHOSEN_INGREDIENT,
  ADD_CHOSEN_BUN,
  REMOVE_CHOSEN_INGREDIENT,
  ELEMENT_SORTED_BY_DND,
  RESET_CHOSEN_INGREDIENTS,
} from '../../utils/constants';

const initialState = {
  chosenIngredients: [],
  chosenBun: {},
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHOSEN_INGREDIENT: {
      return { ...state, chosenIngredients: [...state.chosenIngredients.concat(action.payload)] };
    }
    case REMOVE_CHOSEN_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: [
          ...state.chosenIngredients.slice(0, action.payload.positionIndex),
          ...state.chosenIngredients.slice(action.payload.positionIndex + 1),
        ],
      };
    }
    case ADD_CHOSEN_BUN: {
      return { ...state, chosenBun: action.payload };
    }
    case RESET_CHOSEN_INGREDIENTS: {
      return { ...state, chosenBun: {}, chosenIngredients: [] };
    }
    case ELEMENT_SORTED_BY_DND: {
      const ingredientsWithoutSorted = [
        ...state.chosenIngredients.slice(0, action.payload.positionIndex),
        ...state.chosenIngredients.slice(action.payload.positionIndex + 1),
      ];
      const detachedHead = ingredientsWithoutSorted.slice(0, action.payload.targetIndex);
      const detachedTail = ingredientsWithoutSorted.slice(action.payload.targetIndex);
      const sortedElement = state.chosenIngredients[action.payload.positionIndex];

      return { ...state, chosenIngredients: [...detachedHead, sortedElement, ...detachedTail] };
    }
    default: {
      return state;
    }
  }
};

export default cart;
