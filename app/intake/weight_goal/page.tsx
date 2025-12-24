"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WeightGoalPage() {
  const [weightGoal, setWeightGoal] = useState<number | "">("");
  const [bmi, setBmi] = useState<string | "">("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("weight_goal") || "{}");
    setWeightGoal(data.weightGoal || "");
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("height_weight") || "{}");
    const feet = data.feet || "";
    const inches = data.inches || "";
    const weight = data.weight || "";
    const bmi = (weight / ((feet * 12 + inches) ** 2)) * 703;
    setBmi(bmi.toFixed(2).toString());
  }, []);

  const handleNext = () => {
    if (!weightGoal) {
      toast.error("Please enter a valid weight goal.");
      return;
    }
    if (weightGoal < 100) {
      toast.error("Value must be greater than 100.");
      return;
    }
    localStorage.setItem("weight_goal", JSON.stringify({ weightGoal }));
    window.location.href = "/intake/gender_age";
  };

  return (
    <div className="w-full">
      <div className="text-xl mt-4">
        <span className="font-bold">Perfect! </span>
        With a BMI of {bmi}, we can continue.
      </div>
      <div className="title mt-4">
        We're in this together.
        <span className="title-accent"> Your goal is our goal.</span>
      </div>
      <div className="title-sm mt-6">
        What is your goal weight?
      </div>

      <div className="mt-4">
        <fieldset className="space-y-6 md:space-y-8">
          <div>
            <input
              inputMode="tel"
              required
              min={100}
              placeholder="155"
              className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={weightGoal}
              name="form_weight_goal"
              id="form_weight_goal"
              onChange={e => setWeightGoal(e.target.value === "" ? "" : Number(e.target.value))}
            />
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