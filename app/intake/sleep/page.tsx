"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type SleepOption = {
    id: string;
    value: string;
    label: string;
    iconSrc: string;
};

const SLEEP_OPTIONS: SleepOption[] = [
    { id: "form_sleep_good", value: "good", label: "Pretty good", iconSrc: "/assets/Icons/bed.svg" },
    { id: "form_sleep_restless", value: "restless", label: "A bit restless", iconSrc: "/assets/Icons/annoyed.svg" },
    { id: "form_sleep_bad", value: "bad", label: "I don't sleep well", iconSrc: "/assets/Icons/bed_off.svg" },
];

const TITLE = "How is your sleep, overall?";

export default function SleepPage() {
    const [sleep, setSleep] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("sleep") || "{}");
        setSleep(data.sleep || "");
    }, []);

    const handleNext = () => {
        if (!sleep) {
            toast.error("Please select your sleep detail.");
            return;
        }
        localStorage.setItem("sleep", JSON.stringify({ sleep }));
        const selectedSleep = SLEEP_OPTIONS.find(option => option.value === sleep);
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q8",
            text: TITLE,
            answer: selectedSleep?.label ? [selectedSleep.label] : [],
            options: SLEEP_OPTIONS.map(option => option.label),
        });
        window.location.href = "/intake/sleep_hours";
    };
    return (
        <div className="w-full">
            <div className="title">
                How you sleep tells us a lot about your
                <span className="title-accent"> cortisol and efficiency</span>.
            </div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_sleep">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {SLEEP_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_sleep"
                                    value={option.value}
                                    label={option.label}
                                    checked={sleep === option.value}
                                    onChange={() => setSleep(option.value)}
                                    iconSrc={option.iconSrc}
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
