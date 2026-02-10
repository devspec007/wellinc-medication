"use client";

import { useRouter } from "next/navigation";

export default function MagicPage() {
    const router = useRouter();
    const handleNext = () => {
        router.push("/intake/testimonial_1");
    };
    return (
        <div className="w-full">
            <div className="title">
                It feels like magic, but it's
                <span className="title-accent"> metabolic science</span>.
            </div>
            <div className="mt-1">
                <img src="/assets/imgs/chart_science.svg" alt="Chart Science" className="w-full" />
            </div>
            <div className="mt-1">
                <div className="subtitle">
                    On average, Wellinc patients&nbsp;lose over
                    <span className="font-semibold"> 20% of their body weight.</span>
                </div>

                <div className="subtitle mt-4">
                    GLP-1 medications are
                    <span className="font-semibold"> extremely effective </span>
                    - offering you a strong path toward your 150 pound goal weight.
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
