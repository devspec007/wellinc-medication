"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { verifyIdentity, withTokenRefresh } from "@/lib/api";

export default function SsnVerificationPage() {
  const [ssn, setSsn] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setSsn(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (ssn.length !== 4) {
      toast.error("Please enter 4 digits");
      return;
    }

    setSubmitting(true);

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      setSubmitting(false);
      router.push("/intake/contact");
      return;
    }

    const result = await withTokenRefresh(
      verifyIdentity,
      token,
      [ssn],
      {
        on404: () => router.push("/intake/contact"),
      }
    );
    
    setSubmitting(false);

    if (!result || result.error) {
      toast.error(result?.error || "Failed to verify identity");
    } else if (result.data?.verified === true) {
      toast.success(result.data?.message || "Identity verified successfully!");
      localStorage.clear();
      router.push("/");
    } else {
      toast.error("Identity verification failed. Please check your SSN and try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto pt-12 px-4">
      <h2 className="text-2xl font-bold mb-2 text-center">Verify Your Identity</h2>
      <p className="mb-8 text-center text-brand-400">
        Please enter the last 4 digits of your Social Security Number
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="ssn" className="block text-sm font-medium mb-2">
            Last 4 digits of SSN
          </label>
          <input
            id="ssn"
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={ssn}
            onChange={handleChange}
            disabled={submitting}
            placeholder="****"
            className="w-full h-12 px-4 text-center text-xl border rounded-lg focus:border-brand-300 focus:ring-2 focus:ring-brand-200 outline-none transition bg-white disabled:bg-gray-100 disabled:text-gray-400"
            style={{ letterSpacing: "4px" }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting || ssn.length !== 4}
          className="w-full h-12 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {submitting ? "Verifying..." : "Verify Identity"}
        </button>
      </form>
    </div>
  );
}

