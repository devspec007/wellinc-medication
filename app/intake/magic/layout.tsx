import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Magic | Wellinc",
  description: "Let us know you Wellinc's magic.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={1} // Set the correct index for 'Magic' step
      backHref="/intake/priorities"
    >
      {children}
    </IntakeLayout>
  );
}

