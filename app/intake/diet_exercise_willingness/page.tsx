"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CheckboxCard from "@/components/CheckboxCard";
import { updateQuestionnaire } from "@/lib/helper";

type DietExerciseWillingnessOption = {
    id: string;
    value: string;
    label: string;
};

const DIET_EXERCISE_WILLINGNESS_OPTIONS: DietExerciseWillingnessOption[] = [
    { id: "form_diet_exercise_willingness_reduce_caloric_intake", value: "reduce_caloric_intake", label: "Reduce your caloric intake alongside medication" },
    { id: "form_diet_exercise_willingness_increase_physical_activity", value: "increase_physical_activity", label: "Increase your physical activity alongside medication" },
    { id: "form_diet_exercise_willingness_none_of_the_above", value: "none_of_the_above", label: "None of the above" },
];

const TITLE = "If clinically appropriate, are you willing to:";

export default function DietExerciseWillingnessPage() {
    const router = useRouter();
    const [selectedDietExerciseWillingness, setSelectedDietExerciseWillingness] = useState<string[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("diet_exercise_willingness") || "{}");
        if (Array.isArray(data.diet_exercise_willingness)) {
            setSelectedDietExerciseWillingness(data.diet_exercise_willingness);
        }
    }, []);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === "none_of_the_above") {
            setSelectedDietExerciseWillingness(checked ? ["none_of_the_above"] : []);
            return;
        }

        setSelectedDietExerciseWillingness(prev => {
            const withoutNone = prev.filter(item => item !== "none_of_the_above");
            if (checked) {
                return [...withoutNone, value];
            }
            return withoutNone.filter(item => item !== value);
        });
    };

    const handleNext = () => {
        if (selectedDietExerciseWillingness.length === 0) {
            toast.error("Please select at least one option.");
            return;
        }

        localStorage.setItem("diet_exercise_willingness", JSON.stringify({ diet_exercise_willingness: selectedDietExerciseWillingness }));
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q13",
            text: TITLE,
            answer: selectedDietExerciseWillingness.map(value => DIET_EXERCISE_WILLINGNESS_OPTIONS.find(opt => opt.value === value)?.label || value),
            options: DIET_EXERCISE_WILLINGNESS_OPTIONS.map(option => option.label),
        });
        router.push("/intake/recent_weight_changes");
    };

    return (
        <div className="w-full">
            <div>
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_diet_exercise_willingness">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 space-y-2">
                            {DIET_EXERCISE_WILLINGNESS_OPTIONS.map(option => (
                                <CheckboxCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_more_health_conditions"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedDietExerciseWillingness.includes(option.value)}
                                    onChange={handleCheckboxChange}
                                    className="border-none checkbox-card--no-check-highlight checkbox-card--compact"
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
