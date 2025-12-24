"use client";

import { useEffect, useState } from "react";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export default function UniqueEffectsLayoutClient({ children }: { children: React.ReactNode }) {
  const [gender, setGender] = useState<string>("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("gender") || "{}");
    setGender(data.gender || "");
  }, []);

  const backHref = gender === "male" ? "/intake/gender_age" : "/intake/pregnancy";

  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={1} // Set the correct index for 'Unique Effects' step
      backHref={backHref}
    >
      {children}
    </IntakeLayout>
  );
}

