import { getCookie } from '../../utils/common';

export const socketMiddleware = (wsUrl, wsActions, withAuth) => (store) => {
  let socket = null;

  return (next) => (action) => {
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

    if (socket) {
      socket.onopen = (event) => {
        // eslint-disable-next-line no-console
        console.log('onopen: ', event);
        // eslint-disable-next-line no-console
        console.log('socket: ', socket);
        dispatch(onOpen());
      };

      socket.onerror = (event) => {
        // eslint-disable-next-line no-console
        console.log('onerror: ', event);
        dispatch(onError(event));
      };

      socket.onmessage = (event) => {
        // eslint-disable-next-line no-console
        console.log('onmessage: ', event);
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch(onMessage(restParsedData));
      };

      socket.onclose = (event) => {
        // eslint-disable-next-line no-console
        console.log('onclose: ', event);
        dispatch(onClose());
      };

      if (type === wsSendMessage.toString()) {
        const message = token ? { ...payload, token } : { ...payload };
        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};
