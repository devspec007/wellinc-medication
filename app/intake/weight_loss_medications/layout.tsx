import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Weight Loss Medications | Wellinc",
  description: "Let us know if you are currently taking any weight loss medications.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Weight Loss Medications Details' step
      backHref="/intake/more_health_conditions"
    >
      {children}
    </IntakeLayout>
  );
}

