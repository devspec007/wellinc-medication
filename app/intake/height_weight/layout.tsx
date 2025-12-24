import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Height & Weight | Wellinc",
  description: "Enter your height and weight for tailored health recommendations on Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={0} // Set the correct index for 'Height & Weight' step
      backHref="/"
    >
      {children}
    </IntakeLayout>
  );
}
