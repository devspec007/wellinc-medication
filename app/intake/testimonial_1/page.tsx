"use client";

export default function Testimonial1Page() {
    const handleNext = () => {
        window.location.href = "/intake/how";
    };
    return (
        <div className="w-full">
            <div className="title">
                "It really does work. Took about 6 weeks to feel it, but once it kicked in,
                <span className="title-accent"> I dropped 20 pounds of fat </span>
                and haven't looked back. Thank you Wellinc!"
            </div>
            <div className="mt-6">
                <img src="/assets/imgs/before_after_1.jpg" alt="Testimonial 1" className="w-full" />
            </div>
            <div className="mt-2 mx-auto max-w-md">
                <div className="text-brand-300 italic tracking-wide text-xl text-center font-light">
                    Tania took control and
                    <span className="font-semibold"> doubled </span>
                    her confidence in
                    <span className="font-semibold text-[#8C8885]"> only 2 months.</span>
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
