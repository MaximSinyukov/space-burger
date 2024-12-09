import { Middleware } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socketMiddleware";

import {
  connect,
  disconnect,
  sendMessage,
  onOpen,
  onClose,
  onMessage,
  onError,
} from "services/reducers/orderWebsocket";

const wsOrderAction = {
  connect,
  disconnect,
  sendMessage,
  onOpen,
  onClose,
  onMessage,
  onError,
};
const orderSocketMiddleware = socketMiddleware(wsOrderAction);

const middlewares: Middleware[] = [orderSocketMiddleware];

export default middlewares;
