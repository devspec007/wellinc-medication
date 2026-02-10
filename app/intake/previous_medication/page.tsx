"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Select from "@/components/Select";

const MEDICATION_OPTIONS: { value: string; label: string }[] = [
    { value: "semaglutide", label: "Semaglutide" },
    { value: "tirzepatide", label: "Tirzepatide" },
];

const SEMAGLUTIDE_DOSE_OPTIONS: { value: string; label: string }[] = [
    { value: "0.25mg", label: "0.25mg" },
    { value: "0.5mg", label: "0.5mg" },
    { value: "1mg", label: "1mg" },
    { value: "1.75mg", label: "1.75mg" },
    { value: "2.5mg", label: "2.5mg" },
];

const TIRZEPATIDE_DOSE_OPTIONS: { value: string; label: string }[] = [
    { value: "5mg", label: "5mg" },
    { value: "7.5mg", label: "7.5mg" },
    { value: "10mg", label: "10mg" },
    { value: "12.5mg", label: "12.5mg" },
    { value: "15mg", label: "15mg" },
];

const DOSE_PREFERENCE_OPTIONS: { value: string; label: string }[] = [
    { value: "increase", label: "Increase" },
    { value: "decrease", label: "Decrease" },
    { value: "same", label: "Same" },
];

export default function PreviousMedicationPage() {
    const router = useRouter();
    const [currentWeightLoss, setCurrentWeightLoss] = useState<string>("semaglutide");
    const [currentDose, setCurrentDose] = useState<string>("");
    const [dosePreference, setDosePreference] = useState<string>("same");

    useEffect(() => {
        // Load from localStorage
        const data = JSON.parse(localStorage.getItem("previous_medication") || "{}");
        if (data.currentWeightLoss) {
            setCurrentWeightLoss(data.currentWeightLoss);
        }
        if (data.currentDose) {
            setCurrentDose(data.currentDose);
        }
        if (data.dosePreference) {
            setDosePreference(data.dosePreference);
        }
    }, []);

    // Reset dose when medication changes and set default
    useEffect(() => {
        if (currentWeightLoss === "semaglutide") {
            if (!currentDose || !SEMAGLUTIDE_DOSE_OPTIONS.find(opt => opt.value === currentDose)) {
                setCurrentDose("0.25mg");
            }
        } else if (currentWeightLoss === "tirzepatide") {
            if (!currentDose || !TIRZEPATIDE_DOSE_OPTIONS.find(opt => opt.value === currentDose)) {
                setCurrentDose("5mg");
            }
        } else {
            setCurrentDose("");
        }
    }, [currentWeightLoss]);

    const handleMedicationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCurrentWeightLoss(value);
        // Dose will be reset by useEffect
    };

    const handleNext = () => {
        if (!currentWeightLoss) {
            toast.error("Please select the name of your medication.");
            return;
        }
        if (!currentDose) {
            toast.error("Please select the current dose of your medication.");
            return;
        }
        if (!dosePreference) {
            toast.error("Please select your dose preference.");
            return;
        }

        // Save to localStorage
        localStorage.setItem("previous_medication", JSON.stringify({
            currentWeightLoss: currentWeightLoss,
            currentDose: currentDose,
            dosePreference: dosePreference,
        }));

        router.push("/intake/diet_exercise_willingness");
    };

    const getDoseOptions = () => {
        if (currentWeightLoss === "semaglutide") {
            return SEMAGLUTIDE_DOSE_OPTIONS;
        } else if (currentWeightLoss === "tirzepatide") {
            return TIRZEPATIDE_DOSE_OPTIONS;
        }
        return SEMAGLUTIDE_DOSE_OPTIONS; // Default to semaglutide options
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <div className="label mb-2">
                    <label htmlFor="form_current_weight_loss">Please select the name of your medication.</label>
                </div>
                <Select
                    id="form_current_weight_loss"
                    name="form_current_weight_loss"
                    value={currentWeightLoss}
                    options={MEDICATION_OPTIONS}
                    onChange={handleMedicationChange}
                />
            </div>

            <div className="mb-6">
                <div className="label mb-2">
                    <label htmlFor="form_current_dose">Please select the current dose of your medication.</label>
                </div>
                <Select
                    id="form_current_dose"
                    name="form_current_dose"
                    value={currentDose}
                    options={getDoseOptions()}
                    onChange={(e) => setCurrentDose(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <div className="label mb-2">
                    <label htmlFor="form_dose_preference">Would you like to increase, decrease or maintain your dose</label>
                </div>
                <Select
                    id="form_dose_preference"
                    name="form_dose_preference"
                    value={dosePreference}
                    options={DOSE_PREFERENCE_OPTIONS}
                    onChange={(e) => setDosePreference(e.target.value)}
                />
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
