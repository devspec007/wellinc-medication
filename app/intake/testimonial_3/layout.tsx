import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Testimonial 3 | Wellinc",
  description: "Let us know you Wellinc's testimonial 3.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Testimonial 3' step
      backHref="/intake/recent_weight_changes"
    >
      {children}
    </IntakeLayout>
  );
}

