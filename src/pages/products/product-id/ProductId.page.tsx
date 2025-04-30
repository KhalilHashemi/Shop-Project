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
    <div className="w-full flex justify-center items-start">
      <motion.img
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        src={productDetails?.image}
        alt={productDetails?.title}
        className="w-[300px] p-[15px_25px] bg-[#fff] border-[2px_dashed_#03346e] rounded-[50px] m-[10px_50px] border-2 border-dashed border-[#03346e]"
      />
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[50%] border-2 border-dashed border-[#03346e] rounded-[50px] p-[25px]"
      >
        <h3 className="text-[#021526] text-[1.5rem] mb-[40px]">
          {productDetails?.title}
        </h3>
        <p className="text-[#03346e] text-[1.1rem] w-[500px] mb-[40px]">
          {productDetails?.description}
        </p>
        <p className="flex items-center gap-2">
          <SiOpenproject />
          {productDetails?.category}
        </p>
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <IoMdPricetag />
            {productDetails?.price} $
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 bg-[#03346e] text-white px-2 py-2 rounded-2xl cursor-pointer"
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
