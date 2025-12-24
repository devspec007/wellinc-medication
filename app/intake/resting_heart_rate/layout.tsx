import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Resting Heart Rate | Wellinc",
  description: "Let us know about your resting heart rate.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Resting Heart Rate' step
      backHref="/intake/blood_pressure"
    >
      {children}
    </IntakeLayout>
  );
}

