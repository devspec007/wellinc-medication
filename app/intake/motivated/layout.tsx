import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Motivated | Wellinc",
  description: "Let us know if you are motivated to lose weight.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Motivated' step
      backHref="/intake/current_medications"
    >
      {children}
    </IntakeLayout>
  );
}

