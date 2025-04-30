"use client";

import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("@/src/pages/not-found/NotFound.page"), {
  ssr: false,
});
export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[79.6vh]">
      <NotFound />
    </div>
  );
}
