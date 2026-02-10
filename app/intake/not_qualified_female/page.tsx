"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotQualifiedFemale() {
  const router = useRouter();
  const handleCheckAgain = () => {
    router.push("/intake/pregnancy");
  };

  const handleSelectionCorrect = () => {
    router.push("/");
  };

  return (
    <div className="w-full">
      <div className="title mt-4 text-center">
        It Looks like you may not qualify...
      </div>
      <div className="mt-4">
        Based on your answers, your medical history you're not a great candidate for telemedicine. The safest course of action would have you consider working with a local doctor or clinic as certain complications may need closer monitoring or response times than telemedicine may allow.
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
