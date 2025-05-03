import { FaListUl } from "react-icons/fa";

import { createQueryObject } from "@/src/utils/helpers";

import { categories } from "@/src/constants/categories";
import { useProductsStore } from "../stores/productsStore";
import { motion } from "motion/react";

function Sidebar({ query, setQuery }: any) {
  const { products, setFilteredProducts, setSelectedCategory } =
    useProductsStore();

  const categoryHandler = (event: any) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;

    const newQuery = createQueryObject(query, { category });
    setQuery(newQuery);

    if (category === "all") {
      setFilteredProducts([]);
      return;
    }

    const filteredData = products.filter((p: any) => p.category === category);
    setFilteredProducts(filteredData);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[180px] xs:w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-fit p-4 xs:p-5 sm:p-6 bg-white border-2 border-dashed border-[#03346e] rounded-2xl min-[320px]:mb-6 min-[320px]:ml-3"
    >
      <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
        <FaListUl className="text-sm xs:text-base sm:text-lg" />
        <p className="text-[#021526] font-600 text-sm xs:text-base sm:text-lg">Categories</p>
      </div>
      <ul onClick={categoryHandler} className="mt-4 xs:mt-5 sm:mt-6">
        {categories.map((item: any, index) => (
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setSelectedCategory(item.type)}
            className={`
                text-[#03346e] text-xs xs:text-sm sm:text-base py-0.5 xs:py-0.75 sm:py-1 mb-0.5 xs:mb-0.75 sm:mb-1 list-none cursor-pointer transition-all duration-200 ease-in-out
                ${
                  item.type.toLowerCase() === query.category
                    ? "bg-[#021526] text-white rounded-xl px-1.5 xs:px-2 sm:px-3 pl-2 xs:pl-2.5 sm:pl-3"
                    : "hover:ml-1 hover:font-semibold"
                }`}
            key={index}
          >
            {item.type}
          </motion.li>
        ))}
      </ul>
    </motion.aside>
  );
}

export default Sidebar;
