import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "More Health Conditions | Wellinc",
  description: "Let us know your health conditions in more detail.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'More Health Conditions' step
      backHref="/intake/health_conditions"
    >
      {children}
    </IntakeLayout>
  );
}
