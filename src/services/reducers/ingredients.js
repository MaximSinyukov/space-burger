import { createSlice } from '@reduxjs/toolkit'

const ingredients = createSlice({
  name: 'ingredients',
  initialState: [],
  reducers: {
    setIngredients: (state, action) => action.payload,
  },
});

export const { setIngredients } = ingredients.actions;
export default ingredients.reducer;
