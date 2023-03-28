import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';

type CheckoutState = 'READY' | 'ERROR' | 'LOADING';

export interface CartState {
  items: Record<string, number>;
  checkoutState: CheckoutState;
}

const initialState: CartState = {
  items: {},
  checkoutState: 'READY',
};

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
    builder.addCase('cart/checkout/pending', (state, _) => {
      state.checkoutState = 'LOADING';
    });
    builder.addCase('cart/checkout/fulfilled', (state, _) => {
      state.checkoutState = 'READY';
    });
  },
});

export function checkout() {
  return (dispatch: AppDispatch) => {
    dispatch({ type: 'cart/checkout/pending' });
    setTimeout(() => {
      dispatch({ type: 'cart/checkout/fulfilled' });
    }, 500);
  };
}

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  items => {
    console.log('test');
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
