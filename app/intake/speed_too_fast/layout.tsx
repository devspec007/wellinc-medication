import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Speed Too Fast | Wellinc",
  description: "We'll move at your pace.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Speed Too Fast' step
      backHref="/intake/speed"
    >
      {children}
    </IntakeLayout>
  );
}

