import cartReducer from '@/redux/states/cartSlice/cartSlice';
import productsReducer from '@/redux/states/productsSlice/productsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
