"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { stateOptions } from "@/lib/states";

const STORAGE_KEY = "intake-medical-review";

export default function MedicalReviewPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [bmi, setBmi] = useState<string | "">("");
  const [weight, setWeight] = useState<string | "">("");
  const [weightGoal, setWeightGoal] = useState<string | "">("");
  const [weeks, setWeeks] = useState<number | "">("");
  const router = useRouter();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.firstName) setFirstName(parsed.firstName);
        if (parsed.lastName) setLastName(parsed.lastName);
        if (parsed.shippingState) setShippingState(parsed.shippingState);
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("height_weight") || "{}");
    const weight_goal_data = JSON.parse(localStorage.getItem("weight_goal") || "{}");
    const feet = data.feet || "";
    const inches = data.inches || "";
    const weight = data.weight || "";
    const bmi = (weight / (feet * 12 + inches) ** 2) * 703;
    setBmi(bmi.toFixed(2).toString());
    setWeight(weight.toString());
    setWeightGoal(weight_goal_data.weightGoal || "");
    const weeks = ((weight - weight_goal_data.weightGoal) / 2.85).toFixed(2);
    setWeeks(Number(weeks));
  }, []);

  // Save data to localStorage
  const handleNext = () => {
    const dataToSave = {
      firstName,
      lastName,
      shippingState,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    router.push("/intake/contact");
    // TODO: Navigate to next page or handle form submission
  };

  return (
    <div>
      <div className="title title-accent">Your medical checkup</div>
      <div className="mt-4 text-lg">
        <div className="flex items-center gap-2">
          <div className="font-semibold">BMI:</div>
          <div>{bmi}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-semibold">Current weight:</div>
          <div> {weight} lbs</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-semibold">Goal weight:</div>
          <div> {weightGoal} lbs in {weeks} weeks</div>
        </div>
      </div>
      <div className="my-4 w-full h-[1pt] bg-brand-50"></div>
      <div className="subtitle">
        You are a strong candidate for medical weight loss with a 94% chance of
        treatment success if you qualify.
      </div>
      <div className="my-4 w-full h-[1pt] bg-brand-50"></div>
      <div className="title-sm mt-6">
        Let's proceed to verify your eligibility.
      </div>
      <div className="mt-6">
        <fieldset className="space-y-6 md:space-y-8">
          <div>
            <label htmlFor="firstName" className="label mb-1">
              First Name
            </label>
            <input
              required
              placeholder="First Name"
              className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="text"
              value={firstName}
              name="firstName"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="label mb-1">
              Last Name
            </label>
            <input
              required
              placeholder="Last Name"
              className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="text"
              value={lastName}
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <div className="label mb-1">
              <label htmlFor="form_shipping_state">
                What state will your medication be shipped to?{" "}
              </label>
            </div>
            <div className="relative">
              <select
                required
                className="block w-full appearance-none rounded-[3px] border border-brand-75 bg-white px-4 py-3 pr-16 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0"
                name="form[shipping_state]"
                id="form_shipping_state"
                value={shippingState}
                onChange={(e) => setShippingState(e.target.value)}
              >
                {stateOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} label={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="subtitle mt-6">
        Your information is never shared and is protected by HIPAA.
      </div>
      <div className="mt-12 sticky bottom-5">
        <input
          type="button"
          name="next"
          value="Next →"
          className="btn-link w-full"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
