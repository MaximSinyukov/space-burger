import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderList } from "utils/constants/types";

type TSocketState = {
  isConnected: boolean;
  data: TOrderList | null;
  error: {} | null;
};

const initialState: TSocketState = {
  isConnected: false,
  data: null,
  error: null,
};

const orderWebsocket = createSlice({
  name: "orderWebsocket",
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<string>) => {},
    disconnect: (state) => {},
    sendMessage: (state, action: PayloadAction<{}>) => {},
    onOpen: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    onClose: (state) => {
      state.isConnected = false;
      state.data = null;
    },
    onMessage: (state, action: PayloadAction<TOrderList>) => {
      state.data = action.payload;
    },
    onError: (state, action: PayloadAction<{}>) => {
      state.error = action.payload;
    },
  },
});

export const {
  connect,
  disconnect,
  sendMessage,
  onOpen,
  onClose,
  onMessage,
  onError,
} = orderWebsocket.actions;
export default orderWebsocket.reducer;
