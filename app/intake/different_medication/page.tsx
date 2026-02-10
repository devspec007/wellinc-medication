"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";
import Select from "@/components/Select";

type DifferentMedicationOption = {
    id: string;
    value: string;
    label: string;
};

const DIFFERENT_MEDICATION_OPTIONS: DifferentMedicationOption[] = [
    { id: "form_different_medication_0-5_days", value: "0-5_days", label: "0-5 days" },
    { id: "form_different_medication_6-10_days", value: "6-10_days", label: "6-10 days" },
    { id: "form_different_medication_11-14_days", value: "11-14_days", label: "11-14 days" },
    { id: "form_different_medication_more_than_2_weeks_ago", value: "more_than_2_weeks_ago", label: "More than 2 weeks ago but within the past 4 weeks" },
    { id: "form_different_medication_more_than_4_weeks_ago", value: "more_than_4_weeks_ago", label: "More than 4 weeks ago" },
];

type OtherProviderDescriptionOption = {
    id: string;
    value: string;
    label: string;
};

const OTHER_PROVIDER_DESCRIPTION_OPTIONS: OtherProviderDescriptionOption[] = [
    { id: "form_different_medication_other_provider_description_doctor", value: "doctor", label: "Personal Doctor" },
    { id: "form_different_medication_other_provider_description_weight_loss_clinic", value: "weight_loss_clinic", label: "Weight Loss Clinic" },
    { id: "form_different_medication_other_provider_description_henry_meds", value: "henry_meds", label: "Henry Meds" },
    { id: "form_different_medication_other_provider_description_hims_hers", value: "hims_hers", label: "Hims/Hers" },
    { id: "form_different_medication_other_provider_description_future_health", value: "future_health", label: "Future Health" },
    { id: "form_different_medication_other_provider_description_ro", value: "ro", label: "Ro" },
    { id: "form_different_medication_other_provider_description_remedy_meds", value: "remedy_meds", label: "Remedy Meds" },
    { id: "form_different_medication_other_provider_description_mochi", value: "mochi", label: "Mochi" },
    { id: "form_different_medication_other_provider_description_medvi", value: "medvi", label: "Medvi" },
    { id: "form_different_medication_other_provider_description_eden", value: "eden", label: "Eden" },
    { id: "form_different_medication_other_provider_description_noom", value: "noom", label: "Noom" },
    { id: "form_different_medication_other_provider_description_other", value: "other", label: "Other" },
];

export default function DifferentMedicationPage() {
    const router = useRouter();
    const [selectedDifferentMedication, setSelectedDifferentMedication] = useState<string | "">("");
    const [listOfMedications, setListOfMedications] = useState<string | "">("");
    const [otherProviderDescription, setOtherProviderDescription] = useState<string | "">("");
    const [selectedOtherProvider, setSelectedOtherProvider] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("different_medication") || "{}");
        if (data.different_medication) {
            setSelectedDifferentMedication(data.different_medication);
        }
        if (data.list_of_medications) {
            setListOfMedications(data.list_of_medications);
        }
        if (data.other_provider_description) {
            setOtherProviderDescription(data.other_provider_description);
        }
        if (data.selected_other_provider) {
            setSelectedOtherProvider(data.selected_other_provider);
        }
    }, []);

    const handleNext = () => {
        if (!selectedDifferentMedication) {
            toast.error("Please select your different medication.");
            return;
        }
        if (!listOfMedications) {
            toast.error("Please list the name, dose, and frequency of your different medication.");
            return;
        }
        if (!otherProviderDescription) {
            toast.error("Please select the provider who prescribed your weight loss medication.");
            return;
        }
        localStorage.setItem("different_medication", JSON.stringify({ different_medication: selectedDifferentMedication, list_of_medications: listOfMedications, other_provider_description: otherProviderDescription, selected_other_provider: selectedOtherProvider }));
        router.push("/intake/diet_exercise_willingness");
    };
    return (
        <div className="w-full">
            <div className="title mb-6">
                <strong>Great,</strong> You have experience with weight loss medications.
            </div>
            <div>
                <div className="label mb-1">
                    <label htmlFor="form_list_of_medications">Please list the name, dose, and frequency of your weight loss medication.</label>
                </div>
                <textarea
                    rows={4}
                    className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] resize-none mb-6"
                    name="form_list_of_medications"
                    id="form_list_of_medications"
                    placeholder="Ex: Semaglutide 1mg, once weekly"
                    value={listOfMedications}
                    onChange={(e) => setListOfMedications(e.target.value)}
                />
            </div>
            <div>
                <fieldset className="space-y-6 md:space-y-8 mb-6">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_different_medication">When was your last dose of medication?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {DIFFERENT_MEDICATION_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_different_medication"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedDifferentMedication === option.value}
                                    onChange={() => setSelectedDifferentMedication(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                </fieldset>
            </div>
            <div>
                <div className="label mb-4">
                    <label htmlFor="form_other_provider_description">Who prescribed your weight loss medication?</label>
                </div>
                <div className="mb-4">
                    <span className="text-brand-75 text-base">Select Provider:</span>
                    <Select
                        id="form_other_provider_description"
                        name="form_other_provider_description"
                        value={selectedOtherProvider}
                        options={OTHER_PROVIDER_DESCRIPTION_OPTIONS}
                        onChange={(e) => setOtherProviderDescription(e.target.value)}
                    />
                </div>
                <div>
                    <span className="text-brand-75 text-base">if other, please describe:</span>
                    <textarea
                        rows={2}
                        className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] resize-none mb-6"
                        name="form_other_provider_description"
                        id="form_other_provider_description"
                        value={otherProviderDescription}
                        onChange={(e) => setOtherProviderDescription(e.target.value)}
                    />
                </div>
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
