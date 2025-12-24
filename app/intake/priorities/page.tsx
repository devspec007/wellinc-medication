"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type PriorityOption = {
    id: string;
    value: string;
    label: string;
    iconSrc: string;
};

const PRIORITY_OPTIONS: PriorityOption[] = [
    { id: "form_priority_lose_weight", value: "lose_weight", label: "Lose Weight", iconSrc: "/assets/icons/scale.svg" },
    { id: "form_priority_gain_muscle", value: "gain_muscle", label: "Gain Muscle", iconSrc: "/assets/icons/muscle.svg" },
    { id: "form_priority_maintain_my_current_body", value: "maintain_my_current_body", label: "Maintain My Current Body", iconSrc: "/assets/icons/ok.svg" },
];

export default function PrioritiesPage() {
    const [priority, setPriority] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("priority") || "{}");
        setPriority(data.priority || "");
    }, []);

    const handleNext = () => {
        if (!priority) {
            toast.error("Please select your priority.");
            return;
        }
        localStorage.setItem("priority", JSON.stringify({ priority }));
        window.location.href = "/intake/ranking";
    };

    return (
        <div className="w-full">
            <div className="title">
                We can help with all of these, but choose the
                <span className="title-accent"> most important for you</span>.
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_priority">Which of these is your priority?</label>
                        </div>
                        <div className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {PRIORITY_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_priority"
                                    value={option.value}
                                    label={option.label}
                                    iconSrc={option.iconSrc}
                                    checked={priority === option.value}
                                    onChange={() => setPriority(option.value)}
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
