import { combineReducers } from "@reduxjs/toolkit";

import ingredients from "./ingredients";
import detailIngredient from "./detail-ingredient";
import selectIngredients from "./select-ingredients";
import order from "./order";
import user from "./user";
import orderWebsocket from "./orderWebsocket";

export const rootReducer = combineReducers({
  ingredients,
  detailIngredient,
  selectIngredients,
  order,
  user,
  orderWebsocket,
});
