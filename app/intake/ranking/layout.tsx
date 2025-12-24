import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Ranking | Wellinc",
  description: "Let us know you Wellinc's ranking.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={1} // Set the correct index for 'Ranking' step
      backHref="/intake/priorities"
    >
      {children}
    </IntakeLayout>
  );
}

