"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type BloodPressureOption = {
    id: string;
    value: string;
    label: string;
};

const BLOOD_PRESSURE_OPTIONS: BloodPressureOption[] = [
    { id: "form_blood_pressure_normal", value: "normal", label: "<120/80 (Normal)" },
    { id: "form_blood_pressure_elevated", value: "elevated", label: "120-129/<80 (Elevated)" },
    { id: "form_blood_pressure_high_stage_1", value: "high_stage_1", label: "130-139/80-89 (High Stage 1)" },
    { id: "form_blood_pressure_high_stage_2", value: "high_stage_2", label: "≥140/90 (High Stage 2)" },
];

export default function BloodPressurePage() {
    const [selectedBloodPressure, setSelectedBloodPressure] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("blood_pressure") || "{}");
        if (data.blood_pressure) {
            setSelectedBloodPressure(data.blood_pressure);
        }
    }, []);

    const handleNext = () => {
        if (!selectedBloodPressure) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("blood_pressure", JSON.stringify({ blood_pressure: selectedBloodPressure }));
        window.location.href = "/intake/resting_heart_rate";
    };
    return (
        <div className="w-full">
            <div>
                <img className="w-full" src="/assets/imgs/bp.png" alt="Scale" />
            </div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_blood_pressure">What is your average blood pressure range?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {BLOOD_PRESSURE_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_blood_pressure"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedBloodPressure === option.value}
                                    onChange={() => setSelectedBloodPressure(option.value)}
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
        </div >
    );
}
