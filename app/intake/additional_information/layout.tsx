import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Additional Information | Wellinc",
  description: "Let us know about your additional information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Additional Information' step
      backHref="/intake/motivated"
    >
      {children}
    </IntakeLayout>
  );
}

