import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import apiReducer from './features/api/apiSlice';
import contentReducer from './features/content/contentSlice';
import userReducer from './features/user/userSlice';
import orderReducer from './features/order/orderSlice';
import formReducer from './features/form/formSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    api: apiReducer,
    content: contentReducer,
    user: userReducer,
    order: orderReducer,
    form: formReducer,
  },
});
