import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import svg from "../public/404.svg";
import styles from "./404.module.css";

import { useTitle } from "../helpers/helper";
function PageNotFound() {
  useTitle("404");
  return (
    <div className={styles.notFound}>
      <div>
        <h1>Page Not Found</h1>
<<<<<<< HEAD
        <Link to="/products">
=======
        <Link to="/">
>>>>>>> e8b02bb (some unimportant changes)
          <FaArrowLeft />
          <span>Back To Shop</span>
        </Link>
      </div>
      <img src={svg} alt="Page Not Found" className={styles.image404} />
    </div>
  );
}

export default PageNotFound;
