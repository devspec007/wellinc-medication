// This layout is for the "Checkout" step of the intake flow.

import type { Metadata } from "next";
import CheckoutLayout from "@/components/CheckoutLayout";

export const metadata: Metadata = {
  title: "Checkout | Wellinc",
  description: "Review and complete your order for Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutLayout isShowBackButton={true} className="shadow-sm">
      {children}
    </CheckoutLayout>
  );
}
