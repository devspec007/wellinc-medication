import type { Metadata } from "next";
import DisqualifierLayoutWrapper from "./DisqualifierLayoutWrapper";

export const metadata: Metadata = {
  title: "Disqualifying Health Conditions | Wellinc",
  description: "You are not qualified for GLP-1 Medications",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DisqualifierLayoutWrapper>
      {children}
    </DisqualifierLayoutWrapper>
  );
}
