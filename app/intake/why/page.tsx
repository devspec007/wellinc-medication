"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type MotivationOption = {
    id: string;
    value: string;
    label: string;
};

const MOTIVATION_OPTIONS: MotivationOption[] = [
    { id: "form_motivation_live_longer", value: "live_longer", label: "I want to live longer" },
    { id: "form_motivation_feel_better", value: "feel_better", label: "I want to feel and look better" },
    { id: "form_motivation_reduce_health_issues", value: "reduce_health_issues", label: "I want to reduce my current health issues" },
    { id: "form_motivation_all_of_these", value: "all_of_these", label: "All of these" },
];

export default function WhyPage() {
    const [motivation, setMotivation] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("motivation") || "{}");
        if (data.motivation) {
            setMotivation(data.motivation);
        }
    }, []);

    const handleNext = () => {
        if (!motivation) {
            toast.error("Please select your motivation.");
            return;
        }
        localStorage.setItem("motivation", JSON.stringify({ motivation }));
        const selectedMotivation = MOTIVATION_OPTIONS.find(option => option.value === motivation);
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q6",
            text: "What is your primary reason for taking weight loss seriously?",
            answer: selectedMotivation?.label ? [selectedMotivation.label] : [],
            options: MOTIVATION_OPTIONS.map(option => option.label),
        });
        window.location.href = "/intake/speed";
    };
    return (
        <div className="w-full">
            <div className="title">
                Improving your life requires
                <span className="title-accent"> motivation</span>.
            </div>
            <div className="title mt-6">
                What is your
                <span className="font-semibold"> primary reason </span>
                for taking weight loss seriously?
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="w-full mt-4 space-y-2">
                            {MOTIVATION_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_motivation"
                                    value={option.value}
                                    label={option.label}
                                    checked={motivation === option.value}
                                    onChange={() => setMotivation(option.value)}
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
