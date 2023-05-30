import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from './slices/ordersSlice';
import productsSlice from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsSlice,
  },
});
