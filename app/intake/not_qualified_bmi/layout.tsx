import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Not Qualified BMI | Wellinc",
  description: "You are not qualified for BMI based medication recommendations on Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={0} // Set the correct index for 'Not Qualified BMI' step
      backHref="/intake/height_weight"
    >
      {children}
    </IntakeLayout>
  );
}
