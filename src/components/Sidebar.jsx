import { FaListUl } from "react-icons/fa";

import { createQueryObject } from "../helpers/helper";

import styles from "./Sidebar.module.css";
import { categories } from "../constants/list";

function Sidebar({ query, setQuery }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <aside className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((item) => (
          <li
            className={
              item.type.toLowerCase() === query.category
                ? styles.selected
                : null
            }
            key={item.id}
          >
            {item.type}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
