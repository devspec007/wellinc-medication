"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type TirzepatideOption = {
    id: string;
    value: string;
    label: string;
};

const TIRZEPATIDE_OPTIONS_DOSE: TirzepatideOption[] = [
    { id: "form_tirzepatide_dose_2.5mg", value: "2.5mg", label: "2.5 mg" },
    { id: "form_tirzepatide_dose_5mg", value: "5mg", label: "5 mg" },
    { id: "form_tirzepatide_dose_7.5mg", value: "7.5mg", label: "7.5 mg" },
    { id: "form_tirzepatide_dose_10mg", value: "10mg", label: "10 mg" },
    { id: "form_tirzepatide_dose_12.5mg", value: "12.5mg", label: "12.5 mg" },
    { id: "form_tirzepatide_dose_15mg", value: "15mg", label: "15 mg" },
];

const TIRZEPATIDE_OPTIONS_TREATMENT: TirzepatideOption[] = [
    { id: "form_tirzepatide_treatment_stay_on_same_dose", value: "stay_on_same_dose", label: "Stay on the same dose or equivalent dose" },
    { id: "form_tirzepatide_treatment_change_medications", value: "change_medications", label: "I want to change medications" },
    { id: "form_tirzepatide_treatment_increase_dosage", value: "increase_dosage", label: "Increase my dosage" },
    { id: "form_tirzepatide_treatment_decrease_dosage", value: "decrease_dosage", label: "Decrease my dosage" },
];

export default function TirzepatidePage() {
    const [selectedTirzepatideDose, setSelectedTirzepatideDose] = useState<string | "">("");
    const [selectedTirzepatideTreatment, setSelectedTirzepatideTreatment] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("tirzepatide") || "{}");
        if (data.tirzepatide_dose) {
            setSelectedTirzepatideDose(data.tirzepatide_dose);
        }
        if (data.tirzepatide_treatment) {
            setSelectedTirzepatideTreatment(data.tirzepatide_treatment);
        }
    }, []);

    const handleNext = () => {
        if (!selectedTirzepatideDose) {
            toast.error("Please select your tirzepatide dose.");
            return;
        }
        if (!selectedTirzepatideTreatment) {
            toast.error("Please select your tirzepatide treatment.");
            return;
        }
        localStorage.setItem("tirzepatide", JSON.stringify({ tirzepatide_dose: selectedTirzepatideDose, tirzepatide_treatment: selectedTirzepatideTreatment }));
        window.location.href = "/intake/pain_medications";
    };
    return (
        <div className="w-full">
            <div className="title">
                Great! You have experience with
                <strong> GLP-1 </strong>
                medications.
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_tirzepatide_dose">Which dose most closely matches your most recent weekly dose of Tirzepatide (ie. Mounjaro or Zepbound)?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {TIRZEPATIDE_OPTIONS_DOSE.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_tirzepatide_dose"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedTirzepatideDose === option.value}
                                    onChange={() => setSelectedTirzepatideDose(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_tirzepatide_treatment">How would you like to continue your treatment?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {TIRZEPATIDE_OPTIONS_TREATMENT.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_tirzepatide_treatment"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedTirzepatideTreatment === option.value}
                                    onChange={() => setSelectedTirzepatideTreatment(option.value)}
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
