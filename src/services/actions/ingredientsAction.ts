import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIngredients } from "services/reducers/ingredients";
import { request } from "utils/methods/request";

import { TIngredient } from "src/utils/constants/types";

type TResIngredientsRequest = {
  data: TIngredient[];
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (arg, { dispatch }) => {
    await request<TResIngredientsRequest>("/ingredients")
      .then((res) => {
        dispatch(setIngredients(res.data));

        return Promise.resolve();
      })
      .catch((res) => {
        console.error(`Ошибка в getIngredients: ${res}`);

        return Promise.reject();
      });
  }
);
