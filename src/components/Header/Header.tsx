import { Link } from 'react-router-dom';
import CartLink from './components/CartLink/CartLink';
import styles from './Header.module.css';

const Header = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <nav>
          <Link className={styles.navLink} to='/'>
            Home
          </Link>
          <Link className={styles.navLink} to='/products'>
            Products
          </Link>
          <CartLink />
        </nav>
      </header>
    </div>
  );
};

export default Header;
