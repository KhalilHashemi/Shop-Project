import { MdDeleteOutline } from "react-icons/md";
import { shortenText } from "@/src/utils/helpers";
import { useProductsStore } from "../stores/productsStore";
import { motion } from "motion/react";

function BasketCard({ data, index }: any) {
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
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex min-[320px]:flex-col xs:flex-col sm:flex-row justify-between items-center border-2 border-dashed border-[#03346e] rounded-xl p-2 xs:p-3 sm:p-4 min-[320px]:mb-3 sm:mb-0"
    >
      <img 
        src={image} 
        alt={title} 
        className="min-[320px]:w-16 min-[320px]:h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 object-contain min-[320px]:mb-2 xs:mb-3 sm:mb-0" 
      />
      <p className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base min-[320px]:mb-2 xs:mb-3 sm:mb-0 text-center sm:text-left w-full sm:w-1/3">
        {shortenText(title)}
      </p>
      <p className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base font-semibold min-[320px]:mb-2 xs:mb-3 sm:mb-0">
        {totalPrice.toFixed(2)} $
      </p>
      <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3">
        {initialCount === 1 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleRemoveProduct}
            className="bg-[#03346e] flex items-center justify-center text-white text-base xs:text-lg sm:text-xl rounded-xl p-0.5 xs:p-0.75 sm:p-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 cursor-pointer"
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
            className="bg-[#03346e] flex items-center justify-center text-white text-base xs:text-lg sm:text-xl rounded-xl p-0.5 xs:p-0.75 sm:p-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 cursor-pointer"
          >
            -
          </motion.button>
        )}
        <span className="text-sm xs:text-base sm:text-lg">{initialCount}</span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={handleIncrease}
          className="bg-[#03346e] flex items-center justify-center text-white text-base xs:text-lg sm:text-xl rounded-xl p-0.5 xs:p-0.75 sm:p-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 cursor-pointer"
        >
          +
        </motion.button>
      </div>
    </motion.div>
  );
}

export default BasketCard;
