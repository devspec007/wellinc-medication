"use client";

import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckboxCard from "@/components/CheckboxCard";

type InterestOption = {
    id: string;
    value: string;
    label: string;
};

const INTEREST_OPTIONS: InterestOption[] = [
    { id: "form_interests_maintaining_muscle_mass", value: "maintaining_muscle_mass", label: "Maintaining muscle mass as I lose weight" },
    { id: "form_interests_would_prefer_not_to_inject", value: "would_prefer_not_to_inject", label: "Would prefer not to inject" },
    { id: "form_interests_managing_potential_side_effects", value: "managing_potential_side_effects", label: "Managing potential side effects such as nausea/vomiting" },
    { id: "form_interests_assist_with_aging_and_longevity", value: "assist_with_aging_and_longevity", label: "Assist with aging and longevity (cellular/DNA damage, immune system dysfunction, etc)" },
    { id: "form_interests_improving_cognitive_function", value: "improving_cognitive_function", label: "Improving cognitive function and mental clarity" },
    { id: "form_interests_improving_energy_levels", value: "improving_energy_levels", label: "Improving energy levels" },
    { id: "form_interests_regulating_menses_and_hormonal_status", value: "regulating_menses_and_hormonal_status", label: "Regulating menses and hormonal status" },
    { id: "form_interests_improving_sleep_quality", value: "improving_sleep_quality", label: "Improving sleep quality" },
    { id: "form_interests_nothing_in_particular", value: "nothing_in_particular", label: "Nothing in particular" },
];

export default function InterestsPage() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("interests") || "{}");
        if (Array.isArray(data.interests)) {
            setSelectedInterests(data.interests);
        }
    }, []);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === "nothing_in_particular") {
            setSelectedInterests(checked ? ["nothing_in_particular"] : []);
            return;
        }

        setSelectedInterests(prev => {
            const withoutNone = prev.filter(item => item !== "nothing_in_particular");
            if (checked) {
                return [...withoutNone, value];
            }
            return withoutNone.filter(item => item !== value);
        });
    };

    const handleNext = () => {
        if (selectedInterests.length === 0) {
            toast.error("Please select at least one option.");
            return;
        }

        localStorage.setItem("interests", JSON.stringify({ interests: selectedInterests }));
        window.location.href = "/intake/dob";
    };

    return (
        <div className="w-full">
            <div className="title">
                Your needs are
                <span className="title-accent"> unique</span>, and your medicine should be, too!
            </div>
            <div className="subtitle mt-6 text-center font-semibold">
                Your GLP-1 medication is personalized to your specific needs
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_interests">Please select the following options that you are interested in</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {INTEREST_OPTIONS.map(option => (
                                <CheckboxCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_interests"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedInterests.includes(option.value)}
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
