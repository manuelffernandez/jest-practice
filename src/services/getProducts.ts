import { type Product } from '@/interfaces/products';

export async function getProducts(): Promise<Product[]> {
  const results = await fetch('/products.json');
  const products = await results.json();
  return products;
}
