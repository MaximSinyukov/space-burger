import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUserAuthorization, setUserData } from 'services/reducers/user';

import { request } from 'utils/methods/request';
import { setCookie } from 'utils/methods/setCookie';
import { prepareBearerToken } from 'utils/methods/prepareBearerToken';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (newUser, { dispatch }) => {
    const response = await request('/auth/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.success) {
      console.error('Error in registerUser action');
      return;
    }

    dispatch(setUserAuthorization());
    dispatch(setUserData(response.user));

    setCookie('token', prepareBearerToken(response.accessToken));
    setCookie('refresh', response.refreshToken);
  }
);

export const loginUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { dispatch }) => {
    const response = await request('/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.success) {
      console.error('Error in loginUser action');
      return;
    }

    dispatch(setUserAuthorization());
    dispatch(setUserData(response.user));

    setCookie('token', prepareBearerToken(response.accessToken));
    setCookie('refresh', response.refreshToken);
  }
);
