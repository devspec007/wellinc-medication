import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Speed | Wellinc",
  description: "Let us know you about the speed of medication effectiveness.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Speed' step
      backHref="/intake/why"
    >
      {children}
    </IntakeLayout>
  );
}

