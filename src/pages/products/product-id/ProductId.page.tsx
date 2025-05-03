import { SiOpenproject } from "react-icons/si";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

import Loader from "@/src/components/common/Loading";
import { useTitle } from "@/src/utils/helpers";
import { useParams, useRouter } from "next/navigation";
import api from "@/src/configs/api";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function ProductIdPage() {
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useParams();
  const id = searchParams?.["product-id"] ?? "5";
  const router = useRouter();

  useTitle("Details Product");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response: Product = await api.get(`/products/${id}`);
        setProductDetails(response);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex min-[320px]:flex-col lg:flex-row justify-center items-center lg:items-start min-[320px]:px-4 lg:px-0 gap-4 xs:gap-6 sm:gap-8">
      <motion.img
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        src={productDetails?.image}
        alt={productDetails?.title}
        className="min-[320px]:w-[150px] xs:w-[200px] sm:w-[250px] md:w-[275px] lg:w-[300px] p-2 xs:p-3 sm:p-4 md:p-5 bg-white border-2 border-dashed border-[#03346e] rounded-2xl xs:rounded-3xl sm:rounded-4xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="min-[320px]:w-full lg:w-[50%] border-2 border-dashed border-[#03346e] rounded-2xl xs:rounded-3xl sm:rounded-4xl p-3 xs:p-4 sm:p-5 md:p-6"
      >
        <h3 className="text-[#021526] text-base xs:text-lg sm:text-xl md:text-2xl mb-4 xs:mb-5 sm:mb-6 md:mb-8">
          {productDetails?.title}
        </h3>
        <p className="text-[#03346e] text-sm xs:text-base sm:text-lg md:text-xl min-[320px]:w-full lg:w-[500px] mb-4 xs:mb-5 sm:mb-6 md:mb-8">
          {productDetails?.description}
        </p>
        <p className="flex items-center gap-2 text-sm xs:text-base sm:text-lg">
          <SiOpenproject />
          {productDetails?.category}
        </p>
        <div className="flex justify-between items-center mt-4 xs:mt-5 sm:mt-6">
          <span className="flex items-center gap-2 text-sm xs:text-base sm:text-lg">
            <IoMdPricetag />
            {productDetails?.price} $
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 bg-[#03346e] text-white text-xs xs:text-sm sm:text-base px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 rounded-xl cursor-pointer"
          >
            <FaArrowLeft />
            <span>Back To Shop</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductIdPage;
