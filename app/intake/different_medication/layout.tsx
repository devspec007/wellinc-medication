import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Different Medication | Wellinc",
  description: "Let us know if you are currently taking different medication.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Different Medication' step
      backHref="/intake/weight_loss_medications"
    >
      {children}
    </IntakeLayout>
  );
}

