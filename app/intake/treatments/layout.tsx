import type { Metadata } from "next";

import CheckoutLayout from "@/components/CheckoutLayout";

export const metadata: Metadata = {
  title: "Treatments | Wellinc",
  description: "Select the treatments you are interested in for Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutLayout>
      {children}
    </CheckoutLayout>
  );
}
