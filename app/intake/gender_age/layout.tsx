import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Gender & Age | Wellinc",
  description: "Tell us about your gender and age for best health recommendations on Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={0} // Set correct step index for 'Gender & Age'
      backHref="/intake/weight_goal"
    >
      {children}
    </IntakeLayout>
  );
}
