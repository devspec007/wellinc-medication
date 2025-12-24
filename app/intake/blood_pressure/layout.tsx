import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Blood Pressure | Wellinc",
  description: "Let us know about your blood pressure.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Blood Pressure' step
      backHref="/intake/testimonial_3"
    >
      {children}
    </IntakeLayout>
  );
}

