"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CheckboxCard from "@/components/CheckboxCard";
import { updateQuestionnaire } from "@/lib/helper";

type MoreHealthConditionOption = {
    id: string;
    value: string;
    label: string;
};

const MORE_HEALTH_CONDITION_OPTIONS: MoreHealthConditionOption[] = [
    { id: "form_more_health_conditions_none_of_these", value: "none_of_these", label: "None of these" },
    { id: "form_more_health_conditions_medullary_thyroid_cancer", value: "medullary_thyroid_cancer", label: "You or an immediate family member has a history of medullary thyroid cancer" },
    { id: "form_more_health_conditions_diabetic_on_insulin", value: "diabetic_on_insulin", label: "Diabetic on Insulin or have a history of diabetic retinopathy" },
    { id: "form_more_health_conditions_multiple_endocrine_neoplasia_type_2", value: "multiple_endocrine_neoplasia_type_2", label: "You or an immediate family member have a history of multiple endocrine neoplasia type 2" },
    { id: "form_more_health_conditions_kidney_conditions", value: "kidney_conditions", label: "Kidney Conditions" },
    { id: "form_more_health_conditions_seen_kidney_specialist", value: "seen_kidney_specialist", label: "Seen a kidney specialist in the past 12 months" },
    { id: "form_more_health_conditions_history_of_solitary_kidney", value: "history_of_solitary_kidney", label: "History of solitary kidney, or kidney transplant" },
    { id: "form_more_health_conditions_history_of_kidney_failure", value: "history_of_kidney_failure", label: "History of kidney failure" },
    { id: "form_more_health_conditions_history_of_gi_disorders", value: "history_of_gi_disorders", label: "You have a history of GI disorders such as inflammatory bowel disease" },
];

const TITLE = "Do any of these apply to you?";

export default function MoreHealthConditionsPage() {
    const router = useRouter();
    const [selectedMoreHealthConditions, setSelectedMoreHealthConditions] = useState<string[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("more_health_conditions") || "{}");
        if (Array.isArray(data.more_health_conditions)) {
            setSelectedMoreHealthConditions(data.more_health_conditions);
        }
    }, []);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === "none_of_these") {
            setSelectedMoreHealthConditions(checked ? ["none_of_these"] : []);
            return;
        }

        setSelectedMoreHealthConditions(prev => {
            const withoutNone = prev.filter(item => item !== "none_of_these");
            if (checked) {
                return [...withoutNone, value];
            }
            return withoutNone.filter(item => item !== value);
        });
    };

    const handleNext = () => {
        if (selectedMoreHealthConditions.length === 0) {
            toast.error("Please select at least one option.");
            return;
        }

        localStorage.setItem("more_health_conditions", JSON.stringify({ more_health_conditions: selectedMoreHealthConditions }));
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q11",
            text: TITLE,
            answer: selectedMoreHealthConditions.map(value => MORE_HEALTH_CONDITION_OPTIONS.find(opt => opt.value === value)?.label || value),
            options: MORE_HEALTH_CONDITION_OPTIONS.map(option => option.label),
        });

        // Check if "none of these" is selected
        if (selectedMoreHealthConditions.includes("none_of_these") && selectedMoreHealthConditions.length === 1) {
            // User selected only "none of these", proceed to next page
            router.push("/intake/weight_loss_medications");
        } else {
            // User selected a disqualifying health condition, redirect to disqualifier page
            router.push("/intake/disqualifer_health?from=more_health_conditions");
        }
    };

    return (
        <div className="w-full">
            <div className="title">
                A few more health questions
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_more_health_conditions">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 space-y-2">
                            {MORE_HEALTH_CONDITION_OPTIONS.map(option => (
                                <CheckboxCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_more_health_conditions"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedMoreHealthConditions.includes(option.value)}
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
