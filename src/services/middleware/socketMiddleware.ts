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
import { updateToken } from "services/actions/userActions";

export const socketMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>
) => {
  let socket: WebSocket | null = null;
  let tryRefreshToken: boolean = false;

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

      socket.onmessage = async (event) => {
        const newMessage = JSON.parse(event.data);

        if (newMessage.success) {
          dispatch(onMessage(newMessage));
          return;
        }

        if (newMessage.message === "Invalid or missing token") {
          dispatch(disconnect());

          if (!tryRefreshToken) {
            tryRefreshToken = true;
            const updateResponse = await dispatch(updateToken());
            console.warn("check update token in websocket: ", updateResponse);

            if (updateResponse.meta.requestStatus === "fulfilled") {
              console.log("Token success updated in getUser.");
              dispatch(connect(url));
            } else {
              console.error("Error in token update for websocket");
            }
            return;
          }

          tryRefreshToken = false;
        }
      };

      socket.onerror = (event) => {
        console.error(event);
        dispatch(onError(event));
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
