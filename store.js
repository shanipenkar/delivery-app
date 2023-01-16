import { configureStore } from '@reduxjs/toolkit';
import basketReducer from "./features/basketSlice.js";
export default configureStore({
  reducer: {
    basket: basketReducer,
  }
});
