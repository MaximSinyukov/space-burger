import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIngredients } from 'services/reducers/ingredients';
import { request } from 'utils/methods/request';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (arg, { dispatch }) => {
    const response = await request('/ingredients');

    if (!response.success) {
      console.error('Error in getIngredients action');
    }

    dispatch(setIngredients(response.data));
  }
);
