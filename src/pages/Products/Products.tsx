import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/states/cartSlice';
import { addProducts } from '@/redux/states/productsSlice';
import { getProducts } from '@/services/getProducts';
import { useEffect } from 'react';
import styles from './Products.module.css';

const Products = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void getProducts().then(products => {
      dispatch(addProducts(products));
    });
  }, []);

  const products = useAppSelector(state => state.products.products);

  return (
    <main className='page'>
      <ul className={styles.products}>
        {Object.values(products).map(product => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={() => dispatch(addToCart(product.id))}>
                  Add to Cart 🛒
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Products;
