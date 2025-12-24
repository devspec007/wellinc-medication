"use client";

export default function RankingPage() {
    const handleNext = () => {
        window.location.href = "/intake/magic";
    };
    return (
        <div className="w-full">
            <div className="title">
                Wellinc is proud to be
                <span className="title-accent"> ranked #1 </span>
                on Forbes
            </div>
            <div className="mt-6">
                <img src="/assets/imgs/forbes.png" alt="Forbes Ranking" className="w-full" />
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
