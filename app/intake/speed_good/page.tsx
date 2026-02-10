"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SpeedGoodPage() {
    const router = useRouter();
    const [speedDifference, setSpeedDifference] = useState<number | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("height_weight") || "{}");
        const goal_data = JSON.parse(localStorage.getItem("weight_goal") || "{}");
        const weight = data.weight || "";
        const goal_weight = goal_data.weightGoal || "";
        const speed_difference = Math.ceil(weight - goal_weight);
        setSpeedDifference(Number(speed_difference));
    }, []);

    const handleNext = () => {
        router.push("/intake/sleep");
    };

    return (
        <div className="w-full">
            <div className="title">Perfect!</div>
            <div className="title-sm mt-4">
                Losing {speedDifference}lbs is easier than you think - and it
                <span className="title-accent"> doesn't involve restrictive diets</span>.
            </div>
            <div className="my-4 w-full h-[1pt] bg-brand-50"></div>
            <div className="subtitle mt-4">
                Now, let's<span className="font-semibold"> analyze your metabolism </span>and discover how well your body processes macronutrients.
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
