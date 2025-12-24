"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type PainMedicationOption = {
    id: string;
    value: string;
    label: string;
};

const PAIN_MEDICATION_OPTIONS: PainMedicationOption[] = [
    { id: "form_pain_medications_yes", value: "yes", label: "Yes" },
    { id: "form_pain_medications_no", value: "no", label: "No" },
];

export default function PainMedicationsPage() {
    const [selectedPainMedications, setSelectedPainMedications] = useState<string | "">("");
    const [painMedicationDetails, setPainMedicationDetails] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("pain_medications") || "{}");
        if (data.pain_medications) {
            setSelectedPainMedications(data.pain_medications);
        }
        if (data.pain_medications_details) {
            setPainMedicationDetails(data.pain_medications_details);
        }
    }, []);

    const handleNext = () => {
        if (!selectedPainMedications) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("pain_medications", JSON.stringify({ pain_medications: selectedPainMedications, pain_medications_details: painMedicationDetails }));
        window.location.href = "/intake/weight_loss_surgeries";
    };
    return (
        <div className="w-full">
            <div>
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_taken_pain_medications_or_street_drugs">Within the last 3 months, have you taken opiate pain medications and/or opiate-based street drugs?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {PAIN_MEDICATION_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_pain_medications"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedPainMedications === option.value}
                                    onChange={() => setSelectedPainMedications(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_taken_pain_medications_or_street_drugs_info">Please include date range, name, dose, and frequency if necessary.</label>
                        </div>
                        <textarea
                            rows={4}
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] resize-none"
                            name="form_pain_medications_details"
                            id="form_pain_medications_details"
                            value={painMedicationDetails}
                            onChange={(e) => setPainMedicationDetails(e.target.value)}
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
