import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Diet and Exercise Willingness | Wellinc",
  description: "Let us know about your diet and exercise willingness.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Diet and Exercise Willingness' step
      backHref="/intake/weight_loss_programs"
    >
      {children}
    </IntakeLayout>
  );
}

