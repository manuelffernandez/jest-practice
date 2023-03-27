import { type Product } from '@/interfaces/products';
import { getProducts } from '@/services/getProducts';
import { useEffect, useState } from 'react';
import styles from './Products.module.css';

const Products = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    void getProducts().then(products => {
      setProducts(products);
    });
  }, []);

  return (
    <main className='page'>
      <ul className={styles.products}>
        {products.map(product => (
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
                <button>Add to Cart 🛒</button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Products;
