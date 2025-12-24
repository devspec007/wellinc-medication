import type { Metadata } from "next";

import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Verify OTP | Wellinc",
  description: "Enter the one-time password sent to your email.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={4} // Make sure this matches the OTP step's index in your steps
      backHref="/intake/contact"
    >
      {children}
    </IntakeLayout>
  );
}
