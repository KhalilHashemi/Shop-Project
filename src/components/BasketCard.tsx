import { MdDeleteOutline } from "react-icons/md";
import { shortenText } from "@/src/utils/helpers";
import { useProductsStore } from "../stores/productsStore";
import { motion } from "motion/react";

function BasketCard({ data , index}: any) {
  const { item, count: initialCount } = data;
  const { image, title, price, id } = item;
  const { selectedProducts, setSelectedProducts } = useProductsStore();

  const handleRemoveProduct = () => {
    const newSelectedProducts = selectedProducts.filter(
      (product: any) => product.id !== id
    );
    setSelectedProducts(newSelectedProducts);
  };

  const handleDecrease = () => {
    const selectedProduct = selectedProducts.find(
      (product: any) => product.id === id
    );
    if (selectedProduct) {
      if (selectedProduct.count === 1) {
        handleRemoveProduct();
      } else {
        setSelectedProducts(
          selectedProducts.map((product: any) =>
            product.id === id
              ? { ...product, count: product.count - 1 }
              : product
          )
        );
      }
    }
  };

  const handleIncrease = () => {
    setSelectedProducts(
      selectedProducts.map((product: any) =>
        product.id === id ? { ...product, count: product.count + 1 } : product
      )
    );
  };

  const totalPrice = price * initialCount;

  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 , delay: index * 0.1 }}
    className=" flex justify-between items-center border border-dashed border-[#03346e] rounded-xl p-4">
      <img src={image} alt={title} className="w-20 h-20 object-contain" />
      <p>{shortenText(title)}</p>
      <p>{totalPrice.toFixed(2)} $</p>
      <div className="flex items-center gap-3">
        {initialCount === 1 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleRemoveProduct}
            className="bg-[#03346e] flex items-center justify-center text-white text-xl rounded-xl p-1 w-8 h-8 cursor-pointer"
          >
            <MdDeleteOutline />
          </motion.button>
        )}

        {initialCount > 1 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleDecrease}
            className="bg-[#03346e] flex items-center justify-center text-white text-xl rounded-xl p-1 w-8 h-8 cursor-pointer"
          >
            -
          </motion.button>
        )}
        <span>{initialCount}</span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={handleIncrease}
          className="bg-[#03346e] flex items-center justify-center text-white text-xl rounded-xl p-1 w-8 h-8 cursor-pointer"
        >
          +
        </motion.button>
      </div>
    </motion.div>
  );
}

export default BasketCard;
