/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenIngredients: [],
  chosenBun: {},
  currentOrder: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.chosenIngredients = [...state.chosenIngredients.concat(action.payload)];
    },
    removeIngredient: (state, action) => {
      state.chosenIngredients = [
        ...state.chosenIngredients.slice(0, action.payload.positionIndex),
        ...state.chosenIngredients.slice(action.payload.positionIndex + 1),
      ];
    },
    addBun: (state, action) => {
      state.chosenBun = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    resetCurrentOrder: () => ({ ...initialState }),
    resetIngredients: (state) => {
      state.chosenIngredients = [];
      state.chosenBun = {};
    },
    sortIngredients: (state, action) => {
      const ingredientsWithoutSorted = [
        ...state.chosenIngredients.slice(0, action.payload.positionIndex),
        ...state.chosenIngredients.slice(action.payload.positionIndex + 1),
      ];
      const detachedHead = ingredientsWithoutSorted.slice(0, action.payload.targetIndex);
      const detachedTail = ingredientsWithoutSorted.slice(action.payload.targetIndex);
      const sortedElement = state.chosenIngredients[action.payload.positionIndex];

      state.chosenIngredients = [...detachedHead, sortedElement, ...detachedTail];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  addBun,
  resetIngredients,
  sortIngredients,
  setCurrentOrder,
  resetCurrentOrder,
} = cartSlice.actions;

export default cartSlice.reducer;