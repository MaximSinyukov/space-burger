import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    userData: {},
  },
  reducers: {
    setUserAuthorization: (state) => ({
      ...state,
      isAuthorized: true,
    }),
    setUserUnuthorization: (state) => ({
      ...state,
      isAuthorized: false,
    }),
    setUserData: (state, action) => ({
      ...state,
      userData: {
        ...state.userData,
        ...action.payload,
      },
    }),
    removeUserData: (state, action) => ({
      ...state,
      userData: null,
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
