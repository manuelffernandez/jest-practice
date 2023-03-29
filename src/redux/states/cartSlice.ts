import { checkout } from '@/services/checkout';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

type CheckoutState = 'READY' | 'ERROR' | 'LOADING';

export interface CartState {
  items: Record<string, number>;
  checkoutState: CheckoutState;
  errorMessage: string;
}

const initialState: CartState = {
  items: {},
  checkoutState: 'READY',
  errorMessage: '',
};

export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const items = state.cart.items;
    const response = await checkout(items);
    return response;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.items[id] !== undefined) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.items[id];
    },
    updateQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const { id, qty } = action.payload;
      state.items[id] = qty;
    },
  },
  extraReducers: function (builder) {
    builder.addCase(checkoutCart.pending, (state, _) => {
      state.checkoutState = 'LOADING';
    });
    builder.addCase(
      checkoutCart.fulfilled,
      (state, action: PayloadAction<{ success: boolean }>) => {
        const { success } = action.payload;
        if (success) {
          state.checkoutState = 'READY';
          state.items = {};
        } else {
          state.checkoutState = 'ERROR';
        }
      }
    );
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.checkoutState = 'ERROR';
      state.errorMessage = action.error.message ?? '';
    });
  },
});

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  items => {
    let numItems = 0;

    for (const id in items) {
      numItems += items[id];
    }

    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    let total = 0;

    for (const id in items) {
      total += products[id].price * items[id];
    }

    return total.toFixed(2);
  }
);

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
