import BasketCard from "@/src/components/BasketCard";
import BasketSidebar from "@/src/components/BasketSidebar";
import { FaArrowLeft } from "react-icons/fa";

import { useTitle } from "@/src/utils/helpers";
import { useProductsStore } from "@/src/stores/productsStore";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

function Checkout() {
  const router = useRouter();
  useTitle("Checkout");

  const { selectedProducts } = useProductsStore();

  if (!selectedProducts.length) {
    return (
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <h1 className="text-6xl font-bold">Your Basket Is Empty</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/products")}
            className="flex justify-center items-center gap-2 text-xl bg-[#03346e] text-white px-4 py-3 rounded-xl w-full cursor-pointer"
          >
            <FaArrowLeft />
            <span>Back To Shop</span>
          </motion.button>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-[500px] h-[500px]"
          src={"/EmptyBasket.svg"}
          alt="Basket"
        />
      </div>
    );
  }

  return (
    <div className="w-[65%] flex justify-center items-start gap-6">
      <BasketSidebar selectedProducts={selectedProducts} />
      <div className="w-9/12 flex flex-col gap-4">
        {selectedProducts.map((product: any, index: number) => (
          <BasketCard
            key={`${product.id}-${index}`}
            data={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Checkout;
