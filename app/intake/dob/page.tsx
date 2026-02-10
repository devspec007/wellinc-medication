"use client";

import Select from "@/components/Select";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const MONTH_OPTIONS: { value: string; label: string }[] = [
    { value: "", label: " " },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

const DAY_OPTIONS: { value: string; label: string }[] = [
    { value: "", label: " " },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
];

export default function DobPage() {
    const router = useRouter();
    const [dobMonth, setDobMonth] = useState<string>("");
    const [dobDay, setDobDay] = useState<string>("");
    const [dobYear, setDobYear] = useState<number | "">("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("dob") || "{}");
        setDobMonth(data.dobMonth || "");
        setDobDay(data.dobDay || "");
        setDobYear(data.dobYear || "");
    }, []);

    const handleNext = () => {
        if (!dobMonth || !dobDay || !dobYear) {
            toast.error("Please enter a valid date of birth.");
            return;
        }
        if (dobYear < 1940 || dobYear > 2007) {
            toast.error("Year must be between 1940 and 2007.");
            return;
        }
        localStorage.setItem("dob", JSON.stringify({ dobMonth, dobDay, dobYear }));
        router.push("/intake/medical_review");
    };

    return (
        <div className="w-full">
            <div className="title-sm">
                What is your date of birth?
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_dob_month">Month</label>
                        </div>
                        <Select
                            id="form_dob_month"
                            name="form_dob_month"
                            value={dobMonth}
                            options={MONTH_OPTIONS}
                            onChange={(e) => setDobMonth(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_dob_day">Day</label>
                        </div>
                        <Select
                            id="form_dob_day"
                            name="form_dob_day"
                            value={dobDay}
                            options={DAY_OPTIONS}
                            onChange={(e) => setDobDay(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="label mb-1">
                            <label htmlFor="form_dob_year">Year</label>
                        </div>
                        <input
                            inputMode="tel"
                            required={true}
                            min="1940"
                            max="2007"
                            placeholder="1995"
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            value={dobYear || ""}
                            name="form_dob_year"
                            id="form_dob_year"
                            onChange={(e) => setDobYear(Number(e.target.value))}
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
