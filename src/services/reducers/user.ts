import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUserBio = {
  name?: string;
  email?: string;
};

type TStoreUser = {
  isAuthorized: boolean;
  userData: TUserBio;
};

const initialState: TStoreUser = {
  isAuthorized: false,
  userData: {},
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuthorization: (state) => ({
      ...state,
      isAuthorized: true,
    }),
    setUserUnuthorization: (state) => ({
      ...state,
      isAuthorized: false,
    }),
    setUserData: (state, action: PayloadAction<TUserBio>) => ({
      ...state,
      userData: {
        ...state.userData,
        ...action.payload,
      },
    }),
    removeUserData: (state) => ({
      ...state,
      userData: {},
    }),
  },
});

export const {
  setUserAuthorization,
  setUserUnuthorization,
  setUserData,
  removeUserData,
} = user.actions;
export default user.reducer;
