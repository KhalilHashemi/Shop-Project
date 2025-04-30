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
    className="flex flex-col w-[270px] items-start justify-end bg-white border-2 border-dashed border-[#03346e] rounded-3xl px-6 py-3 mb-12">
      <img
        src={image}
        alt={title}
        className="w-[200px] h-[200px] object-contain mb-6"
      />
      <h3 className="text-[#03346e] font-bold mb-2">{shortenText(title)}</h3>
      <p className="text-[#021526] mb-4">{price} $</p>
      <div className="flex justify-between items-center w-full">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          href={`/products/${id}`}
        >
          <TbListDetails className="text-[#03346e] text-xl cursor-pointer transition-50ms linear transform" />
        </motion.a>
        <div className="flex items-center gap-3">
          {count === 1 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleRemoveProduct}
              className="text-[#03346e] flex items-center justify-center bg-[#03346e] text-white text-xl rounded-xl p-1 w-8 h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3"
            >
              <MdDeleteOutline className="text-xl cursor-pointer transition-50ms linear transform" />
            </motion.button>
          )}
          {count > 1 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleDecrementProduct}
              className="bg-[#03346e] flex items-center justify-center text-white text-xl rounded-xl p-1 w-8 h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3"
            >
              -
            </motion.button>
          )}
          {!!count && <span>{count}</span>}
          {count === 0 ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleAddProduct}
            >
              <TbShoppingBagCheck className="text-[#03346e] bg-[#03346e] text-white rounded-xl p-1 w-8 h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={handleAddProduct}
              className="bg-[#03346e] flex items-center justify-center text-white text-xl rounded-xl p-1 w-8 h-8 cursor-pointer transition-50ms linear transform hover:scale-1.3"
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
