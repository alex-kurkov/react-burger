import { getCookie } from '../../utils/common';

export const socketMiddleware = (wsUrl: string, wsActions: any, withAuth: boolean) => (store: any) => {
  let socket: any = null;

  return (next: any) => (action: any) => {
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

      socket.onmessage = (event: any) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch(onMessage(restParsedData));
      };

      socket.onclose = (e: any) => {
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
