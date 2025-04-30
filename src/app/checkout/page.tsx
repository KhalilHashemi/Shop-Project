"use client";

import dynamic from "next/dynamic";

const Checkout = dynamic(() => import("@/src/pages/checkout/Checkout.page"), {
  ssr: false,
});

export default function CheckoutPage() {
  return (
    <div className="w-full min-h-[79.6vh] flex justify-center items-start">
      <Checkout />
    </div>
  );
}
