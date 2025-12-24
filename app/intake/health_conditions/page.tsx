"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import CheckboxCard from "@/components/CheckboxCard";

type HealthConditionOption = {
    id: string;
    value: string;
    label: string;
};

const HEALTH_CONDITION_OPTIONS: HealthConditionOption[] = [
    { id: "form_health_conditions_none_of_these", value: "none_of_these", label: "None of these" },
    { id: "form_health_conditions_kidney_disease", value: "kidney_disease", label: "End-stage kidney disease (on or about to be on dialysis)" },
    { id: "form_health_conditions_liver_disease", value: "liver_disease", label: "End-stage liver disease (cirrhosis)" },
    { id: "form_health_conditions_suicidal_thoughts", value: "suicidal_thoughts", label: "Current suicidal thoughts and/or prior suicidal attempt" },
    { id: "form_health_conditions_cancer", value: "cancer", label: "Cancer (active diagnosis, active treatment, or in remission or cancer-free for less than 5 continuous years - does not apply to non-melanoma skin cancer that was considered cured via simple excision)" },
    { id: "form_health_conditions_organ_transplant", value: "organ_transplant", label: "History of organ transplant on anti-rejection medication" },
    { id: "form_health_conditions_gastrointestinal_condition", value: "gastrointestinal_condition", label: "Severe gastrointestinal condition (gastroparesis, blockage, inflammatory bowel disease)" },
    { id: "form_health_conditions_substance_use_disorder", value: "substance_use_disorder", label: "Current diagnosis of or treatment for alcohol, opioid, or substance use disorder/dependence" },
];

export default function HealthConditionsPage() {
    const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("health_conditions") || "{}");
        if (Array.isArray(data.health_conditions)) {
            setSelectedHealthConditions(data.health_conditions);
        }
    }, []);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === "none_of_these") {
            setSelectedHealthConditions(checked ? ["none_of_these"] : []);
            return;
        }

        setSelectedHealthConditions(prev => {
            const withoutNone = prev.filter(item => item !== "none_of_these");
            if (checked) {
                return [...withoutNone, value];
            }
            return withoutNone.filter(item => item !== value);
        });
    };

    const handleNext = () => {
        if (selectedHealthConditions.length === 0) {
            toast.error("Please select at least one option.");
            return;
        }

        localStorage.setItem("health_conditions", JSON.stringify({ health_conditions: selectedHealthConditions }));
        window.location.href = "/intake/more_health_conditions";
    };

    return (
        <div className="w-full">
            <div className="title">
                <span className="title-accent">GLP-1 is safe</span>, but these health conditions might prevent you from being prescribed.
            </div>
            <div className="subtitle mt-6 text-center font-semibold">
                Your answers are completely confidential and protected by HIPAA
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_health_conditions">Do any of these apply to you?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {HEALTH_CONDITION_OPTIONS.map(option => (
                                <CheckboxCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_health_conditions"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedHealthConditions.includes(option.value)}
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
