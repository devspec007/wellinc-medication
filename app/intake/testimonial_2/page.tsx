"use client";

import { useEffect, useState } from "react";

export default function Testimonial2Page() {
    const [gender, setGender] = useState<string | "">("");
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("gender") || "{}");
        setGender(data.gender || "");
    }, []);

    const handleNext = () => {
        window.location.href = "/intake/health_conditions";
    };
    return (
        gender === "female" ? (
            <div className="w-full">
                <div className="title">
                    "I am
                    <span className="title-accent"> so shocked </span>
                    that this
                    <span className="title-accent"> actually works! </span>
                    Nothing I have ever tried worked for me. I am so happy thanks to
                    <span className="title-accent"> Wellinc.</span>
                    "
                </div>
                <div className="mt-6">
                    <img src="/assets/imgs/before_after_2_female.jpg" alt="Testimonial 2" className="w-full" />
                </div>
                <div className="mt-2 mx-auto max-w-md">
                    <div className="text-brand-300 italic tracking-wide text-xl text-center font-light">
                        Leilani went from
                        <span className="font-semibold"> beautiful </span>
                        to
                        <span className="font-semibold"> stunning </span>
                        and is currently
                        <span className="font-semibold"> down </span>
                        <span className="font-semibold text-[#8C8885]"> 80lbs!</span>
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
                    "I take it once a week and I cannot beleive
                    <span className="title-accent"> how fast I am losing weight. </span>
                    I just don't eat like I used to."
                </div>
                <div className="mt-6">
                    <img src="/assets/imgs/before_after_2_male.jpg" alt="Testimonial 2" className="w-full" />
                </div>
                <div className="mt-2 mx-auto max-w-md">
                    <div className="text-brand-300 italic tracking-wide text-xl text-center font-light">
                        Bronson is
                        <span className="font-semibold"> down </span>
                        to 220lbs from 245lbs and has
                        <span className="font-semibold"> upped </span>
                        his confidence in
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
        ) : (
            <div className="h-full w-full"></div>
        )
    );
}
