import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Previous Medication | Wellinc",
  description: "Let us know if you have taken any medication for weight loss in the past 4 weeks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Previous Medication' step
      backHref="/intake/weight_loss_medications"
    >
      {children}
    </IntakeLayout>
  );
}

