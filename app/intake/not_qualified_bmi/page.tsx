"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotQualifiedBMI() {
  const router = useRouter();
  const [bmi, setBmi] = useState<string | "">("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("height_weight") || "{}");
    const feet = data.feet || "";
    const inches = data.inches || "";
    const weight = data.weight || "";
    const bmi = (weight / ((feet * 12 + inches) ** 2)) * 703;
    setBmi(bmi.toFixed(2).toString());
  }, []);

  const handleCheckAgain = () => {
    router.push("/intake/height_weight");
  };

  const handleSelectionCorrect = () => {
    router.push("/");
  };

  return (
    <div className="w-full">
      <div className="title mt-4 text-center">
        It Looks like you may not qualify...
      </div>
      <div className="mt-4 text-center">
        YOUR BMI:
      </div>
      <div className="title mt-4 text-center">
        {bmi}
      </div>
      <div className="subtitle mt-4 text-center">
        To qualify for GLP-1 Medications like Ozempic® or Mounjaro® your BMI needs to be 27 or higher. Please check your answers again to verify your BMI.
      </div>
      <div className="mt-12 sticky bottom-5">
        <input
          type="button"
          name="commit"
          value="Check Again"
          className="btn-link w-full"
          data-disable-with="Check Again"
          onClick={handleCheckAgain}
        />
      </div>
      <div className="mt-12 sticky bottom-5">
        <input
          type="button"
          name="commit"
          value="Back to Home"
          className="btn-link w-full"
          data-disable-with="My Selection is Correct"
          onClick={handleSelectionCorrect}
        />
      </div>
    </div>
  );
}
