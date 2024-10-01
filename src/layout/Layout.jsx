import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";

import styles from "./Layout.module.css";

function Layout({ children }) {
  const [state] = useCart();

  return (
    <>
      <header className={styles.header}>
<<<<<<< HEAD
        <Link to="/products">Shop</Link>
=======
        <Link to="/">Shop</Link>
>>>>>>> e8b02bb (some unimportant changes)
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>
          Developed by{" "}
          <a href="https://github.com/KhalilHashemi" target="_blank">
            Khalil
          </a>
          <span>
            <FaHeart />
          </span>
        </p>
      </footer>
    </>
  );
}

export default Layout;
