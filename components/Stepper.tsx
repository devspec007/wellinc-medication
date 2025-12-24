"use client";

import Link from "next/link";

export type Step = {
  name: string;
};

interface StepperProps {
  steps: Step[];
  backHref?: string;
  activeStepIndex?: number;
}

export default function Stepper({ steps, backHref = "#", activeStepIndex }: StepperProps) {
  // Default to index 0 if activeStepIndex is not provided
  const defaultActiveIndex = activeStepIndex !== undefined ? activeStepIndex : 0;
  
  // Determine step state: completed, active, or future
  const getStepState = (index: number) => {
    if (index < defaultActiveIndex) return "completed";
    if (index === defaultActiveIndex) return "active";
    return "future";
  };

  return (
    <div className="mt-4 px-6 pb-6 border-brand-50 lg:border-b">
      <div className="max-w-md mx-auto lg:max-w-none">
        <div id="trim-glp1-progress" className="relative w-full lg:sticky lg:top-0 z-11">
          {/* Back Button */}
          {backHref && (
            <Link
              className="progress-back-button absolute top-1/2 -translate-y-1/2 z-12 inline-flex items-center justify-center h-11 min-w-[60px] bg-transparent text-brand-500 transition-opacity duration-200 ease-out hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              aria-label="Go back"
              style={{ left: "calc((100% - 100vw) / 2)" }}
              href={backHref}
            >
              <svg
                className="h-7 w-7 md:h-9 md:w-9"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Go back</span>
            </Link>
          )}

          {/* Progress Indicator */}
          <nav aria-label="Progress" className="w-full px-16 sm:px-20 lg:px-24">
            <ol className="flex w-full flex-nowrap items-center justify-center gap-0" role="list">
              {steps.map((step, index) => {
                const state = getStepState(index);
                const isCompleted = state === "completed";
                const isActive = state === "active";
                const isFuture = state === "future";
                
                return (
                  <div key={step.name} className="contents">
                    <li className="flex shrink-0 items-center gap-2 sm:gap-3">
                      <div
                        className="flex items-center justify-center rounded-full border-2 h-7 w-7 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-8 lg:w-8 transition-all duration-200 ease-out"
                        style={{
                          borderColor: isCompleted || isActive ? "var(--color-accent-300)" : "var(--color-brand-75)",
                          background: isCompleted ? "var(--color-accent-300)" : "transparent",
                        }}
                        aria-hidden="true"
                      >
                        {isCompleted && (
                          <svg
                            className="h-4 w-4"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 9.2L7.2 12.3L14 5.4"
                              stroke="#FEFEFE"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            ></path>
                          </svg>
                        )}
                        {isActive && (
                          <span
                            className="h-3.5 w-3.5 rounded-full"
                            style={{ background: "var(--color-accent-300)" }}
                            aria-hidden="true"
                          ></span>
                        )}
                      </div>
                      <span
                        className={`step-name line-clamp-2 whitespace-nowrap sm:text-sm md:text-base xl:text-base font-medium max-w-[56px] sm:max-w-[92px] md:max-w-[132px] ${
                          isCompleted
                            ? "hidden lg:inline-flex text-accent-200"
                            : isActive
                            ? "hidden md:inline-flex text-accent-300"
                            : "hidden lg:inline-flex text-brand-75"
                        }`}
                        style={{
                          color: isCompleted
                            ? "var(--color-accent-200)"
                            : isActive
                            ? "var(--color-accent-300)"
                            : "var(--color-brand-75)",
                          opacity: isCompleted ? 0.75 : 1,
                        }}
                      >
                        {step.name}
                      </span>
                    </li>
                    {index < steps.length - 1 && (
                      <div
                        className="flex-1 border-t-2 min-w-[12px] sm:min-w-[20px] md:min-w-[28px] lg:min-w-[36px] sm:max-w-[36px] md:max-w-[48px] lg:max-w-[40px] mx-0.5 sm:mx-1 lg:mx-2"
                        style={{
                          borderTopColor: index < defaultActiveIndex ? "var(--color-accent-200)" : "var(--color-brand-75)",
                          borderColor: index < defaultActiveIndex ? "var(--color-accent-200)" : "var(--color-brand-75)",
                        }}
                        aria-hidden="true"
                      ></div>
                    )}
                  </div>
                );
              })}
            </ol>
          </nav>

          {/* Right Spacer */}
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{
              minWidth: "60px",
              right: "calc((100% - 100vw) / 2)",
            }}
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  );
}

