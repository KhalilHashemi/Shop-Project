"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTitle } from "../utils/helpers";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/products");
  }, []);

  useTitle("Home");
  return (
    <div className="w-full min-h-[79.6vh] flex justify-center items-center">
      <h1 className="text-[#03346e] text-2xl font-bold">
        در حال انتقال به صفحه محصولات...
      </h1>
    </div>
  );
}
