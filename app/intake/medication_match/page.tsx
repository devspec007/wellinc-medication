"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type MedicationMatchOption = {
  id: string;
  value: string;
  label: string;
  iconSrc: string;
};

const MEDICATION_MATCH_OPTIONS: MedicationMatchOption[] = [
  { id: "form_medication_match_affordability", value: "affordability", label: "Affordability", iconSrc: "/assets/icons/receipt.svg" },
  { id: "form_medication_match_potency", value: "potency", label: "Potency", iconSrc: "/assets/icons/trending_up.svg" },
];

export default function MedicationMatchPage() {
  const [medicationMatch, setMedicationMatch] = useState<string | "">("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("medication_match") || "{}");
    setMedicationMatch(data.medication_match || "");
  }, []);

  const handleNext = () => {
    if (!medicationMatch) {
      toast.error("Please select your answer.");
      return;
    }
    localStorage.setItem("medication_match", JSON.stringify({ medication_match: medicationMatch }));
    window.location.href = "/intake/current_medications";
  };

  return (
    <div className="w-full">
      <div className="title">
        <span className="title-accent">Looking good! </span>
        Let's match you with the best medication.
      </div>
      <div className="my-4 w-full h-[1pt] bg-brand-50"></div>
      <div>
        <fieldset className="space-y-6 md:space-y-8">
          <div>
            <div className="label mb-1">
              <label htmlFor="form_medication_match">Which of these is most important to you?</label>
            </div>
            <div className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {MEDICATION_MATCH_OPTIONS.map(option => (
                <RadioCard
                  key={option.id}
                  id={option.id}
                  name="form_medication_match"
                  value={option.value}
                  label={option.label}
                  checked={medicationMatch === option.value}
                  onChange={() => setMedicationMatch(option.value)}
                  iconSrc={option.iconSrc}
                />
              ))}
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-12 sticky bottom-5">
        <input
          type="button"
          name="commit"
          value="Next →"
          className="btn-link w-full"
          data-disable-with="Next →"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
