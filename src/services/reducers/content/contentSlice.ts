import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient, IOrder } from '../../../types';

interface TContentState {
  readonly ingredients: Array<IIngredient>,
  readonly hasError: boolean,
  readonly errors: Array<string>,
  readonly currentError: string | null,
  readonly orders: Array<IOrder>,
  readonly socketConnected: boolean,
  readonly total: number | null,
  readonly totalToday: null | number,
}

const initialState: TContentState = {
  ingredients: [],
  hasError: false,
  errors: [],
  currentError: null,
  orders: [],
  socketConnected: false,
  total: null,
  totalToday: null,
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<IIngredient[]>) => {
      state.ingredients = [...action.payload];
    },
    countIngredientsInCart: (state, action: PayloadAction<
      { isAdd?: boolean; isDel?: boolean; id: string; isBun?: boolean }
      >) => {
        const { isAdd, id, isBun, isDel } = action.payload;
        const countedIngredients: IIngredient[] = state.ingredients.map((i) => {
          if (isDel) {
            return (i._id !== id) ? i : {...i, countInCart: i.countInCart ? i.countInCart -= 1 : 0};
          }
          if (isBun && isAdd) {
            return i.type === 'bun' ? {...i, countInCart: i._id === id ? 1 : 0} : i;
          }
          if (!isBun && isAdd) {
            return i._id === id ? {...i, countInCart: i.countInCart? i.countInCart += 1 : 1} : i;
          }
          return i;
        })
        state.ingredients = countedIngredients;
    },
    setCurrentError: (state, action: PayloadAction<string>) => {
      state.hasError = true;
      state.currentError = action.payload;
      state.errors = [...state.errors, action.payload];
    },
    resetCurrentError: (state) => {
      state.hasError = false;
      state.currentError = null;
    },
    openSocket: (state) => {
      state.socketConnected = true;
    },
    closeSocket: (state) => {
      state.socketConnected = false;
    },
    setSocketError: (state, action: PayloadAction<string>) => {
      state.socketConnected = false;
      state.currentError = action.payload;
    },
    getSocketMessage: (state, action: PayloadAction<{orders: IOrder[]; total: number; totalToday: number}>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const {
  setIngredients,
  setCurrentError,
  resetCurrentError,
  openSocket,
  closeSocket,
  setSocketError,
  getSocketMessage,
  countIngredientsInCart
} = contentSlice.actions;

export default contentSlice.reducer;
