import type { Metadata } from "next";
import PrioritiesLayoutClient from "./PrioritiesLayoutClient";

export const metadata: Metadata = {
  title: "Priorities | Wellinc",
  description: "Let us know your priorities for personalized care at Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PrioritiesLayoutClient>{children}</PrioritiesLayoutClient>;
}
