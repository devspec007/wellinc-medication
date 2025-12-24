"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type WeightLossProgramsOption = {
    id: string;
    value: string;
    label: string;
};

const WEIGHT_LOSS_PROGRMAS_OPTIONS: WeightLossProgramsOption[] = [
    { id: "form_weight_loss_programs_yes", value: "yes", label: "Yes" },
    { id: "form_weight_loss_programs_no", value: "no", label: "No" },
];

export default function WeightLossProgramsPage() {
    const [selectedWeightLossPrograms, setSelectedWeightLossPrograms] = useState<string | "">("");
    const [weightLossProgramsDetails, setWeightLossProgramsDetails] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("weight_loss_programs") || "{}");
        if (data.weight_loss_programs) {
            setSelectedWeightLossPrograms(data.weight_loss_programs);
        }
        if (data.weight_loss_programs_details) {
            setWeightLossProgramsDetails(data.weight_loss_programs_details);
        }
    }, []);

    const handleNext = () => {
        if (!selectedWeightLossPrograms) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("weight_loss_programs", JSON.stringify({ weight_loss_programs: selectedWeightLossPrograms, weight_loss_programs_details: weightLossProgramsDetails }));
        window.location.href = "/intake/diet_exercise_willingness";
    };
    return (
        <div className="w-full">
            <div className="title title-accent">
                How about weight loss programs?
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_weight_loss_programs">Have you ever tried to lose weight in a weight management program (Jenny Craig, Weight Watchers, etc)?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {WEIGHT_LOSS_PROGRMAS_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_weight_loss_programs"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedWeightLossPrograms === option.value}
                                    onChange={() => setSelectedWeightLossPrograms(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_weight_loss_programs_details">Please provide brief details if necessary</label>
                        </div>
                        <textarea
                            rows={4}
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] resize-none"
                            name="form_weight_loss_programs_details"
                            id="form_weight_loss_programs_details"
                            value={weightLossProgramsDetails}
                            onChange={(e) => setWeightLossProgramsDetails(e.target.value)}
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
