"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type SleepHoursOption = {
    id: string;
    value: string;
    label: string;
};

const SLEEP_HOURS_OPTIONS: SleepHoursOption[] = [
    { id: "form_sleep_hours_less_than_5", value: "less_than_5", label: "Less than 5 hours" },
    { id: "form_sleep_hours_6_7", value: "6_7", label: "6-7 hours" },
    { id: "form_sleep_hours_8_9", value: "8_9", label: "8-9 hours" },
    { id: "form_sleep_hours_more_than_9", value: "more_than_9", label: "More than 9 hours" },
];

const TITLE = "How many hours of sleep do you usually get each night?";

export default function SleepHoursPage() {
    const router = useRouter();
    const [sleepHours, setSleepHours] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("sleep_hours") || "{}");
        setSleepHours(data.sleepHours || "");
    }, []);

    const handleNext = () => {
        if (!sleepHours) {
            toast.error("Please select your sleep hours.");
            return;
        }
        localStorage.setItem("sleep_hours", JSON.stringify({ sleepHours }));
        const selectedSleepHours = SLEEP_HOURS_OPTIONS.find(option => option.value === sleepHours);
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q9",
            text: TITLE,
            answer: selectedSleepHours?.label ? [selectedSleepHours.label] : [],
            options: SLEEP_HOURS_OPTIONS.map(option => option.label),
        });
        router.push("/intake/testimonial_2");
    };
    return (
        <div className="w-full">
            <div>
                <img src="/assets/imgs/sleep.jpg" alt="Sleep Hours" className="w-full" />
            </div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_sleep_hours">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 space-y-2">
                            {SLEEP_HOURS_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_sleep_hours"
                                    value={option.value}
                                    label={option.label}
                                    checked={sleepHours === option.value}
                                    onChange={() => setSleepHours(option.value)}
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
