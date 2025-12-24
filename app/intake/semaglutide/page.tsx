"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type SemaglutideOption = {
    id: string;
    value: string;
    label: string;
};

const SEMAGLUTIDE_OPTIONS_DOSE: SemaglutideOption[] = [
    { id: "form_semaglutide_dose_0.25mg", value: "0.25mg", label: "0.25 mg" },
    { id: "form_semaglutide_dose_0.50mg", value: "0.50mg", label: "0.50 mg" },
    { id: "form_semaglutide_dose_1mg", value: "1mg", label: "1 mg" },
    { id: "form_semaglutide_dose_1.5mg", value: "1.5mg", label: "1.5 mg" },
    { id: "form_semaglutide_dose_2mg", value: "2mg", label: "2 mg" },
    { id: "form_semaglutide_dose_2.5mg", value: "2.5mg", label: "2.5 mg" },
];

const SEMAGLUTIDE_OPTIONS_TREATMENT: SemaglutideOption[] = [
    { id: "form_semaglutide_treatment_stay_on_same_dose", value: "stay_on_same_dose", label: "Stay on the same dose or equivalent dose" },
    { id: "form_semaglutide_treatment_change_medications", value: "change_medications", label: "I want to change medications" },
    { id: "form_semaglutide_treatment_increase_dosage", value: "increase_dosage", label: "Increase my dosage" },
    { id: "form_semaglutide_treatment_decrease_dosage", value: "decrease_dosage", label: "Decrease my dosage" },
];

export default function SemaglutidePage() {
    const [selectedSemaglutideDose, setSelectedSemaglutideDose] = useState<string | "">("");
    const [selectedSemaglutideTreatment, setSelectedSemaglutideTreatment] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("semaglutide") || "{}");
        if (data.semaglutide_dose) {
            setSelectedSemaglutideDose(data.semaglutide_dose);
        }
        if (data.semaglutide_treatment) {
            setSelectedSemaglutideTreatment(data.semaglutide_treatment);
        }
    }, []);

    const handleNext = () => {
        if (!selectedSemaglutideDose) {
            toast.error("Please select your semaglutide dose.");
            return;
        }
        if (!selectedSemaglutideTreatment) {
            toast.error("Please select your semaglutide treatment.");
            return;
        }
        localStorage.setItem("semaglutide", JSON.stringify({ semaglutide_dose: selectedSemaglutideDose, semaglutide_treatment: selectedSemaglutideTreatment }));
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
                            <label htmlFor="form_semaglutide_dose">Which dose most closely matches your most recent weekly dose of Semaglutide (ie. Ozempic or Wegovy)?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {SEMAGLUTIDE_OPTIONS_DOSE.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_semaglutide_dose"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedSemaglutideDose === option.value}
                                    onChange={() => setSelectedSemaglutideDose(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_semaglutide_treatment">How would you like to continue your treatment?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {SEMAGLUTIDE_OPTIONS_TREATMENT.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_semaglutide_treatment"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedSemaglutideTreatment === option.value}
                                    onChange={() => setSelectedSemaglutideTreatment(option.value)}
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
