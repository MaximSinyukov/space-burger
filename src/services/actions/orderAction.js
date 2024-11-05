import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOrderNumber } from 'services/reducers/order';
import { request } from 'utils/methods/request';
import { getCookie } from 'utils/methods/cookieMethods';
import { updateToken } from './userActions';


let isRefreshing = false;

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async ({ buns, otherIngredients }, { dispatch }) => {
    const response = await request('/orders', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify({
        ingredients: [buns?._id, ...otherIngredients.map((item) => item._id), buns?._id].filter((item) => item),
      }),
    });

    if (!response.success && response.message === 'jwt malformed') {
      if (!isRefreshing) {
        isRefreshing = true;

        const updateResponse = await dispatch(updateToken());

        if (updateResponse.meta.requestStatus === 'fulfilled') {
          console.log('Token success updated.');
          isRefreshing = false;
          return dispatch(postOrder({ buns, otherIngredients }));
        } else {
          console.error('Error in token update');
          isRefreshing = false;
          return;
        }
      }
      return;
    }

    if (!response.success) {
      console.error('Error in postOrder action');
    }

    dispatch(setOrderNumber(response.order.number));
  }
);
