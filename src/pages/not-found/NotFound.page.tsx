import { FaArrowLeft } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useTitle } from "@/src/utils/helpers";

function NotFound() {
  const router = useRouter();
  useTitle("Page Not Found");
  return (
    <div className="w-[60%] flex items-center justify-between gap-10">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center gap-8 w-2/4"
      >
        <h1 className="w-full text-6xl font-bold">Page Not Found</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.push("/products")}
          className="w-full flex items-center justify-center gap-2 text-xl font-bold bg-[#03346e] text-white rounded-xl py-3 px-4 cursor-pointer"
        >
          <FaArrowLeft />
          <span>Back To Shop</span>
        </motion.button>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        src={"/404.svg"}
        alt="Page Not Found"
        className="w-2/4"
      />
    </div>
  );
}

export default NotFound;
