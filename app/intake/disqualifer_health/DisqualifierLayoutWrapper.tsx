"use client";

import { useEffect, useState } from "react";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export default function DisqualifierLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [backHref, setBackHref] = useState("/intake/testimonial_2");

  useEffect(() => {
    // Read backHref from localStorage (set by page component)
    const storedBackHref = localStorage.getItem("disqualifer_health_backHref");
    if (storedBackHref) {
      setBackHref(storedBackHref);
    }
  }, []);

  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Disqualifying Health Conditions' step
      backHref={backHref}
    >
      {children}
    </IntakeLayout>
  );
}

