"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="title mb-8">Payment successful!</div>
      <div className="subtitle mb-8">Thank you for your payment. Your order has been received.</div>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="w-full max-w-xs cursor-pointer bg-brand-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Go to Homepage
      </button>
    </div>
  );
}

