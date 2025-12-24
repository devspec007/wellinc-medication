import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Recent Weight Changes | Wellinc",
  description: "Let us know about your recent weight changes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Recent Weight Changes' step
      backHref="/intake/diet_exercise_willingness"
    >
      {children}
    </IntakeLayout>
  );
}

