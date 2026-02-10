"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type RestingHeartRateOption = {
    id: string;
    value: string;
    label: string;
};

const RESTING_HEART_RATE_OPTIONS: RestingHeartRateOption[] = [
    { id: "form_resting_heart_rate_slow", value: "slow", label: "<60 beats per minute (Slow)" },
    { id: "form_resting_heart_rate_normal", value: "normal", label: "60-100 beats per minute (Normal)" },
    { id: "form_resting_heart_rate_slightly_fast", value: "slightly_fast", label: "101-110 beats per minute (Slightly Fast)" },
    { id: "form_resting_heart_rate_fast", value: "fast", label: ">110 beats per minute (Fast)" },
    { id: "form_resting_heart_rate_not_sure", value: "not_sure", label: "I'm not sure" },
];

const TITLE = "How about your average resting heart rate?";

export default function RestingHeartRatePage() {
    const router = useRouter();
    const [selectedRestingHeartRate, setSelectedRestingHeartRate] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("resting_heart_rate") || "{}");
        if (data.resting_heart_rate) {
            setSelectedRestingHeartRate(data.resting_heart_rate);
        }
    }, []);

    const handleNext = () => {
        if (!selectedRestingHeartRate) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("resting_heart_rate", JSON.stringify({ resting_heart_rate: selectedRestingHeartRate }));
        const selectedOption = RESTING_HEART_RATE_OPTIONS.find(opt => opt.value === selectedRestingHeartRate);
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q16",
            text: TITLE,
            answer: selectedOption ? [selectedOption.label] : [],
            options: RESTING_HEART_RATE_OPTIONS.map(option => option.label),
        });
        router.push("/intake/medication_match");
    };
    return (
        <div className="w-full">
            <div>
                <img className="w-full" src="/assets/imgs/nap.png" alt="Heart Rate" />
            </div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_resting_heart_rate">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 space-y-2">
                            {RESTING_HEART_RATE_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_resting_heart_rate"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedRestingHeartRate === option.value}
                                    onChange={() => setSelectedRestingHeartRate(option.value)}
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
        </div >
    );
}
