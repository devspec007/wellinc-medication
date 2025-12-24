"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type WeightLossMedicationOption = {
    id: string;
    value: string;
    label: string;
};

const WEIGHT_LOSS_MEDICATION_OPTIONS: WeightLossMedicationOption[] = [
    { id: "form_weight_loss_medications_semaglutide", value: "semaglutide", label: "Yes, I've taken Semaglutide (Ozempic or Wegovy)" },
    { id: "form_weight_loss_medications_tirzepatide", value: "tirzepatide", label: "Yes, I've taken Tirzepatide (Mounjaro or Zepbound)" },
    { id: "form_weight_loss_medications_not_currently_taking", value: "not_currently_taking", label: "I'm not currently taking a GLP-1 medication" },
];

export default function WeightLossMedicationsPage() {
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
        if (selectedWeightLossMedications === "semaglutide") {
            window.location.href = "/intake/semaglutide";
        } else if (selectedWeightLossMedications === "tirzepatide") {
            window.location.href = "/intake/tirzepatide";
        } else if (selectedWeightLossMedications === "not_currently_taking") {
            window.location.href = "/intake/pain_medications";
        }
    };
    return (
        <div className="w-full">
            <div>
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_weight_loss_medications">Have you taken medication for weight loss within the past month?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
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
