import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOrderNumber } from "services/reducers/order";
import { request } from "utils/methods/request";
import { getCookie } from "utils/methods/cookieMethods";
import { updateToken } from "./userActions";
import { TIngredient } from "src/utils/constants/types";

let isRefreshing = false;

type TOrderActionArgs = {
  buns: TIngredient;
  otherIngredients: TIngredient[];
};

type TResOrderRequest = {
  order: {
    number: number;
  };
};

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async ({ buns, otherIngredients }: TOrderActionArgs, { dispatch }) => {
    await request<TResOrderRequest>("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: [
          buns?._id,
          ...otherIngredients.map((item) => item._id),
          buns?._id,
        ].filter((item) => item),
      }),
    })
      .then((res) => {
        dispatch(setOrderNumber(res.order.number));

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
              return dispatch(postOrder({ buns, otherIngredients }));
            } else {
              console.error("Error in token update");
              isRefreshing = false;
              return;
            }
          }
          return;
        }

        console.error(`Ошибка в postOrder: ${res}`);

        return Promise.reject();
      });
  }
);
