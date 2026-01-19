"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import CheckboxCard from "@/components/CheckboxCard";

type EffectOption = {
    id: string;
    value: string;
    label: string;
    iconSrc: string;
};

const EFFECT_OPTIONS: EffectOption[] = [
    { id: "form_effects_low_libido", value: "low_libido", label: "Low Libido", iconSrc: "/assets/Icons/trending_down.svg" },
    { id: "form_effects_hair_loss", value: "hair_loss", label: "Hair Loss", iconSrc: "/assets/Icons/comb.svg" },
    { id: "form_effects_skin_issues", value: "skin_issues", label: "Skin Issues", iconSrc: "/assets/Icons/celula.svg" },
    { id: "form_effects_cognition_issues", value: "cognition_issues", label: "Cognition Issues", iconSrc: "/assets/Icons/brain.svg" },
    { id: "form_effects_none_of_these", value: "none_of_these", label: "None of These", iconSrc: "/assets/Icons/none.svg" },
];

export default function UniqueEffectsPage() {
    const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
    const [gender, setGender] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("unique_effects") || "{}");
        if (Array.isArray(data.effects)) {
            setSelectedEffects(data.effects);
        }
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("gender") || "{}");
        setGender(data.gender || "");
    }, []);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === "none_of_these") {
            setSelectedEffects(checked ? ["none_of_these"] : []);
            return;
        }

        setSelectedEffects(prev => {
            const withoutNone = prev.filter(item => item !== "none_of_these");
            if (checked) {
                return [...withoutNone, value];
            }
            return withoutNone.filter(item => item !== value);
        });
    };

    const handleNext = () => {
        if (selectedEffects.length === 0) {
            toast.error("Please select at least one option.");
            return;
        }

        localStorage.setItem("unique_effects", JSON.stringify({ effects: selectedEffects }));
        if (gender === "male") {
            window.location.href = "/intake/priorities";
        } else {
            window.location.href = "/intake/pregnancy";
        }
    };

    return (
        <div className="w-full">
            <div className="title">
                {gender === "male" ? "Men experience" : "Women experience"}
                <span className="title-accent"> unique effects </span>
                from weight gain.
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_effects">Do you experience any of the following?</label>
                        </div>
                        <div className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {EFFECT_OPTIONS.map(option => (
                                <CheckboxCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_effects"
                                    value={option.value}
                                    label={option.label}
                                    iconSrc={option.iconSrc}
                                    checked={selectedEffects.includes(option.value)}
                                    onChange={handleCheckboxChange}
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
