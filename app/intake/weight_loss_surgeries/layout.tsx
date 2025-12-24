import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Weight Loss Surgeries | Wellinc",
  description: "Let us know if you have had any weight loss surgeries.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Weight Loss Surgeries' step
      backHref="/intake/pain_medications"
    >
      {children}
    </IntakeLayout>
  );
}

