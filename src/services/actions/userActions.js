import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  setUserAuthorization,
  setUserData,
  setUserUnuthorization,
  removeUserData
} from 'services/reducers/user';

import { request } from 'utils/methods/request';
import { setCookie, getCookie, deleteCookie } from 'utils/methods/cookieMethods';
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
      return Promise.reject();
    }

    dispatch(setUserAuthorization());
    dispatch(setUserData(response.user));

    setCookie('token', prepareBearerToken(response.accessToken), {
      expires: 1200,
      path: '/',
    });
    setCookie('refresh', response.refreshToken);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
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
      return Promise.reject();
    }

    dispatch(setUserAuthorization());
    dispatch(setUserData(response.user));

    setCookie('token', prepareBearerToken(response.accessToken), {
      expires: 1200,
      path: '/',
    });
    setCookie('refresh', response.refreshToken);
  }
);

export const exitUser = createAsyncThunk(
  'user/exitUser',
  async (arg, { dispatch }) => {
    const response = await request('/auth/logout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'token': getCookie('refresh'),
      }),
    });

    if (!response.success) {
      console.error('Error in exitUser action');
      return Promise.reject();
    }

    dispatch(setUserUnuthorization());
    dispatch(removeUserData());

    deleteCookie('token');
    deleteCookie('refresh');
  }
);

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async () => {
    const response = await request('/auth/token', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'token': getCookie('refresh'),
      }),
    });

    if (!response.success) {
      console.error('Error in updateToken action');
      return Promise.reject();
    }

    setCookie('token', prepareBearerToken(response.accessToken), {
      expires: 1200,
      path: '/',
    });
    setCookie('refresh', response.refreshToken);
  }
);

let isRefreshing = false;

export const getUser = createAsyncThunk(
  'user/getUser',
  async (arg, { dispatch }) => {
    const response = await request('/auth/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('token')
      },
    });

    if (!response.success && response.message === 'jwt malformed') {
      if (!isRefreshing) {
        isRefreshing = true;

        const updateResponse = await dispatch(updateToken());
        console.warn('check update', updateResponse);

        if (updateResponse.meta.requestStatus === 'fulfilled') {
          console.log('Token success updated.');
          isRefreshing = false;
          return dispatch(getUser());
        } else {
          isRefreshing = false;
          console.error('Error in token update');
          return Promise.reject();
        }
      }
      return;
    }

    if (!response.success) {
      console.error('Error in getUser action');
      return Promise.reject();
    }

    dispatch(setUserData(response.user));
    dispatch(setUserAuthorization());
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updatedData, { dispatch }) => {
    const response = await request('/auth/user', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.success && response.message === 'jwt malformed') {
      if (!isRefreshing) {
        isRefreshing = true;

        const updateResponse = await dispatch(updateToken());

        if (updateResponse.meta.requestStatus === 'fulfilled') {
          console.log('Token success updated.');
          isRefreshing = false;
          return dispatch(getUser());
        } else {
          console.error('Error in token update');
          isRefreshing = false;
          return Promise.reject();
        }
      }
      return;
    }

    if (!response.success) {
      console.error('Error in updateUser action');
      return Promise.reject();
    }

    dispatch(setUserData(response.user));
  }
);
