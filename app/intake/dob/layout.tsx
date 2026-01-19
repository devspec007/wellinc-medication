import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "DOB | Wellinc",
  description: "Let us know about your date of birth.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={4} // Set the correct index for 'DOB' step
      backHref="/intake/additional_information"
    >
      {children}
    </IntakeLayout>
  );
}

