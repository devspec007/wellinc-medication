"use client";

import { useEffect, useState } from "react";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export default function DietExerciseWillingnessLayoutClient({ children }: { children: React.ReactNode }) {
  const [weightLossMedications, setWeightLossMedications] = useState<string>("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("weight_loss_medications") || "{}");
    setWeightLossMedications(data.weight_loss_medications || "");
  }, []);

  const backHref = weightLossMedications === "glp_1_medication" ? "/intake/glp_1_medication" : weightLossMedications === "different_medication" ? "/intake/different_medication" : "/intake/weight_loss_medications";
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
