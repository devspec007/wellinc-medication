import type { Metadata } from "next";
import UniqueEffectsLayoutClient from "./UniqueEffectsLayoutClient";

export const metadata: Metadata = {
  title: "Unique Effects | Wellinc",
  description: "Let us know any unique effects for personalized care at Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UniqueEffectsLayoutClient>{children}</UniqueEffectsLayoutClient>;
}

