"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RadioCard from "@/components/RadioCard";

type AdditionalInformationOption = {
    id: string;
    value: string;
    label: string;
};

const ADDITIONAL_INFORMATION_OPTIONS: AdditionalInformationOption[] = [
    { id: "form_additional_information_yes", value: "yes", label: "Yes" },
    { id: "form_additional_information_no", value: "no", label: "No" },
];

export default function AdditionalInformationPage() {
    const [selectedAdditionalInformation, setSelectedAdditionalInformation] = useState<string | "">("");
    const [additionalInformationDetails, setAdditionalInformationDetails] = useState<string | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("additional_information") || "{}");
        if (data.additional_information) {
            setSelectedAdditionalInformation(data.additional_information);
        }
        if (data.additional_information_details) {
            setAdditionalInformationDetails(data.additional_information_details);
        }
    }, []);

    const handleNext = () => {
        if (!selectedAdditionalInformation) {
            toast.error("Please select your answer.");
            return;
        }
        localStorage.setItem("additional_information", JSON.stringify({ additional_information: selectedAdditionalInformation, additional_information_details: additionalInformationDetails }));
        window.location.href = "/intake/interests";
    };
    return (
        <div className="w-full">
            <div>
                <img className="w-full" src="/assets/imgs/doctor_1.png" alt="Doctor 1" />
            </div>
            <div className="title mt-2">
                Wellinc medical providers review every form
                <span className="title-accent"> within 24 hours</span>
            </div>
            <div className="mt-4">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_additional_information">Do you have any further information which you would like our medical team to know?</label>
                        </div>
                        <div className="w-full mt-4 w-full space-y-2">
                            {ADDITIONAL_INFORMATION_OPTIONS.map(option => (
                                <RadioCard
                                    key={option.id}
                                    id={option.id}
                                    name="form_additional_information"
                                    value={option.value}
                                    label={option.label}
                                    checked={selectedAdditionalInformation === option.value}
                                    onChange={() => setSelectedAdditionalInformation(option.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_additional_information_details">Provide details here. Please do not include urgent or emergency medical information if necessary.</label>
                        </div>
                        <textarea
                            rows={4}
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] resize-none"
                            name="form_additional_information_details"
                            id="form_additional_information_details"
                            value={additionalInformationDetails}
                            onChange={(e) => setAdditionalInformationDetails(e.target.value)}
                        />
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
