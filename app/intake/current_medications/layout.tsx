import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Current Medications | Wellinc",
  description: "Let us know about your current medications.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Current Medications' step
      backHref="/intake/medication_match"
    >
      {children}
    </IntakeLayout>
  );
}

