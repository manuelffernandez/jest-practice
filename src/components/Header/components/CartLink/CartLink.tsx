import { Link } from 'react-router-dom';
import styles from './CartLink.module.css';
import { getMemoizedNumItems } from '@/redux/states/cartSlice/cartSlice';
import { useAppSelector } from '@/redux/hooks';

const CartLink = (): JSX.Element => {
  const numItems = useAppSelector(getMemoizedNumItems);

  return (
    <Link to='/cart' className={styles.link}>
      <span className={styles.text}>
        🛒&nbsp;&nbsp;{numItems !== 0 ? numItems : 'Cart'}
      </span>
    </Link>
  );
};

export default CartLink;
