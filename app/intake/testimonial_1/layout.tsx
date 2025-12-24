import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Testimonial 1 | Wellinc",
  description: "Let us know you Wellinc's testimonial 1.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={1} // Set the correct index for 'Testimonial 1' step
      backHref="/intake/magic"
    >
      {children}
    </IntakeLayout>
  );
}

