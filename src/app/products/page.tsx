"use client";

import dynamic from "next/dynamic";

const ProductsPage = dynamic(
  () => import("@/src/pages/products/Products.page"),
  {
    ssr: false,
  }
);

export default function Products() {
  return (
    <div className="w-full min-h-[79.6vh] flex flex-col items-center">
      <ProductsPage />
    </div>
  );
}
