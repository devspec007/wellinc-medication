"use client";

export default function Testimonial2Page() {
    const handleNext = () => {
        window.location.href = "/intake/health_conditions";
    };
    return (
        <div className="w-full">
            <div className="title">
                “I was
                <span className="title-accent"> ready to give up</span>. After seeing reviews of GLP-1, I had to try.
                <span className="title-accent"> 6 months later - wow</span>. Thank you for the metabolic reset - game changer.”
            </div>
            <div className="mt-6">
                <img src="/assets/imgs/before_after_2.jpg" alt="Testimonial 2" className="w-full" />
            </div>
            <div className="mt-2 mx-auto max-w-md">
                <div className="text-brand-300 italic tracking-wide text-xl text-center font-light">
                    Kristin
                    <span className="font-semibold text-[#8C8885]"> lost 29lbs </span>
                    and has renewed confidence
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
