import { createSlice } from '@reduxjs/toolkit'

const detailIngredient = createSlice({
  name: 'ingredients',
  initialState: {},
  reducers: {
    setIngredientDetails: (state, action) => action.payload,
    removeIngredientDetails: (state) => ({}),
  },
});

export const { setIngredientDetails, removeIngredientDetails } = detailIngredient.actions;
export default detailIngredient.reducer;
