import { createAction } from '@reduxjs/toolkit';
import {
  openSocket,
  closeSocket,
  setSocketError,
  getSocketMessage,
} from '../reducers/content/contentSlice';
import {
  openAuthSocket,
  closeAuthSocket,
  setAuthSocketError,
  getAuthSocketMessage,
} from '../reducers/user/userSlice';

export const wsInit = createAction('WS_INIT');
export const wsAuthInit = createAction('WS_AUTH_INIT');
export const wsSendMessage = createAction('WS_SEND_MESSAGE', (message) => ({ payload: message }));
export const wsSendAuthMessage = createAction('WS_SEND_AUTH_MESSAGE', (message) => ({ payload: message }));

export const wsActions = {
  wsInit,
  wsSendMessage,
  onOpen: openSocket,
  onClose: closeSocket,
  onError: setSocketError,
  onMessage: getSocketMessage,
};
export const wsActionsAuth = {
  wsInit: wsAuthInit,
  wsSendMessage: wsSendAuthMessage,
  onOpen: openAuthSocket,
  onClose: closeAuthSocket,
  onError: setAuthSocketError,
  onMessage: getAuthSocketMessage,
};
