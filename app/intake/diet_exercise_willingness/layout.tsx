import type { Metadata } from "next";
import DietExerciseWillingnessLayoutClient from "./DietExerciseWillingnessLayoutClient";

export const metadata: Metadata = {
  title: "Diet and Exercise Willingness | Wellinc",
  description: "Let us know about your diet and exercise willingness.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DietExerciseWillingnessLayoutClient>{children}</DietExerciseWillingnessLayoutClient>;
}
