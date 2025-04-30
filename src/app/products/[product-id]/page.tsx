"use client";
import dynamic from "next/dynamic";

const ProductIdPage = dynamic(
  () => import("@/src/pages/products/product-id/ProductId.page"),
  {
    ssr: false,
  }
);

export default function ProductPage() {
  return (
    <div className="w-full h-[79.6vh] flex flex-col items-center">
      <ProductIdPage />
    </div>
  );
}
