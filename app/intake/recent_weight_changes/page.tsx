"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import { updateQuestionnaire } from "@/lib/helper";

type RecentWeightChangesOption = {
    id: string;
    value: string;
    label: string;
};

const RECENT_WEIGHT_CHANGES_OPTIONS: RecentWeightChangesOption[] = [
    { id: "form_recent_weight_changes_lost_significant_amount", value: "lost_significant_amount", label: "Lost a significant amount" },
    { id: "form_recent_weight_changes_lost_little", value: "lost_little", label: "Lost a little" },
    { id: "form_recent_weight_changes_about_same", value: "about_same", label: "About the same" },
    { id: "form_recent_weight_changes_gained_little", value: "gained_little", label: "Gained a little" },
    { id: "form_recent_weight_changes_gained_significant_amount", value: "gained_significant_amount", label: "Gained a significant amount" },
];

const TITLE = "Has your weight changed in the last year?";

export default function RecentWeightChangesPage() {
    const router = useRouter();
    const [selectedRecentWeightChanges, setSelectedRecentWeightChanges] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("recent_weight_changes") || "{}");
        if (data.recent_weight_changes) {
            setSelectedRecentWeightChanges(data.recent_weight_changes);
        }
    }, []);

    const handleNext = () => {
        if (!selectedRecentWeightChanges) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("recent_weight_changes", JSON.stringify({ recent_weight_changes: selectedRecentWeightChanges }));
        const selectedOption = RECENT_WEIGHT_CHANGES_OPTIONS.find(opt => opt.value === selectedRecentWeightChanges);
        updateQuestionnaire({
            type: "multiple-choice",
            id: "q14",
            text: TITLE,
            answer: selectedOption ? [selectedOption.label] : [],
            options: RECENT_WEIGHT_CHANGES_OPTIONS.map(option => option.label),
        });
        router.push("/intake/testimonial_3");
    };
    return (
        <div className="w-full">
            <div>
                <img className="w-full" src="/assets/imgs/scale.png" alt="Scale" />
            </div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_recent_weight_changes">{TITLE}</label>
                        </div>
                        <div className="w-full mt-4 space-y-2">
                            {RECENT_WEIGHT_CHANGES_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_recent_weight_changes"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedRecentWeightChanges === option.value}
                                    onChange={() => setSelectedRecentWeightChanges(option.value)}
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
        </div >
    );
}
