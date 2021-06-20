import { configureStore } from '@reduxjs/toolkit';
import reducer from './services/reducers';

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
