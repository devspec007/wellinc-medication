import type { Metadata } from "next";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export const metadata: Metadata = {
  title: "Not Qualified Female | Wellinc",
  description: "You are not qualified for female based medication recommendations on Wellinc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={0} // Set the correct index for 'Not Qualified Female' step
      backHref="/intake/pregnancy"
    >
      {children}
    </IntakeLayout>
  );
}
