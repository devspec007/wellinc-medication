import type { Metadata } from "next";

import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Medical Review | Wellinc",
  description: "Provide your medical history for a tailored experience on Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={4} // Set the correct index for 'Medical Review' step
      backHref="/intake/weight_goal"
    >
      {children}
    </IntakeLayout>
  );
}
