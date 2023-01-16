import { configureStore } from '@reduxjs/toolkit';
import basketReducer from "./features/basketSlice.js";
import restaurantReducer from "./features/restaurantSlice.js";

export default configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  }
});
