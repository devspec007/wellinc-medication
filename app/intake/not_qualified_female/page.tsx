"use client";

import { useEffect, useState } from "react";

export default function NotQualifiedFemale() {
  const handleCheckAgain = () => {
    window.location.href = "/intake/pregnancy";
  };

  const handleSelectionCorrect = () => {
    window.location.href = "/";
  };

  return (
    <div className="w-full">
      <div className="title mt-4 text-center">
        It Looks like you may not qualify...
      </div>
      <div className="mt-4">
        Based on your answers, your medical history you're not a great candidate for telemedicine. The safest course of action would have you consider working with a local doctor or clinic as certain complications may need closer monitoring or response times than telemedicine may allow.
      </div>
      <div className="subtitle mt-4">
        If you believe you're an exception and would like to have someone from our medical staff review more details or provide additional advice regarding your specific circumstances, you can schedule a call here <a className="underline" href="https://calendly.com/connie-direct-meds">Schedule a call with a Nurse</a>
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
