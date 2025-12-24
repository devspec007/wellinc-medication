"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type MotivatedOption = {
    id: string;
    value: string;
    label: string;
    iconSrc: string;
};

const MOTIVATED_OPTIONS: MotivatedOption[] = [
    { id: "form_motivated_ready", value: "ready", label: "I'm Ready!", iconSrc: "/assets/Icons/happy.svg" },
    { id: "form_motivated_hopeful", value: "hopeful", label: "I'm feeling hopeful", iconSrc: "/assets/Icons/smile.svg" },
    { id: "form_motivated_cautious", value: "cautious", label: "I'm cautious", iconSrc: "/assets/Icons/unamused.svg" },
];

export default function MotivatedPage() {
    const [motivated, setMotivated] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("motivated") || "{}");
        setMotivated(data.motivated || "");
    }, []);

    const handleNext = () => {
        if (!motivated) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("motivated", JSON.stringify({ motivated }));
        window.location.href = "/intake/additional_information";
    };

    return (
        <div className="w-full">
            <div className="title">
                Let's better understand your current
                <span className="title-accent"> state of mind.</span>
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_motivated">How motivated are you to reach your weight goal?</label>
                        </div>
                        <div className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {MOTIVATED_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_motivated"
                                    value={option.value}
                                    label={option.label}
                                    iconSrc={option.iconSrc}
                                    checked={motivated === option.value}
                                    onChange={() => setMotivated(option.value)}
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
