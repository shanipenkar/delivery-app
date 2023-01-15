import { createSlice } from '@reduxjs/toolkit';

export const basketSliceSlice = createSlice({
  name: 'basket',
  initialState: {
    items: []
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
  }
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;

export default basketSlice.reducer;