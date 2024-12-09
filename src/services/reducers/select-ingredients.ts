import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient, TIngredientConstructor } from "src/utils/constants/types";

type TIngredientCounts = {
  [ingredientApiId: string]: number;
};

type TStoreSelectIngredients = {
  buns: TIngredient | null;
  otherIngredients: TIngredientConstructor[] | [];
  ingredientsCounter: TIngredientCounts;
};

const selectIngredients = createSlice({
  name: "select-ingredients",
  initialState: {
    buns: null,
    otherIngredients: [],
    ingredientsCounter: {},
  } as TStoreSelectIngredients,
  reducers: {
    selectIngredient: (
      state,
      action: PayloadAction<TIngredientConstructor>
    ) => ({
      ...state,
      otherIngredients: [...state.otherIngredients, action.payload],
    }),
    removeIngredient: (state, action: PayloadAction<string>) => ({
      ...state,
      otherIngredients: state.otherIngredients.filter(
        (ingredient, index) => ingredient.uniqueId !== action.payload
      ),
    }),
    updateOtherIngredients: (
      state,
      action: PayloadAction<TIngredientConstructor[]>
    ) => ({
      ...state,
      otherIngredients: action.payload,
    }),
    selectBuns: (state, action: PayloadAction<TIngredient>) => ({
      ...state,
      buns: action.payload,
    }),
    increaseIngredientCount: (state, action: PayloadAction<string>) => ({
      ...state,
      ingredientsCounter: {
        ...state.ingredientsCounter,
        [action.payload]: state.ingredientsCounter[action.payload]
          ? state.ingredientsCounter[action.payload] + 1
          : 1,
      },
    }),
    decreaseIngredientCount: (state, action: PayloadAction<string>) => ({
      ...state,
      ingredientsCounter: {
        ...state.ingredientsCounter,
        [action.payload]: state.ingredientsCounter[action.payload] - 1,
      },
    }),
    resetSelectIngredients: () => ({
      buns: null,
      otherIngredients: [],
      ingredientsCounter: {},
    }),
  },
});

export const {
  selectIngredient,
  removeIngredient,
  selectBuns,
  increaseIngredientCount,
  decreaseIngredientCount,
  resetSelectIngredients,
  updateOtherIngredients,
} = selectIngredients.actions;
export default selectIngredients.reducer;
