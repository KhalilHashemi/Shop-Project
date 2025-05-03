import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

import { shortenText } from "@/src/utils/helpers";
import { useProductsStore } from "../stores/productsStore";
import { motion } from "motion/react";

function Card({ data , index }: any) {
  const { id, title, image, price } = data;
  const { selectedProducts, setSelectedProducts,setSearchedProducts } = useProductsStore();

  const selectedProduct = selectedProducts.find((product: any) => product.id === id);
  const count = selectedProduct?.count || 0;

  const handleRemoveProduct = () => {
    const newSelectedProducts = selectedProducts.filter(
      (product: any) => product.id !== id
    );  
    setSelectedProducts(newSelectedProducts);
  };

  const handleDecrementProduct = () => {
    const selectedProduct = selectedProducts.find((product: any) => product.id === id);
    if (selectedProduct) {
      if (selectedProduct.count === 1) {
        handleRemoveProduct();
      } else {
        setSelectedProducts(
          selectedProducts.map((product: any) =>
            product.id === id ? { ...product, count: product.count - 1 } : product
          )
        );
      }
    }
  };

  const handleAddProduct = () => {
    if (selectedProducts.some((product: any) => product.id === id)) {
      setSelectedProducts(
        selectedProducts.map((product: any) =>
          product.id === id ? { ...product, count: product.count + 1 } : product
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { id, item: data, count: 1 }]);
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 , delay: index * 0.1 }}
    className="flex flex-col w-[200px] xs:w-[220px] sm:w-[240px] md:w-[260px] lg:w-[270px] items-start justify-end bg-white border-2 border-dashed border-[#03346e] rounded-3xl px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 mb-8 xs:mb-10 sm:mb-12 mx-2 xs:mx-3 sm:mx-4 md:mx-5 lg:mx-6">
      <img
        src={image}
        alt={title}
        className="w-[150px] h-[150px] xs:w-[170px] xs:h-[170px] sm:w-[180px] sm:h-[180px] md:w-[190px] md:h-[190px] lg:w-[200px] lg:h-[200px] object-contain mb-4 xs:mb-5 sm:mb-6"
      />
      <h3 className="text-[#03346e] font-bold mb-1.5 xs:mb-1.75 sm:mb-2 text-[0.8rem] xs:text-[0.85rem] sm:text-[0.9rem] md:text-[0.95rem] lg:text-base">{shortenText(title)}</h3>
      <p className="text-[#021526] mb-3 xs:mb-3.5 sm:mb-4 text-[0.8rem] xs:text-[0.85rem] sm:text-[0.9rem] md:text-[0.95rem] lg:text-base">{price} $</p>
      <div className="flex justify-between items-center w-full">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          href={`/products/${id}`}
        >
          <TbListDetails className="text-[#03346e] text-lg xs:text-xl cursor-pointer transition-50ms linear transform" />
        </motion.a>
        <div className="flex items-center gap-2 xs:gap-1 sm:gap-2.5">
          {count === 1 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleRemoveProduct}
              className="text-[#03346e] flex items-center justify-center bg-[#03346e] text-white text-lg xs:text-xl rounded-xl p-0.5 xs:p-0.75 sm:p-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3"
            >
              <MdDeleteOutline className="text-lg xs:text-xl cursor-pointer transition-50ms linear transform" />
            </motion.button>
          )}
          {count > 1 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleDecrementProduct}
              className="bg-[#03346e] flex items-center justify-center text-white text-lg xs:text-xl rounded-xl p-0.5 xs:p-0.75 sm:p-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3"
            >
              -
            </motion.button>
          )}
          {!!count && <span className="text-sm xs:text-base">{count}</span>}
          {count === 0 ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleAddProduct}
            >
              <TbShoppingBagCheck className="text-[#03346e] bg-[#03346e] text-white rounded-xl p-0.5 xs:p-0.75 sm:p-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleAddProduct}
              className="bg-[#03346e] flex items-center justify-center text-white text-lg xs:text-xl rounded-xl p-0.5 xs:p-0.75 sm:p-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3"
            >
              +
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
