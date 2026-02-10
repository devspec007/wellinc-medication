"use client";

import { useEffect, useState } from "react";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export default function DietExerciseWillingnessLayoutClient({ children }: { children: React.ReactNode }) {
  const [hasPreviousMedication, setHasPreviousMedication] = useState<boolean>(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("previous_medication") || "{}");
    setHasPreviousMedication(!!data.currentWightLoss);
  }, []);

  const backHref = hasPreviousMedication ? "/intake/previous_medication" : "/intake/weight_loss_medications";
    return (
        <IntakeLayout
            steps={intakeSteps}
            activeStepIndex={2} // Set the correct index for 'Diet Exercise Willingness' step
            backHref={backHref}
        >
            {children}
        </IntakeLayout>
    );
}
