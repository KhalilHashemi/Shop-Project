import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import svg from "../public/404.svg";
import styles from "./404.module.css";
function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <div>
        <h1>Page Not Found</h1>
        <Link to="/products">
          <FaArrowLeft />
          <span>Back To Shop</span>
        </Link>
      </div>
      <img src={svg} alt="" />
    </div>
  );
}

export default PageNotFound;
