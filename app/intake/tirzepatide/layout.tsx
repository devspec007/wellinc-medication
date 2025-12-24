import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Tirzepatide | Wellinc",
  description: "Let us know if you are currently taking Tirzepatide (Mounjaro or Zepbound).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Tirzepatide' step
      backHref="/intake/weight_loss_medications"
    >
      {children}
    </IntakeLayout>
  );
}

