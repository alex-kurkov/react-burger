import { combineReducers } from 'redux';
import api from './api';
import content from './content';
import cart from './cart';
import order from './order';
import error from './error';
import form from './form'
import user from './user'

export const rootReducer = combineReducers({
  cart,
  api,
  content,
  order,
  form,
  error,
  user
})