"use client";
import { useProductsStore } from "@/src/stores/productsStore";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export default function Header() {
  const { selectedProducts } = useProductsStore();
  const router = useRouter();
  return (
    <header className="w-full h-[8vh] bg-[#021526] flex justify-center items-center sticky top-0 mb-10 z-50">
      <div className="flex w-[65%] justify-between items-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl"
        >
          <button
            onClick={() => router.push("/products")}
            className="text-white hover:text-[#6eacda] transition-all duration-100 cursor-pointer"
          >
            Shop
          </button>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl relative cursor-pointer hover:scale-103 transition-all duration-100"
          onClick={() => router.push("/checkout")}
        >
          <PiShoppingCartSimpleBold className="text-2xl bg-white rounded-xl text-black p-2 w-10 h-10" />
          <span className="bg-[#6eacda] text-black text-sm rounded-full w-6 h-6 flex items-center justify-center absolute -top-2 -right-2">
            {selectedProducts.reduce((acc, product) => acc + product.count, 0)}
          </span>
        </motion.button>
      </div>
    </header>
  );
}
