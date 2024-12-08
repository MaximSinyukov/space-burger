import { Middleware, MiddlewareAPI } from "redux";

import { RootState, AppDispatch } from "src/index";
import { updateToken } from "services/actions/userActions";

import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export type TWsActions = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage: ActionCreatorWithPayload<any>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
  onError: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let tryRefreshToken: boolean = false;

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsActions.connect.match(action)) {
        const url: string = action.payload;
        socket = new WebSocket(url);

        socket.onopen = () => {
          dispatch(wsActions.onOpen());
        };

        socket.onclose = () => {
          dispatch(wsActions.onClose());
        };

        socket.onmessage = async (event) => {
          const newMessage = JSON.parse(event.data);

          if (newMessage.success) {
            dispatch(wsActions.onMessage(newMessage));
            return;
          }

          if (newMessage.message === "Invalid or missing token") {
            dispatch(wsActions.disconnect());

            if (!tryRefreshToken) {
              tryRefreshToken = true;
              const updateResponse = await dispatch(updateToken());
              console.warn("check update token in websocket: ", updateResponse);

              if (updateResponse.meta.requestStatus === "fulfilled") {
                console.log("Token success updated in getUser.");
                dispatch(wsActions.connect(url));
              } else {
                console.error("Error in token update for websocket");
              }
              return;
            }

            tryRefreshToken = false;
          }
        };

        socket.onerror = (event) => {
          dispatch(wsActions.onError(event.toString()));
        };
      }

      if (wsActions.disconnect.match(action)) {
        if (socket) {
          socket.close();
          socket = null;
        }
      }

      if (wsActions.sendMessage.match(action)) {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(action.payload));
        }
      }

      return next(action);
    };
  };
};
