import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Sleep Hours | Wellinc",
  description: "Let us know how many hours you sleep per night.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Sleep Hours' step
      backHref="/intake/sleep"
    >
      {children}
    </IntakeLayout>
  );
}

