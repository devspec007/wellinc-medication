// This layout is for the "SSN Verification" step of the intake flow.

"use client";

import CheckoutLayout from "@/components/CheckoutLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutLayout isShowBackButton={false} className="shadow-sm">
      {children}
    </CheckoutLayout>
  );
}

