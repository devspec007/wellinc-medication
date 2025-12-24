import type { Metadata } from "next";
import PainMedicationLayoutClient from "./PainMedicationLayoutClient";

export const metadata: Metadata = {
  title: "Pain Medication | Wellinc",
  description: "Let us know if you are currently taking any pain medications.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PainMedicationLayoutClient>{children}</PainMedicationLayoutClient>;
}
