import type { Metadata } from "next";
import SleepLayoutClient from "./SleepLayoutClient";

export const metadata: Metadata = {
    title: "Sleep | Wellinc",
  description: "Let us know your sleep details for personalized care at Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SleepLayoutClient>{children}</SleepLayoutClient>;
}

