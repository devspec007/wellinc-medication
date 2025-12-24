import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Pregnancy | Wellinc",
  description: "Let us know if you are pregnant.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={1} // Set the correct index for 'Pregnancy' step
      backHref="/intake/gender_age"
    >
      {children}
    </IntakeLayout>
  );
}

