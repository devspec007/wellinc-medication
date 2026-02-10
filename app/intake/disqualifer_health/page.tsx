"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Configuration mapping for different caller pages
const CALLER_CONFIG: Record<string, { backHref: string; checkAgainUrl: string }> = {
  health_conditions: {
    backHref: "/intake/testimonial_2",
    checkAgainUrl: "/intake/health_conditions",
  },
  more_health_conditions: {
    backHref: "/intake/health_conditions",
    checkAgainUrl: "/intake/more_health_conditions",
  },
};

export default function DisqualifyingHealthConditions() {
  const router = useRouter();
  const [checkAgainUrl, setCheckAgainUrl] = useState("/intake/health_conditions");
  const [backHref, setBackHref] = useState("/intake/testimonial_2");

  useEffect(() => {
    // Read the 'from' parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const caller = urlParams.get("from") || "health_conditions";
    const config = CALLER_CONFIG[caller] || CALLER_CONFIG.health_conditions;
    
    setCheckAgainUrl(config.checkAgainUrl);
    setBackHref(config.backHref);
    
    // Store backHref in localStorage for layout to access
    localStorage.setItem("disqualifer_health_backHref", config.backHref);
  }, []);

  const handleCheckAgain = () => {
    router.push(checkAgainUrl);
  };

  const handleSelectionCorrect = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="w-full">
      <div className="title mt-4 text-center">
        It Looks like you have a disqualifying health condition...
      </div>
      <div className="mt-4">
        Based on your answers, you have a disqualifying health condition. The safest course of action would have you consider working with a local doctor or clinic as certain complications may need closer monitoring or response times than telemedicine may allow.
      </div>
      <div className="mt-12 sticky bottom-5">
        <input
          type="button"
          name="commit"
          value="Check Again"
          className="btn-link w-full"
          data-disable-with="Check Again"
          onClick={handleCheckAgain}
        />
      </div>
      <div className="mt-12 sticky bottom-5">
        <input
          type="button"
          name="commit"
          value="Back to Home"
          className="btn-link w-full"
          data-disable-with="My Selection is Correct"
          onClick={handleSelectionCorrect}
        />
      </div>
    </div>
  );
}
