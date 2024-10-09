import { createAction, createReducer } from '@reduxjs/toolkit';

const increment = createAction('counter/increment');
const decrement = createAction('counter/decrement');
const incrementByAmount = createAction('counter/incrementByAmount');

const initialState = { value: 0 };
// TODO: delete if useless / create for example
export const appTestReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++
    })
    .addCase(decrement, (state, action) => {
      state.value--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload
    })
});
