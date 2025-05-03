import { TbChecklist } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa6";
import { BsPatchCheck } from "react-icons/bs";
import { motion } from "motion/react";
import { useProductsStore } from "@/src/stores/productsStore";

function BasketSidebar({ selectedProducts }: any) {
  const { setSelectedProducts } = useProductsStore();
  const total = selectedProducts.reduce((acc: number, product: any) => {
    return acc + (product.item.price * product.count);
  }, 0);

  const quantity = selectedProducts.reduce((acc: number, product: any) => {
    return acc + product.count;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-[320px]:w-full lg:w-3/12 flex flex-col gap-2 xs:gap-3 sm:gap-4 bg-white border-2 border-dashed border-[#03346e] rounded-3xl p-3 xs:p-4 sm:p-5 md:p-6"
    >
      <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
        <TbChecklist className="text-[#03346e] text-base xs:text-lg sm:text-xl" />
        <p className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base">Total : </p>
        <span className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base">{total.toFixed(2)} $</span>
      </div>
      <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
        <FaHashtag className="text-[#03346e] text-base xs:text-lg sm:text-xl" />
        <p className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base">Quantity : </p>
        <span className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base">{quantity}</span>
      </div>
      <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
        <BsPatchCheck className="text-[#03346e] text-base xs:text-lg sm:text-xl" />
        <p className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base">Status : </p>
        <span className="text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base">Pending...</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-[#03346e] text-white rounded-xl py-1.5 xs:py-2 sm:py-2.5 px-2 xs:px-3 sm:px-4 cursor-pointer text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-base mt-1 xs:mt-2 sm:mt-3"
        onClick={() => setSelectedProducts([])}
      >
        Checkout
      </motion.button>
    </motion.div>
  );
}

export default BasketSidebar;
