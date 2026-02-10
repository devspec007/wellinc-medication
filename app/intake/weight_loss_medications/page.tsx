"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type WeightLossMedicationOption = {
    id: string;
    value: string;
    label: string;
};

const WEIGHT_LOSS_MEDICATION_OPTIONS: WeightLossMedicationOption[] = [
    { id: "form_weight_loss_medications_glp_1_medication", value: "glp_1_medication", label: "Yes, I've taken GLP-1 medication" },
    { id: "form_weight_loss_medications_different_medication", value: "different_medication", label: "Yes, I've taken a differrent medication for weight loss" },
    { id: "form_weight_loss_medications_no", value: "no", label: "No" },
];

const TITLE = "Have you taken GLP-1 medication for weight loss within the past 4 weeks?";

export default function WeightLossMedicationsPage() {
    const router = useRouter();
    const [selectedWeightLossMedications, setSelectedWeightLossMedications] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("weight_loss_medications") || "{}");
        if (data.weight_loss_medications) {
            setSelectedWeightLossMedications(data.weight_loss_medications);
        }
    }, []);

    const handleNext = () => {
        if (!selectedWeightLossMedications) {
            toast.error("Please select your weight loss medications.");
            return;
        }
        localStorage.setItem("weight_loss_medications", JSON.stringify({ weight_loss_medications: selectedWeightLossMedications }));
        const selectedOption = WEIGHT_LOSS_MEDICATION_OPTIONS.find(opt => opt.value === selectedWeightLossMedications);
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q12",
            text: TITLE,
            answer: selectedOption ? [selectedOption.label] : [],
            options: WEIGHT_LOSS_MEDICATION_OPTIONS.map(option => option.label),
        });
        if (selectedWeightLossMedications === "no") {
            // Remove previous_medication from localStorage when "no" is selected
            localStorage.removeItem("previous_medication");
            router.push("/intake/diet_exercise_willingness");
        } else if (selectedWeightLossMedications === "different_medication") {
            localStorage.setItem("previous_medication", JSON.stringify({ currentWeightLoss: "neither" }));
            router.push("/intake/diet_exercise_willingness");
        } else if (selectedWeightLossMedications === "glp_1_medication") {
            router.push("/intake/previous_medication");
        }
    };
    return (
        <div className="w-full">
            <div>
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_weight_loss_medications">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 space-y-2">
                            {WEIGHT_LOSS_MEDICATION_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_weight_loss_medications"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedWeightLossMedications === option.value}
                                    onChange={() => setSelectedWeightLossMedications(option.value)}
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
