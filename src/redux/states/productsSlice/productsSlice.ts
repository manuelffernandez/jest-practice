import { type Product } from '@/interfaces/products';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ProductsState {
  products: Record<string, Product>;
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts(state, action: PayloadAction<Product[]>) {
      const newProductsState = { ...state.products };

      action.payload.forEach(product => {
        Object.defineProperty(newProductsState, product.id, {
          value: product,
          enumerable: true,
        });
      });

      return { products: newProductsState };
    },
  },
});

export const { addProducts } = productsSlice.actions;

export default productsSlice.reducer;
