"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import CheckboxCard from "@/components/CheckboxCard";

type MoreHealthConditionOption = {
    id: string;
    value: string;
    label: string;
};

const MORE_HEALTH_CONDITION_OPTIONS: MoreHealthConditionOption[] = [
    { id: "form_more_health_conditions_none_of_these", value: "none_of_these", label: "None of these" },
    { id: "form_more_health_conditions_active_gall_bladder_disease", value: "active_gall_bladder_disease", label: "Active Gall Bladder Disease" },
    { id: "form_more_health_conditions_hypertension", value: "hypertension", label: "Hypertension (high blood pressure)" },
    { id: "form_more_health_conditions_sleep_apnea", value: "sleep_apnea", label: "Sleep apnea" },
    { id: "form_more_health_conditions_type_2_diabetes_not_on_insulin", value: "type_2_diabetes_not_on_insulin", label: "Type 2 diabetes (not on insulin)" },
    { id: "form_more_health_conditions_type_2_diabetes_on_insulin", value: "type_2_diabetes_on_insulin", label: "Type 2 diabetes (on insulin)" },
    { id: "form_more_health_conditions_type_1_diabetes", value: "type_1_diabetes", label: "Type 1 diabetes" },
    { id: "form_more_health_conditions_diabetic_retinopathy", value: "diabetic_retinopathy", label: "Diabetic retinopathy (diabetic eye disease), damage to the optic nerve from trauma or reduced blood flow, or blindness" },
    { id: "form_more_health_conditions_warfarin", value: "warfarin", label: "Use of the blood thinner warfarin (Coumadin/Jantoven)" },
    { id: "form_more_health_conditions_pancreatitis", value: "pancreatitis", label: "History of or current pancreatitis" },
    { id: "form_more_health_conditions_medullary_thyroid_carcinoma", value: "medullary_thyroid_carcinoma", label: "Personal or family history of Medullary Thyroid Carcinoma (MTC), or Multiple Endocrine Neoplasia Syndrome Type 2 (MEN-2)" },
    { id: "form_more_health_conditions_high_cholesterol", value: "high_cholesterol", label: "High cholesterol or triglycerides" },
    { id: "form_more_health_conditions_severe_depression", value: "severe_depression", label: "Severe Depression" },
    { id: "form_more_health_conditions_liver_disease_including_fatty_liver", value: "liver_disease_including_fatty_liver", label: "Liver disease, including fatty liver" },
    { id: "form_more_health_conditions_congestive_heart_failure", value: "congestive_heart_failure", label: "Congestive heart failure" },
    { id: "form_more_health_conditions_urinary_stress_incontinence", value: "urinary_stress_incontinence", label: "Urinary stress incontinence" },
    { id: "form_more_health_conditions_polycystic_ovarian_syndrome", value: "polycystic_ovarian_syndrome", label: "Polycystic ovarian syndrome (PCOS)" },
    { id: "form_more_health_conditions_clinically_proven_low_testosterone", value: "clinically_proven_low_testosterone", label: "Clinically proven low testosterone" },
    { id: "form_more_health_conditions_osteoarthritis", value: "osteoarthritis", label: "Osteoarthritis" },
];

export default function MoreHealthConditionsPage() {
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
        window.location.href = "/intake/weight_loss_medications";
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
                            <label htmlFor="form_more_health_conditions">Do any of these apply to you?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
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
