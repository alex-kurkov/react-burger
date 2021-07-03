import { createSlice } from '@reduxjs/toolkit';
import { IIngredient, IOrder } from '../../../types';

interface TCartState {
  readonly chosenIngredients: Array<IIngredient>;
  readonly chosenBun?: IIngredient;
  readonly currentOrder?: {
    readonly success: boolean;
    readonly name: string;
    readonly order: IOrder;
  };
}

const initialState: TCartState = {
  chosenIngredients: [],
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
      delete state.chosenBun;
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
