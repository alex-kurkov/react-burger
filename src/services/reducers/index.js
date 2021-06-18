import cartReducer from './cart/cartSlice';
import apiReducer from './api/apiSlice';
import contentReducer from './content/contentSlice';
import userReducer from './user/userSlice';
import formReducer from './form/formSlice';

export default {
  cart: cartReducer,
  api: apiReducer,
  content: contentReducer,
  user: userReducer,
  form: formReducer,
};
