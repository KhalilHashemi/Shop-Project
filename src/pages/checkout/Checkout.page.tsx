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
      <div className="flex items-center justify-center min-[320px]:flex-col lg:flex-row min-[320px]:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 xs:gap-6 sm:gap-8"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">Your Basket Is Empty</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/products")}
            className="flex justify-center items-center gap-2 text-sm xs:text-base sm:text-lg md:text-xl bg-[#03346e] text-white px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-xl w-full cursor-pointer"
          >
            <FaArrowLeft />
            <span>Back To Shop</span>
          </motion.button>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-[200px] h-[200px] xs:w-[300px] xs:h-[300px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] min-[320px]:mt-8 lg:mt-0"
          src={"/EmptyBasket.svg"}
          alt="Basket"
        />
      </div>
    );
  }

  return (
    <div className="w-full xs:w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] flex min-[320px]:flex-col lg:flex-row justify-center items-start gap-4 xs:gap-5 sm:gap-6 min-[320px]:px-4 lg:px-0">
      <BasketSidebar selectedProducts={selectedProducts} />
      <div className="min-[320px]:w-full lg:w-9/12 flex flex-col gap-2 xs:gap-3 sm:gap-4 min-[320px]:mt-6 lg:mt-0">
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
