"use client";

import { useRouter } from "next/navigation";

export default function HowPage() {
    const router = useRouter();
    const handleNext = () => {
        router.push("/intake/why");
    };
    return (
        <div className="w-full">
            <div className="title text-center">
                How will GLP-1
                <br />
                <span className="title-accent italic">work for you?</span>
            </div>
            <div className="mt-2">
                <img src="/assets/imgs/chart_metabolic.svg" alt="Chart Metabolic" className="w-full max-w-lg mx-auto" />
            </div>
            <div className="">
                <div className="text-brand-300 tracking-wide font-light">
                    <ul className="list-disc space-y-2 list-inside">
                        <li><span className="font-bold">Week 1-4:
                        </span> Your body gets acclimated to GLP-1 medication</li>
                        <li><span className="font-bold">Week 4-8:
                        </span> Weight loss is increasing more and more</li>
                        <li><span className="font-bold">Week 9+:
                        </span> Your body has become a
                            <span className="font-bold"> fat burning machine</span></li>
                    </ul>
                </div>

                <div className="text-brand-300 tracking-wide font-light mt-4">
                    We identify the
                    <span className="font-bold text-[#8C8885]"> root causes </span>
                    of your metabolic issues, so you get a
                    <span className="font-bold"> long-term solution</span>, not just another quick fix.
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
