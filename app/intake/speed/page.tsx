"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type SpeedOption = {
    id: string;
    value: string;
    label: string;
    iconSrc: string;
};

const SPEED_OPTIONS: SpeedOption[] = [
    { id: "form_speed_good", value: "speed_good", label: "Works for me", iconSrc: "/assets/Icons/check.svg" },
    { id: "form_speed_faster", value: "speed_faster", label: "I want it faster", iconSrc: "/assets/Icons/run.svg" },
    { id: "form_speed_too_fast", value: "speed_too_fast", label: "That's too fast", iconSrc: "/assets/Icons/hourglass_low.svg" },
];

const TITLE = "How is that pace for you?";

export default function SpeedPage() {
    const [speed, setSpeed] = useState<string | "">("");
    const [weeks, setWeeks] = useState<number | "">("");
    const [goalWeight, setGoalWeight] = useState<number | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("speed") || "{}");
        setSpeed(data.speed || "");
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("height_weight") || "{}");
        const goal_data = JSON.parse(localStorage.getItem("weight_goal") || "{}");
        const weight = data.weight || "";
        const goal_weight = goal_data.weightGoal || "";
        const weeks = Math.ceil((weight - goal_weight) / 2.5).toFixed(2);
        setWeeks(Number(weeks));
        setGoalWeight(Number(goal_weight));
    }, []);

    const handleNext = () => {
        if (!speed) {
            toast.error("Please select an option.");
            return;
        }
        localStorage.setItem("speed", JSON.stringify({ speed }));
        const selectedSpeed = SPEED_OPTIONS.find(option => option.value === speed);
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q7",
            text: TITLE,
            answer: selectedSpeed?.label ? [selectedSpeed.label] : [],
            options: SPEED_OPTIONS.map(option => option.label),
        });
        if (speed === "speed_good") {
            window.location.href = "/intake/speed_good";
        } else if (speed === "speed_faster") {
            window.location.href = "/intake/speed_faster";
        } else if (speed === "speed_too_fast") {
            window.location.href = "/intake/speed_too_fast";
        }
    };

    return (
        <div className="w-full">
            <div className="title">
                With medication, you'll lose 2.5 to 5.0 pounds
                <span className="title-accent"> per week</span>.
            </div>
            <div className="my-4 w-full h-[1pt] bg-brand-50"></div>
            <div className="text-lg text-brand-300">
                It will take about {weeks} weeks to reach your goal weight of {goalWeight}.
            </div>
            <div className="my-4 w-full h-[1pt] bg-brand-50"></div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_speed">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {SPEED_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_speed"
                                    value={option.value}
                                    label={option.label}
                                    iconSrc={option.iconSrc}
                                    checked={speed === option.value}
                                    onChange={() => setSpeed(option.value)}
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
