import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Medication Match | Wellinc",
  description: "Let us know about your medication match.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set correct step index for 'Medication Match'
      backHref="/intake/resting_heart_rate"
    >
      {children}
    </IntakeLayout>
  );
}
