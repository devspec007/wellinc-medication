"use client";

export default function Testimonial3Page() {
    const handleNext = () => {
        window.location.href = "/intake/blood_pressure";
    };
    return (
        <div className="w-full">
            <div className="title">
                “Being a mom makes it so hard to stay on a diet
                <span className="title-accent"> but the weight vanished </span>
                with GLP medication!”
            </div>
            <div className="mt-6">
                <img src="/assets/imgs/before_after_3.jpg" alt="Testimonial 3" className="w-full" />
            </div>
            <div className="mt-2 mx-auto max-w-md">
                <div className="text-brand-300 italic tracking-wide text-xl text-center font-light">
                    Daiene
                    <span className="font-semibold text-[#8C8885]"> lost 90lbs </span>
                    and came off her blood pressure medication
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
