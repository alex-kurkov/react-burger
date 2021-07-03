import { createAction } from '@reduxjs/toolkit';
import { WS_INIT, WS_AUTH_INIT, WS_SEND_MESSAGE, WS_SEND_AUTH_MESSAGE } from '../constants'
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

export const wsInit = createAction<void>(WS_INIT);
export const wsAuthInit = createAction<void>(WS_AUTH_INIT);
export const wsSendMessage = createAction<string>(WS_SEND_MESSAGE);
export const wsSendAuthMessage = createAction<string>(WS_SEND_AUTH_MESSAGE);

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
