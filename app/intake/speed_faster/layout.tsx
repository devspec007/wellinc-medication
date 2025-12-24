import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Speed Faster | Wellinc",
  description: "Not a problem, we can move faster.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Speed Faster' step
      backHref="/intake/speed"
    >
      {children}
    </IntakeLayout>
  );
}

