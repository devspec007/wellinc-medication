"use client";

import { useEffect, useState } from "react";

export default function Testimonial1Page() {
    const [gender, setGender] = useState<string | "">("");
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("gender") || "{}");
        setGender(data.gender || "");
    }, []);

    const handleNext = () => {
        window.location.href = "/intake/how";
    };
    return (
        gender === "female" ? (
            <div className="w-full">
                <div className="title">
                    "Nothing has worked like this. I am down
                    <span className="title-accent"> 25lbs in 5 weeks. </span>
                    I've never experienced anything like it. I have more
                    <span className="title-accent"> energy and confidence </span>
                    than I've had in years!"
                </div>
                <div className="mt-6">
                    <img src="/assets/imgs/before_after_1_female.jpg" alt="Testimonial 1" className="w-full" />
                </div>
                <div className="mt-2 mx-auto max-w-md">
                    <div className="text-brand-300 italic tracking-wide text-xl text-center font-light">
                        Sarah
                        <span className="font-semibold"> dropped </span>
                        52lbs and
                        <span className="font-semibold"> upped </span>
                        her confidence in
                        <span className="font-semibold text-[#8C8885]"> only 3 months!</span>
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
        ) : gender === "male" ? (
            <div className="w-full">
                <div className="title">
                    "Nothing has worked like this. I am down
                    <span className="title-accent"> 65lbs in 6 months. </span>
                    I have more
                    <span className="title-accent"> energy and confidence </span>
                    than I've had in years!"
                </div>
                <div className="mt-6">
                    <img src="/assets/imgs/before_after_1_male.jpg" alt="Testimonial 1" className="w-full" />
                </div>
                <div className="mt-2 mx-auto max-w-md">
                    <div className="text-brand-300 italic tracking-wide text-xl text-center font-light">
                        Kelly
                        <span className="font-semibold"> dropped </span>
                        his blood pressure and
                        <span className="font-semibold"> upped </span>
                        his confidence in
                        <span className="font-semibold text-[#8C8885]"> only 5 weeks!</span>
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
        ) : (
            <div className="h-full w-full"></div>
        )
    );
}
