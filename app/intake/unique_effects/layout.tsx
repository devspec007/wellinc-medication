import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Unique Effects | Wellinc",
  description: "Let us know any unique effects for personalized care at Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={1} // Set the correct index for 'Unique Effects' step
      backHref="/intake/gender_age"
    >
      {children}
    </IntakeLayout>
  );
}

