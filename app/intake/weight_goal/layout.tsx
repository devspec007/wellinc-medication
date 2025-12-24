import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Weight Goal | Wellinc",
  description: "Set your weight goal for personalized planning with Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={0} // Set the correct index for 'Weight Goal' step
      backHref="/intake/height_weight"
    >
      {children}
    </IntakeLayout>
  );
}
