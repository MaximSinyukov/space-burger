import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TIngredient } from "src/utils/constants/types";

const detailIngredient = createSlice({
  name: "detailIngredient",
  initialState: null as TIngredient | null,
  reducers: {
    setIngredientDetails: (state, action: PayloadAction<TIngredient>) =>
      action.payload,
    removeIngredientDetails: () => null,
  },
});

export const { setIngredientDetails, removeIngredientDetails } =
  detailIngredient.actions;
export default detailIngredient.reducer;
