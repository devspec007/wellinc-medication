import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Contact Information | Wellinc",
  description: "Enter your contact details for Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={4}
      backHref="/intake/medical_review"
    >
      {children}
    </IntakeLayout>
  );
}
