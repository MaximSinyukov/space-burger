import { createSlice } from '@reduxjs/toolkit'

const selectIngredients = createSlice({
  name: 'select-ingredients',
  initialState: {
    buns: null,
    otherIngredients: [],
    ingredientsCounter: {},
  },
  reducers: {
    selectIngredient: (state, action) => ({
      ...state,
      otherIngredients: [
        ...state.otherIngredients,
        action.payload,
      ],
    }),
    removeIngredient: (state, action) => ({
      ...state,
      otherIngredients: state.otherIngredients.filter((ingredient, index) => ingredient.uniqueId !== action.payload),
    }),
    updateOtherIngredients: (state, action) => ({
      ...state,
      otherIngredients: action.payload,
    }),
    selectBuns: (state, action) => ({
      ...state,
      buns: action.payload,
    }),
    increaseIngredientCount: (state, action) => ({
      ...state,
      ingredientsCounter: {
        ...state.ingredientsCounter,
        [action.payload]: state.ingredientsCounter[action.payload]
          ? state.ingredientsCounter[action.payload] + 1
          : 1,
      },
    }),
    decreaseIngredientCount: (state, action) => ({
      ...state,
      ingredientsCounter: {
        ...state.ingredientsCounter,
        [action.payload]: state.ingredientsCounter[action.payload] - 1,
      },
    }),
    resetSelectIngredients: (state, action) => ({
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
