import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  checkoutCart,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from '@/redux/states/cartSlice/cartSlice';
import classNames from 'classnames';
import type { ChangeEvent, FormEvent } from 'react';
import styles from './Cart.module.css';

const Cart = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const items = useAppSelector(state => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector(state => state.cart.checkoutState);
  const errorMessage = useAppSelector(state => state.cart.errorMessage);

  const handleQtyChange = (
    evt: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    const qty = Number(evt.target.value) ?? 0;
    dispatch(updateQuantity({ id, qty }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    void dispatch(checkoutCart());
  };

  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === 'ERROR',
    [styles.checkoutLoading]: checkoutState === 'LOADING',
  });

  return (
    <main className='page'>
      <h1>Shopping Cart</h1>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id, qty]) => (
            <tr key={id}>
              <td>{products[id].name}</td>
              <td>
                <input
                  type='number'
                  min={1}
                  className={styles.input}
                  defaultValue={qty}
                  onChange={evt => {
                    handleQtyChange(evt, id);
                  }}
                />
              </td>
              <td>${products[id].price}</td>
              <td>
                <button
                  onClick={() => dispatch(removeFromCart(id))}
                  aria-label={`Remove ${products[id].name} from Shopping Cart`}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={handleSubmit}>
        {checkoutState === 'ERROR' && errorMessage !== '' ? (
          <p className={styles.errorBox}>{errorMessage}</p>
        ) : null}
        <button className={styles.button} type='submit'>
          Checkout
        </button>
      </form>
    </main>
  );
};

export default Cart;
