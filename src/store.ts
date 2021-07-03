import { configureStore } from '@reduxjs/toolkit';
import reducer from './services/reducers';
import { socketMiddleware } from './services/middleware/index';
import { SOCKET_ORDERS_URL, SOCKET_ORDERS_URL_WITH_AUTH } from './utils/constants';
import { wsActions, wsActionsAuth } from './services/actions/ws';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketMiddleware(SOCKET_ORDERS_URL, wsActions))
    .concat(socketMiddleware(SOCKET_ORDERS_URL_WITH_AUTH, wsActionsAuth, true)),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
