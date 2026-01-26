"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateQuestionnaire } from "@/lib/helper";

const TITLE = "What is your height and weight?";

export default function HeightWeightPage() {
  const [feet, setFeet] = useState<number | "">("");
  const [inches, setInches] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("height_weight") || "{}");
    setFeet(data.feet || "");
    setInches(data.inches || "");
    setWeight(data.weight || "");
  }, []);

  const handleNext = () => {
    if (feet === "" || feet <= 0 || inches === "") {
      toast.error("Please enter a valid height.");
      return;
    }
    if (!weight) {
      toast.error("Please enter a valid weight.");
      return;
    }
    localStorage.setItem("height_weight", JSON.stringify({title: TITLE, feet, inches, weight }));
    
    // Update or push to Questionnaire array
    updateQuestionnaire({
      type: "text",
      id: "q1",
      text: TITLE,
      answer: `feet: ${feet}' inches: ${inches}" weight: ${weight} lbs`,
    });
    
    const bmi = (weight / ((feet * 12 + inches) ** 2)) * 703;
    if (bmi < 27) {
      window.location.href = "/intake/not_qualified_bmi";
    } else {
      window.location.href = "/intake/weight_goal";
    }
  };

  return (
    <div className="w-full">
      <div className="title mt-4 max-w-[500px]">
        <span>Reach your goal weight fast</span>
        <span className="title-accent ml-[5px]">without restrictive diets and exercise.</span>
      </div>
      <div className="subtitle mt-4">
        Let's calculate your BMI to make sure you're a good candidate for medical
        weight loss.
      </div>
      <div className="title mt-4">
        {TITLE}
      </div>
      <div className="space-y-10 mt-4">
        {/* Feet */}
        <div>
          <label htmlFor="form_height_feet" className="label">
            Feet
          </label>
          <input
            inputMode="tel"
            required
            min={4}
            max={7}
            placeholder="5"
            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={feet}
            name="form_height_feet"
            id="form_height_feet"
            onChange={e => setFeet(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        {/* Inches */}
        <div>
          <label htmlFor="form_height_inches" className="label">
            Inches
          </label>
          <input
            inputMode="tel"
            required
            min={0}
            max={11}
            placeholder="6"
            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={inches}
            name="form_height_inches"
            id="form_height_inches"
            onChange={e => setInches(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        {/* Weight */}
        <div>
          <label htmlFor="form_weight" className="label">
            Weight (in lbs)
          </label>
          <input
            inputMode="tel"
            required
            min={100}
            max={500}
            placeholder="250"
            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={weight}
            name="form_weight"
            id="form_weight"
            onChange={e => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
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
