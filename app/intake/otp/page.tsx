"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginWithOtp } from '@/lib/api';

const OTP_LENGTH = 6;

export default function OtpPage() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const router = useRouter();

  // Handle value change or paste on a single input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "");

    if (val.length === 1) {
      // Single digit entered
      updateOtp(idx, val);
      // Move focus to next
      if (idx < OTP_LENGTH - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    } else if (val.length > 1) {
      // Pasting multiple digits!
      handlePaste(val, idx);
    } else {
      updateOtp(idx, "");
    }
  };

  // Updates the OTP state, single index
  const updateOtp = (idx: number, value: string) => {
    setOtp(prev => {
      const newArr = [...prev];
      newArr[idx] = value;
      return newArr;
    });
  };

  // Handle backspace to auto-focus previous
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      updateOtp(idx - 1, "");
      inputsRef.current[idx - 1]?.focus();
    }
    // Optionally: allow arrow navigation
    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle collective paste
  const handlePaste = (pastedValue: string, startIdx: number) => {
    const numbers = pastedValue.replace(/[^0-9]/g, "").split("");
    setOtp(prev => {
      const newArr = [...prev];
      for (let i = 0; i < numbers.length; i++) {
        if (startIdx + i < OTP_LENGTH) {
          newArr[startIdx + i] = numbers[i];
        }
      }
      return newArr;
    });
    // Focus the last filled box
    const focusIdx = Math.min(startIdx + numbers.length - 1, OTP_LENGTH - 1);
    setTimeout(() => {
      inputsRef.current[focusIdx]?.focus();
    }, 10);
  };

  // Optionally handle onPaste event for the field
  const handlePasteEvent = (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
    const text = e.clipboardData.getData("Text");
    if (text) {
      e.preventDefault();
      handlePaste(text, idx);
    }
  };

  // Automatically attempt login when 6 digits are entered
  useEffect(() => {
    const otpValue = otp.join("");
    if (otpValue.length === OTP_LENGTH && !submitting && !hasLoggedIn) {
      setSubmitting(true);
      // Get email from localStorage (should match signup step)
      let email = "";
      try {
        const saved = JSON.parse(localStorage.getItem("contact") || "{}")
        email = saved.email || "";
      } catch {}
      if (!email) {
        toast.error("Could not find email for OTP login.");
        setSubmitting(false);
        return;
      }
      loginWithOtp({ email, otp: otpValue }).then(res => {
        setSubmitting(false);
        if (res.token) {
          toast.success("OTP verified successfully!");
          localStorage.setItem("token", res.token);
          router.push("/intake/treatments");
          setHasLoggedIn(true);
        } else if (res.error) {
          toast.error(res.error);
          // Reset OTP state for retry
          setOtp(Array(OTP_LENGTH).fill(""));
          inputsRef.current[0]?.focus();
        } else {
          toast.error("Unexpected error verifying OTP.");
        }
      });
    }
    // reset hasLoggedIn if user clears input
    if (otpValue.length < OTP_LENGTH && hasLoggedIn) {
      setHasLoggedIn(false);
    }
  }, [otp, submitting, hasLoggedIn]);

  return (
    <div className="max-w-sm mx-auto pt-12">
      <h2 className="text-2xl font-bold mb-2 text-center">Enter the OTP</h2>
      <p className="mb-8 text-center text-brand-400">We've sent a 6-digit verification code to your email.</p>
      <div className="flex justify-center gap-2 mb-8">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={el => { inputsRef.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            onPaste={e => handlePasteEvent(e, idx)}
            disabled={submitting || hasLoggedIn}
            className="w-12 h-12 text-center text-xl border rounded focus:border-brand-300 focus:ring-2 focus:ring-brand-200 outline-none transition bg-white disabled:bg-gray-100 disabled:text-gray-400"
            style={{ letterSpacing: "2px" }}
          />
        ))}
      </div>
    </div>
  );
}