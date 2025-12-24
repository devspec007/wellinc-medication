import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Health Conditions | Wellinc",
  description: "Let us know your health conditions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Health Conditions' step
      backHref="/intake/testimonial_2"
    >
      {children}
    </IntakeLayout>
  );
}
