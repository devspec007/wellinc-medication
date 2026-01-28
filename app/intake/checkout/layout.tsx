// This layout is for the "Checkout" step of the intake flow.

"use client";

import { usePathname } from "next/navigation";
import CheckoutLayout from "@/components/CheckoutLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide back button on success page, show on checkout page
  const isShowBackButton = pathname !== "/intake/checkout/success";
  
  return (
    <CheckoutLayout isShowBackButton={isShowBackButton} className="shadow-sm">
      {children}
    </CheckoutLayout>
  );
}
