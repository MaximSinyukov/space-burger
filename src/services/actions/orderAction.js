import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOrderNumber } from 'services/reducers/order';
import { request } from 'utils/request';

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async ({ buns, otherIngredients }, { dispatch, rejectWithValue }) => {
    const response = await request('/orders', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [buns?._id, ...otherIngredients.map((item) => item._id), buns?._id].filter((item) => item),
      }),
    });

    if (!response.success) {
      console.error('Error in postOrder action');
    }

    dispatch(setOrderNumber(response.order.number));
  }
);
