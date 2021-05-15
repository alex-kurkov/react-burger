import { combineReducers } from 'redux';
import {
  ADD_CHOSEN_INGREDIENT,
  REMOVE_CHOSEN_INGREDIENT,
} from '../../utils/constants';

const initialState = [
  {
    ingredients: [],
    chosenIngredients: [],
    currentIngredient: {},
    order: {},
  }
]


const mainReducer = (store = initialState, action) => {
  switch (action.type) {
    case ADD_CHOSEN_INGREDIENT: {
      return {...store, step: 'next'}
    }
    case REMOVE_CHOSEN_INGREDIENT: {
      return {...store, step: 'next'}
    }
    default: {
      return store;
    }
  }
}

export const rootReducer = combineReducers(mainReducer);
