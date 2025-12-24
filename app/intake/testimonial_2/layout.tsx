import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Testimonial 2 | Wellinc",
  description: "Let us know you Wellinc's testimonial 2.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Testimonial 2' step
      backHref="/intake/sleep_hours"
    >
      {children}
    </IntakeLayout>
  );
}

