// src/middleware/socketMiddleware.ts
import { Middleware, MiddlewareAPI } from "redux";
import {
  connect,
  disconnect,
  sendMessage,
  onOpen,
  onClose,
  onMessage,
  onError,
} from "services/reducers/orderWebsocket";
import { RootState, AppDispatch } from "src/index";

export const socketMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>
) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;

    if (connect.match(action)) {
      const url: string = action.payload;
      socket = new WebSocket(url);

      socket.onopen = () => {
        dispatch(onOpen());
      };

      socket.onclose = () => {
        dispatch(onClose());
      };

      socket.onmessage = (event) => {
        dispatch(onMessage(JSON.parse(event.data)));
      };

      socket.onerror = (event) => {
        dispatch(onError(event.toString()));
      };
    }

    if (disconnect.match(action)) {
      if (socket) {
        socket.close();
        socket = null;
      }
    }

    if (sendMessage.match(action)) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(action.payload));
      }
    }

    return next(action);
  };
};
