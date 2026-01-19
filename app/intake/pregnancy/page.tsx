"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type PregnancyOption = {
    id: string;
    value: string;
    label: string;
};

const PREGNANCY_OPTIONS: PregnancyOption[] = [
    { id: "form_pregnancy_currently_pregnant", value: "currently_pregnant", label: "Currently or possibly pregnant, or actively trying to become pregnant" },
    { id: "form_pregnancy_breastfeeding", value: "breastfeeding", label: "Breastfeeding or bottle-feeding with breastmilk" },
    { id: "form_pregnancy_given_birth", value: "given_birth", label: "Have given birth to a child within the last 6 months" },
    { id: "form_pregnancy_none_of_above", value: "none_of_above", label: "None of the above" },
];

export default function PregnancyPage() {
    const [pregnancy, setPregnancy] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("pregnancy") || "{}");
        setPregnancy(data.pregnancy || "");
    }, []);

    const handleNext = () => {
        if (!pregnancy) {
            toast.error("Please select your status.");
            return;
        }
        localStorage.setItem("pregnancy", JSON.stringify({ pregnancy }));
        if (pregnancy === "none_of_above") {
            window.location.href = "/intake/priorities";
        } else {
            window.location.href = "/intake/not_qualified_female";
        }
    };
    return (
        <div className="w-full">
            <div className="title">Safety, first.</div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_pregnancy_status">Do any of these apply to you?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {PREGNANCY_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_pregnancy_status"
                                    value={option.value}
                                    label={option.label}
                                    checked={pregnancy === option.value}
                                    onChange={() => setPregnancy(option.value)}
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
