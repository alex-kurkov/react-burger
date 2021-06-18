import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import apiReducer from './features/api/apiSlice';
import contentReducer from './features/content/contentSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    api: apiReducer,
    content: contentReducer,
  },
});
