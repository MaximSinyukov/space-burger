import { Middleware } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socketMiddleware";

const middlewares: Middleware[] = [socketMiddleware];

export default middlewares;
