import { AnyAction, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/common';
import { ISocketActions } from '../actions/ws';

export const socketMiddleware = (wsUrl: string, wsActions: ISocketActions, withAuth: boolean) => (store: MiddlewareAPI) => {
  let socket: WebSocket | null = null;

  return (next: (i: AnyAction) => void) => (action: AnyAction) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const {
      wsInit, wsSendMessage, onOpen, onClose, onError, onMessage,
    } = wsActions;

    const token = withAuth ? getCookie('token') : null;

    if (type === wsInit.toString()) {
      socket = token
        ? new WebSocket(`${wsUrl}?token=${token}`)
        : new WebSocket(`${wsUrl}`);
    }
    if (socket && type === onClose.toString()) {
      socket.close();
    }

    if (socket) {
      socket.onopen = () => {
        dispatch(onOpen());
      };

      socket.onerror = () => {
        dispatch(onError('socket connection error!!!'));
      };

      socket.onmessage = (event: MessageEvent) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch(onMessage(restParsedData));
      };

      socket.onclose = (e: CloseEvent) => {
        // eslint-disable-next-line no-console
        console.log('socket closed with code: ', e.code);
      };

      if (type === wsSendMessage.toString()) {
        const message = token ? { ...payload, token } : { ...payload };
        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};
