import { type Product } from '@/interfaces/products';
import { createSlice } from '@reduxjs/toolkit';

export interface ProductsState {
  products: Record<string, Product>;
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
