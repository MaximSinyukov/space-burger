import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIngredients } from 'services/reducers/ingredients';
import { request } from 'utils/methods/request';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (arg, { dispatch }) => {
    await request('/ingredients')
      .then((res) => {
        dispatch(setIngredients(res.data));

        return Promise.resolve();
      })
      .catch((res) => {
        console.error(`Ошибка в getIngredients: ${res}`)

        return Promise.reject();
      });
  }
);
