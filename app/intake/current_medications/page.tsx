"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type CurrentMedicationsOption = {
    id: string;
    value: string;
    label: string;
};

const CURRENT_MEDICATIONS_OPTIONS: CurrentMedicationsOption[] = [
    { id: "form_current_medications_yes", value: "yes", label: "Yes" },
    { id: "form_current_medications_no", value: "no", label: "No" },
];

export default function CurrentMedicationsPage() {
    const [selectedCurrentMedications, setSelectedCurrentMedications] = useState<string | "">("");
    const [currentMedicationsDetails, setCurrentMedicationsDetails] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("current_medications") || "{}");
        if (data.current_medications) {
            setSelectedCurrentMedications(data.current_medications);
        }
        if (data.current_medications_details) {
            setCurrentMedicationsDetails(data.current_medications_details);
        }
    }, []);

    const handleNext = () => {
        if (!selectedCurrentMedications) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("current_medications", JSON.stringify({ current_medications: selectedCurrentMedications, current_medications_details: currentMedicationsDetails }));
        window.location.href = "/intake/motivated";
    };
    return (
        <div className="w-full">
            <div>
                <img className="w-full" src="/assets/imgs/pill_in_hand.png" alt="Pill in Hand" />
            </div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_current_medications">Do you currently take any medications?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {CURRENT_MEDICATIONS_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_current_medications"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedCurrentMedications === option.value}
                                    onChange={() => setSelectedCurrentMedications(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_current_medications_details">Please add some details about the current medicine you take if necessary.</label>
                        </div>
                        <textarea
                            rows={4}
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] resize-none"
                            name="form_current_medications_details"
                            id="form_current_medications_details"
                            value={currentMedicationsDetails}
                            onChange={(e) => setCurrentMedicationsDetails(e.target.value)}
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
