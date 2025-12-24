"use client";

import { useEffect, useState } from "react";
import IntakeLayout from "@/components/IntakeLayout";
import { intakeSteps } from "@/lib/intakeSteps";

export default function SleepLayoutClient({ children }: { children: React.ReactNode }) {
  const [speed, setSpeed] = useState<string>("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("speed") || "{}");
    setSpeed(data.speed || "");
  }, []);

  const backHref = speed === "speed_good" ? "/intake/speed_good" : speed === "speed_faster" ? "/intake/speed_faster" : "/intake/speed_too_fast";

  return (
    <IntakeLayout
      steps={intakeSteps}
      activeStepIndex={2} // Set the correct index for 'Sleep' step
      backHref={backHref}
    >
      {children}
    </IntakeLayout>
  );
}

