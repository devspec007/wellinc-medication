import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Weight Loss Programs | Wellinc",
  description: "Let us know about your weight loss programs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Weight Loss Programs' step
      backHref="/intake/weight_loss_surgeries"
    >
      {children}
    </IntakeLayout>
  );
}

