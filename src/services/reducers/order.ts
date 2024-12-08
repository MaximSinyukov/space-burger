import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TOrderState = null | number;

const order = createSlice({
  name: "order",
  initialState: null as TOrderState,
  reducers: {
    setOrderNumber: (state, action: PayloadAction<number>): TOrderState =>
      action.payload,
    removeOrderNumber: (): null => null,
  },
});

export const { setOrderNumber, removeOrderNumber } = order.actions;
export default order.reducer;
