import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Priorities | Wellinc",
  description: "Let us know your priorities for personalized care at Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={1} // Set the correct index for 'Priorities' step
      backHref="/intake/unique_effects"
    >
      {children}
    </IntakeLayout>
  );
}

