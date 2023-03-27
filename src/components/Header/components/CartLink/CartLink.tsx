import { Link } from 'react-router-dom';
import styles from './CartLink.module.css';

const CartLink = (): JSX.Element => {
  return (
    <Link to='/cart' className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;Cart</span>
    </Link>
  );
};

export default CartLink;
