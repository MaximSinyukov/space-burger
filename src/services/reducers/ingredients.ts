import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "src/utils/constants/types";

const initialState: TIngredient[] | [] = [];

const ingredients = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) =>
      action.payload,
  },
});

export const { setIngredients } = ingredients.actions;
export default ingredients.reducer;
