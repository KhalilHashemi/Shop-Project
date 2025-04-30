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
    className="w-[30%] flex flex-col gap-4 bg-white border-2 border-dashed border-[#03346e] rounded-3xl p-6">
      <div className="flex items-center gap-2">
        <TbChecklist className="text-[#03346e] text-xl" />
        <p>Total : </p>
        <span>{total.toFixed(2)} $</span>
      </div>
      <div className="flex items-center gap-2">
        <FaHashtag className="text-[#03346e] text-xl" />
        <p>Quantity : </p>
        <span>{quantity}</span>
      </div>
      <div className="flex items-center gap-2">
        <BsPatchCheck className="text-[#03346e] text-xl" />
        <p>Status : </p>
        <span>Pending...</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-[#03346e] text-white rounded-xl py-2 px-4 cursor-pointer"
        onClick={() => setSelectedProducts([])}
      >
        Checkout
      </motion.button>
    </motion.div>
  );
}

export default BasketSidebar;
