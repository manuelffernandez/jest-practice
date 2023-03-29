import productReducer, { addProducts } from './productsSlice';
import products from '../../../../public/products.json';

describe('products reducer', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = productReducer(initialState, action);
    expect(result).toEqual({ products: {} });
  });

  it('should convert the products received to an object', () => {
    const initialState = undefined;
    const action = addProducts(products);
    const result = productReducer(initialState, action);
    expect(Object.keys(products).length).toEqual(products.length);
    products.forEach(product => {
      expect(result.products[product.id]).toEqual(product);
    });
  });
});
