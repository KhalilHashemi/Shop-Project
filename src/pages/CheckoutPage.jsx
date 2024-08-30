import BasketCard from "../components/BasketCard";
import BasketSidebar from "../components/BasketSidebar";
import { useCart } from "../context/CartContext";
import { FaArrowLeft } from "react-icons/fa";

import svg from "../public/EmptyBasket.svg";
import styles from "./CheckoutPage.module.css";
import { Link } from "react-router-dom";
import { useTitle } from "../helpers/helper";

function CheckoutPage() {
  const [state, dispatch] = useCart();
  useTitle("Checkout");

  const clickHandler = (type, payload) => {
    dispatch({ type, payload });
  };

  if (!state.itemsCounter) {
    return (
      <div
        className={styles.container}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div>
          <h1>Your Basket Is Empty</h1>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back To Shop</span>
          </Link>
        </div>
        <img src={svg} alt="Basket" className={styles.basketImage} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BasketSidebar state={state} clickHandler={clickHandler} />
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard
            key={product.id}
            data={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
