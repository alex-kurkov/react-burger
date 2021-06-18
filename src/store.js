import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import apiReducer from './features/api/apiSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    api: apiReducer,
  },
});
