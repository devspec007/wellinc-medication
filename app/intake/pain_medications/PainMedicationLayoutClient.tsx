"use client";

import { useEffect, useState } from "react";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export default function PainMedicationLayoutClient({ children }: { children: React.ReactNode }) {
  const [weightLossMedications, setWeightLossMedications] = useState<string>("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("weight_loss_medications") || "{}");
    setWeightLossMedications(data.weight_loss_medications || "");
  }, []);

  const backHref = weightLossMedications === "semaglutide" ? "/intake/semaglutide" : weightLossMedications === "tirzepatide" ? "/intake/tirzepatide" : "/intake/weight_loss_medications";

  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={3} // Set the correct index for 'Pain Medication' step
      backHref={backHref}
    >
      {children}
    </IntakeLayout>
  );
}

