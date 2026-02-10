"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type GenderOption = {
  id: string;
  value: string;
  label: string;
  iconSrc: string;
};

const GENDER_OPTIONS: GenderOption[] = [
  { id: "form_gender_male", value: "male", label: "Male", iconSrc: "/assets/Icons/male.svg" },
  { id: "form_gender_female", value: "female", label: "Female", iconSrc: "/assets/Icons/female.svg" },
];

const TITLE = "Are you male or female?";

export default function GenderAgePage() {
  const router = useRouter();
  const [gender, setGender] = useState<string | "">("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("gender") || "{}");
    setGender(data.gender || "");
  }, []);

  const handleNext = () => {
    if (!gender) {
      toast.error("Please select a gender.");
      return;
    }
    localStorage.setItem("gender", JSON.stringify({ gender }));
    updateQuestionnaire({
      type: "text",
      id: "q3",
      text: TITLE,
      answer: gender,
    });
    router.push("/intake/unique_effects");
  };

  return (
    <div className="w-full">
      <div className="mt-6">
        <fieldset className="space-y-6 md:space-y-8">
          <div>
            <div className="label mb-1">
              <label htmlFor="form_gender">{TITLE}</label>
            </div>
            <p className="note mt-2 mb-4">This helps us understand your body complexity and hormones so we can assess you better.</p>
            <div className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {GENDER_OPTIONS.map(option => (
                <RadioCard
                  key={option.id}
                  id={option.id}
                  name="form_gender"
                  value={option.value}
                  label={option.label}
                  checked={gender === option.value}
                  onChange={() => setGender(option.value)}
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
