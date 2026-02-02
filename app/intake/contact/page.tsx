"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputMask } from '@react-input/mask';
import toast from "react-hot-toast";

import { isValidEmail, isValidPhone } from '@/lib/helper';
import { initSession, signup, sendOtp, getPatientBasic } from '@/lib/api';

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("User");
    const [isAgreed, setIsAgreed] = useState(false);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem("intake-medical-review") || "{}");
            const firstName = data.firstName ?? "";
            const lastName = data.lastName ?? "";
            const fullName = `${firstName} ${lastName}`.trim();
            if (fullName) {
                setUserName(fullName);
            }
        } catch {
            // Keep default "User"
        }

        // Load contact data from localStorage if available
        try {
            const contactData = JSON.parse(localStorage.getItem("contact") || "{}");
            if (contactData.email) {
                setEmail(contactData.email);
            }
            if (contactData.phone) {
                setPhone(contactData.phone);
            }
        } catch {
            // Keep default empty values
        }
    }, []);

    const router = useRouter();

    const handleNext = () => {
        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (!isValidPhone(phone)) {
            toast.error("Please enter a valid phone number. (10 digits, starting with 2-9)");
            return;
        }
        if (!isAgreed) {
            toast.error("You must agree to the terms before proceeding.");
            return;
        }
        localStorage.setItem("contact", JSON.stringify({ email, phone }));

        // Call signup API
        // Get firstName and lastName from localStorage (from 'intake-medical-review')
        initSession().then(res => {
            if (!res.success) return toast.error("Cannot initialize session.");
            const correlationId = localStorage.getItem("client-correlation-id");
            const review = JSON.parse(localStorage.getItem("intake-medical-review") || "{}")
            const firstName = review.firstName || "";
            const lastName = review.lastName || "";

            if(correlationId) {
                getPatientBasic({ email }).then(res => {
                    if (!res.patientExists) {
                        //Sign up
                        signup({ email, phone, firstName, lastName }).then(res => {
                            if (res.token) {
                                localStorage.setItem("token", res.token);
                                toast.success("Sign up successful!");
                                router.push("/intake/treatments");
                            }
                        });
                    } else {
                        //Login-Send OTP
                        sendOtp({ email }).then(otpRes => {
                            if (otpRes.error) {
                                toast.error(otpRes.error);
                            } else {
                                toast.success("OTP sent successfully!");
                                router.push("/intake/otp");
                            }
                        });
                    }
                });
            }
        });
    };

    return (
        <div>
            <div className="title">
                <span className="title-accent">{userName}</span>, how can you be reached if necessary?
            </div>
            <div className="subtitle text-center mt-6 font-semibold">
                Our medical teams and pharmacy use email and text for patient
                communication.
            </div>
            <div className="mt-6">
                <fieldset className="space-y-6 md:space-y-8">
                    <div>
                        <label htmlFor="email" className="label mb-1">
                            Email
                        </label>
                        <input
                            required
                            placeholder="Email"
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="email"
                            value={email}
                            name="email"
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="label mb-1">
                            Phone
                        </label>
                        <InputMask
                            mask="(___) ___-____"
                            replacement={{ _: /\d/ }}
                            separate={true}
                            value={phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            inputMode="tel"
                            required
                            placeholder="(123) 456-7890"
                            className="block w-full rounded-[3px] border border-brand-75 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-75 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="tel"
                            name="form[phone]"
                            id="form_phone"
                            aria-invalid="true"
                        />
                    </div>
                    <div>
                        <label className="block select-none checkbox-simple">
                            <div className="flex items-center gap-3">
                                <div >
                                    <input
                                        required
                                        type="checkbox"
                                        checked={isAgreed}
                                        onChange={e => setIsAgreed(e.target.checked)}
                                        name="form_contact_agree"
                                        id="form_contact_agree"
                                    />
                                </div>
                                <span className="text-brand-500 leading-5">I understand that my information is never shared, is protected by HIPAA and agree to the terms and privacy policies and to be contacted as necessary by Wellinc and its medical partners and can opt-out at anytime. </span>
                            </div>
                        </label>
                    </div>
                </fieldset>
            </div>
            <div className="mt-12 sticky bottom-5">
                <input
                    type="button"
                    name="commit"
                    value="Next →"
                    className="btn-link w-full"
                    onClick={handleNext}
                />
            </div>
        </div>
    );
}