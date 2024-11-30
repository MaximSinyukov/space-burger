import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setUserAuthorization,
  setUserData,
  setUserUnuthorization,
  removeUserData,
} from "src/services/reducers/user";

import { request } from "utils/methods/request";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from "utils/methods/cookieMethods";
import { prepareBearerToken } from "utils/methods/prepareBearerToken";

type TResUpdateToken = {
  accessToken: string;
  refreshToken: string;
};

type TResUserBio = {
  user: {
    name: string;
    email: string;
  };
};

type TResUserRequest = TResUpdateToken & TResUserBio;

type TRegisterUserAction = {
  email: string;
  password: string;
  name: string;
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (newUser: TRegisterUserAction, { dispatch }) => {
    await request<TResUserRequest>("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        dispatch(setUserAuthorization());
        dispatch(setUserData(res.user));

        setCookie("token", prepareBearerToken(res.accessToken), {
          expires: 1200,
          path: "/",
        });
        setCookie("refresh", res.refreshToken);

        return Promise.resolve();
      })
      .catch((res) => {
        console.error(`Ошибка в registerUser: ${res}`);

        return Promise.reject();
      });
  }
);

type TLoginUserAction = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: TLoginUserAction, { dispatch }) => {
    await request<TResUserRequest>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        dispatch(setUserAuthorization());
        dispatch(setUserData(res.user));

        setCookie("token", prepareBearerToken(res.accessToken), {
          expires: 1200,
          path: "/",
        });
        setCookie("refresh", res.refreshToken);

        return Promise.resolve();
      })
      .catch((res) => {
        console.error(`Ошибка в loginUser: ${res}`);

        return Promise.reject();
      });
  }
);

export const exitUser = createAsyncThunk(
  "user/exitUser",
  async (arg, { dispatch }) => {
    await request("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("refresh"),
      }),
    })
      .then(() => {
        dispatch(setUserUnuthorization());
        dispatch(removeUserData());

        deleteCookie("token");
        deleteCookie("refresh");

        return Promise.resolve();
      })
      .catch((res) => {
        console.error(`Ошибка в exitUser: ${res}`);

        return Promise.reject();
      });
  }
);

export const updateToken = createAsyncThunk("user/updateToken", async () => {
  await request<TResUpdateToken>("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refresh"),
    }),
  })
    .then((res) => {
      setCookie("token", prepareBearerToken(res.accessToken), {
        expires: 1200,
        path: "/",
      });
      setCookie("refresh", res.refreshToken);

      return Promise.resolve();
    })
    .catch((res) => {
      console.error(`Ошибка в updateToken: ${res}`);

      return Promise.reject();
    });
});

let isRefreshing = false;

export const getUser = createAsyncThunk(
  "user/getUser",
  async (arg, { dispatch }) => {
    await request<TResUserBio>("/auth/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((res) => {
        dispatch(setUserData(res.user));
        dispatch(setUserAuthorization());

        return Promise.resolve();
      })
      .catch(async (res) => {
        if (res.message === "jwt expired" || res.message === "jwt malformed") {
          if (!isRefreshing) {
            isRefreshing = true;

            const updateResponse = await dispatch(updateToken());
            console.warn("check update", updateResponse);

            if (updateResponse.meta.requestStatus === "fulfilled") {
              console.log("Token success updated in getUser.");
              isRefreshing = false;
              return dispatch(getUser());
            } else {
              isRefreshing = false;
              console.error("Error in token update for getUser");
              return Promise.reject();
            }
          }
          return;
        }

        console.error(`Ошибка в getUser: ${res}`);

        return Promise.reject();
      });
  }
);

type TUserUpdateData = {
  name?: string;
  email?: string;
  password?: string;
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedData: TUserUpdateData, { dispatch }) => {
    await request<TResUserBio>("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        dispatch(setUserData(res.user));

        return Promise.resolve();
      })
      .catch(async (res) => {
        if (res.message === "jwt expired" || res.message === "jwt malformed") {
          if (!isRefreshing) {
            isRefreshing = true;

            const updateResponse = await dispatch(updateToken());

            if (updateResponse.meta.requestStatus === "fulfilled") {
              console.log("Token success updated.");
              isRefreshing = false;
              return dispatch(getUser());
            } else {
              console.error("Error in token update");
              isRefreshing = false;
              return Promise.reject();
            }
          }
          return;
        }

        console.error(`Ошибка в updateUser: ${res}`);

        return Promise.reject();
      });
  }
);
