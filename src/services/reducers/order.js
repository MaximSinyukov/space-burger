import { createSlice } from '@reduxjs/toolkit'

const order = createSlice({
  name: 'order',
  initialState: null,
  reducers: {
    setOrderNumber: (state, action) => action.payload,
    removeOrderNumber: (state, action) => null,
  },
});

export const { setOrderNumber, removeOrderNumber } = order.actions;
export default order.reducer;
