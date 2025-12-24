"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type WeightLossSurgeryOption = {
    id: string;
    value: string;
    label: string;
};

const WEIGHT_LOSS_SURGERY_OPTIONS: WeightLossSurgeryOption[] = [
    { id: "form_weight_loss_surgery_yes", value: "yes", label: "Yes" },
    { id: "form_weight_loss_surgery_no", value: "no", label: "No" },
];

export default function WeightLossSurgeriesPage() {
    const [selectedWeightLossSurgery, setSelectedWeightLossSurgery] = useState<string | "">("");
    const [weightLossSurgeryDetails, setWeightLossSurgeryDetails] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("weight_loss_surgeries") || "{}");
        if (data.weight_loss_surgeries) {
            setSelectedWeightLossSurgery(data.weight_loss_surgeries);
        }
        if (data.weight_loss_surgeries_details) {
            setWeightLossSurgeryDetails(data.weight_loss_surgeries_details);
        }
    }, []);

    const handleNext = () => {
        if (!selectedWeightLossSurgery) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("weight_loss_surgeries", JSON.stringify({ weight_loss_surgeries: selectedWeightLossSurgery, weight_loss_surgeries_details: weightLossSurgeryDetails }));
        window.location.href = "/intake/weight_loss_programs";
    };
    return (
        <div className="w-full">
            <div>
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_weight_loss_surgeries">Have you had prior weight loss surgeries?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {WEIGHT_LOSS_SURGERY_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_weight_loss_surgeries"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedWeightLossSurgery === option.value}
                                    onChange={() => setSelectedWeightLossSurgery(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_weight_loss_surgeries_details">Please list all your prior bariatric (weight loss), abdominal, and pelvic surgeries. Please include date range and type of surgery. (if necessary)</label>
                        </div>
                        <textarea
                            rows={4}
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] resize-none"
                            name="form_weight_loss_surgeries_details"
                            id="form_weight_loss_surgeries_details"
                            value={weightLossSurgeryDetails}
                            onChange={(e) => setWeightLossSurgeryDetails(e.target.value)}
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
