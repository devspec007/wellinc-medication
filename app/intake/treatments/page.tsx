"use client";

import { useEffect, useState, useRef } from "react";
import { answerQuestions, getMembershipPlans, updatePatient, withTokenRefresh } from "@/lib/api";
import toast from "react-hot-toast";

import { getPlanColors, isValidPhone } from "@/lib/helper";
import { useRouter } from "next/navigation";

export default function TreatmentsPage() {
  const [plans, setPlans] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const selectPlanRef = useRef<HTMLDivElement | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const submitQuestionsRef = useRef<boolean>(false);

  const router = useRouter();
  const handleSelect = (keyString: "Semaglutide" | "Tirzepatide") => {
    const plan = plans?.find((p: any) =>
      p.name?.toLowerCase().includes(keyString.toLowerCase())
    );

    if (plan) {
      const monthlyPrice = plan.variants.find(
        (variant: any) => variant.paymentSchedule === "Monthly"
      ).price;
      const structuredVariants = plan.variants.map((variant: any) => ({
        id: variant.id,
        name: variant.name,
        price: getPrice(variant.paymentSchedule, variant.price),
        description: variant.metadata.details,
        isPopular: variant.metadata.disclaimerText ? true : false,
        weeksSupply: getSupplyWeek(variant.paymentSchedule),
        savingPrice: getSavingPrice(
          monthlyPrice,
          variant.price,
          variant.paymentSchedule
        ),
      }));

      setSelectedPlan(plan);
      setSelectedVariant(structuredVariants);
    }
  };

  const handleSelectVariant = (variantId: string) => {
    let productGroupId = null;
    let imgSrc = null;
    if(selectedPlan?.name.toLowerCase().includes("semaglutide")) {
      productGroupId = 3;
      imgSrc = "/assets/imgs/Semaglutide.jpg";
    } else {
      productGroupId = 7;
      imgSrc = "/assets/imgs/Tirzepatide.jpg";
    }
    
    const selectedProduct = {
      medication: selectedPlan?.name,
      deliveryPlan: selectedVariant.find((v: any) => v.id === variantId)?.name,
      totalSavings: selectedVariant.find((v: any) => v.id === variantId)?.savingPrice,
      monthlyPrice: selectedVariant.find((v: any) => v.id === variantId)?.price,
      totalPrice: selectedPlan?.variants.find((v: any) => v.id === variantId)?.price,
      imgSrc,
      productGroupId,
      membershipPlanId: selectedPlan?.id,
      membershipPlanVariantId: variantId,
    }
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    window.location.href = "/intake/checkout";
  };

  const getSupplyWeek = (weeksSupply: string) => {
    switch (weeksSupply) {
      case "Quarterly":
        return "12 Week Supply";
      case "SixMonth":
        return "24 Week Supply";
      case "Yearly":
        return "48 Week supply";
      default:
        return "4 Week Supply";
    }
  };

  const getSavingPrice = (
    monthlyPrice: number,
    variantPrice: number,
    paymentSchedule: string
  ) => {
    switch (paymentSchedule) {
      case "Quarterly":
        return monthlyPrice * 3 - variantPrice;
      case "SixMonth":
        return monthlyPrice * 6 - variantPrice;
      case "Yearly":
        return monthlyPrice * 12 - variantPrice;
      default:
        return 0;
    }
  };

  const getPrice = (paymentSchedule: string, price: number) => {
    switch (paymentSchedule) {
      case "Quarterly":
        return Math.floor(price / 3);
      case "SixMonth":
        return Math.floor(price / 6);
      case "Yearly":
        return Math.floor(price / 12);
      default:
        return price;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      router.push("/intake/medication_review");
      return;
    }
    const review = JSON.parse(localStorage.getItem("intake-medical-review") || "{}")
    const firstName = review.firstName || "";
    const lastName = review.lastName || "";
    const gender = JSON.parse(localStorage.getItem("gender") || "{}").gender || "";
    const contactData = JSON.parse(localStorage.getItem("contact") || "{}");
    const phoneRaw = contactData.phone || "";
    // Extract only digits from phone number
    const phoneDigits = phoneRaw.replace(/\D/g, '');
    // Validate phone number and only include if valid
    const isValidPhoneNumber = isValidPhone(phoneRaw);
    const dob = JSON.parse(localStorage.getItem("dob") || "{}");
    const dateOfBirth = `${dob.dobMonth}/${dob.dobDay}/${dob.dobYear}`;
    (async () => {
      const patientData: any = {
        firstName,
        lastName,
        sexAtBirth: gender,
        dateOfBirth: dateOfBirth,
      };
      
      // Only add phoneNumber if it's valid
      if (isValidPhoneNumber && phoneDigits) {
        patientData.phoneNumber = phoneDigits;
      }
      
      const res = await withTokenRefresh(
        updatePatient,
        token,
        [patientData],
        { on404: () => router.push("/intake/medication_review"),
          onError: (error: any) => {
            console.log(error);
          }
        }
      );
    })();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      router.push("/intake/medication_review");
      return;
    }

    (async () => {
      setLoading(true);
      const res = await withTokenRefresh(
        getMembershipPlans,
        token,
        [],
        { on404: () => router.push("/intake/contact") }
      );

      if (res && !res?.error && res?.plans) {
        setPlans(res.plans);
        setLoading(false);
        return;
      }

      setLoading(false);
      if (!res) {
        return; // Error already handled by wrapper
      }
      router.push("/intake/contact");
    })();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("isQuestionSubmitted") == "true") return;
    if (submitQuestionsRef.current) return;
    submitQuestionsRef.current = true;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      router.push("/intake/medication_review");
      return;
    }

    const questions = JSON.parse(localStorage.getItem("Questionnaire") || "[]");
    if (questions.length == 0) {
      toast.error("No questionnires found.");
      return;
    }

    (async () => {
      const res = await withTokenRefresh(
        answerQuestions,
        token,
        [questions],
        { on404: () => router.push("/intake/contact") }
      );

      if (res && res.success) {
        localStorage.setItem("isQuestionSubmitted", "true");
        return;
      }

      if (!res) {
        return; // Error already handled by wrapper
      }

      router.push("/intake/contact");
    })();
  }, []);

  useEffect(() => {
    if (selectPlanRef.current) {
      selectPlanRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPlan]);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[40vh]">
        <span className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-brand-500"></span>
        <span className="mt-4 text-brand-500 font-semibold">
          Loading plans...
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-2 rounded-lg text-brand-300 px-4 py-2 text-center text-lg font-medium bg-[#3381EF1F]">
        <span className="ml-2 font-semibold">
          Your order is reserved for
          <span className="font-bold text-[#3381EF] whitespace-nowrap">
            <span className="text-xl"> {formatTime(timeRemaining)}</span>min
          </span>
        </span>
      </div>
      <div className="mt-6 text-center text-brand-500">
        <span
          className="
            inline-block font-black text-xl xs:text-2xl px-1 tracking-tight
            bg-[linear-gradient(180deg,transparent_70%,var(--color-blue-300)_70%,var(--color-blue-300)_88%,transparent_88%)]
            bg-no-repeat whitespace-nowrap
          "
        >
          Same Price. All Dosage Levels.
        </span>
        <div className="font-light text-lg xs:text-xl leading-5">
          No Hidden Fees. Everything Included.
        </div>
      </div>
      {/* Select Treatment */}
      <div className="mt-12">
        <div className="flex items-center gap-1.5">
          <div className="bg-brand-500 text-white rounded-full px-4 py-1 text-base font-semibold">
            Step 1
          </div>
          <div className="text-brand-500 font-medium text-2xl tracking-tight">
            Select Treatment
          </div>
        </div>
        {/* Semaglutide */}
        <div className="mt-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div
              className={`relative p-4 bg-white rounded cursor-pointer hover:bg-grey-200 ${selectedPlan?.name.includes("Semaglutide")
                  ? "ring-2 ring-[#1F3E5B]"
                  : "ring ring-brand-75"
                }`}
              onClick={() => handleSelect("Semaglutide")}
            >
              <div className="flex gap-4">
                <div
                  className="
                        shrink-0 rounded overflow-hidden flex justify-center items-center h-26
                        sm:h-30 w-26 sm:w-30 pt-1
                      "
                  style={{
                    backgroundColor:
                      getPlanColors("Semaglutide").backgroundColor,
                  }}
                >
                  <img className="w-8/10" src="/assets/imgs/Semaglutide.jpg" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xl leading-6 font-semibold pr-5 self-start">
                    Semaglutide
                  </div>
                  <div className="text-base leading-5 text-[#455F77]">
                    Proven, effective, more affordable.
                  </div>
                  <div
                    className="mt-1 flex items-center text-base leading-6"
                    style={{ color: "#2ed296" }}
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-4 mr-1"
                      >
                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                          clipRule="evenodd"
                        ></path>
                        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                      </svg>
                    </div>
                    <div className="font-medium">More Affordable</div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute right-2.5 top-3 bg-white rounded-full ${selectedPlan?.name.includes("Semaglutide") ? "" : "hidden"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-8 text-brand-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>

              <div
                className={`absolute right-4 top-4 bg-white ${selectedPlan?.name.includes("Semaglutide") ? "hidden" : ""
                  }`}
              >
                <div className="h-6 w-6 rounded-full ring-2 ring-brand-75"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Tirzepatide */}
        <div className="mt-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div
              className={`relative p-4 bg-white rounded cursor-pointer hover:bg-grey-200 ${selectedPlan?.name.includes("Tirzepatide")
                  ? "ring-2 ring-[#1F3E5B]"
                  : "ring ring-brand-75"
                }`}
              onClick={() => handleSelect("Tirzepatide")}
            >
              <div className="flex gap-4">
                <div
                  className="
                        shrink-0 rounded overflow-hidden flex justify-center items-center h-26
                        sm:h-30 w-26 sm:w-30 pt-1
                      "
                  style={{
                    backgroundColor:
                      getPlanColors("Tirzepatide").backgroundColor,
                  }}
                >
                  <img className="w-8/10" src="/assets/imgs/Tirzepatide.jpg" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xl leading-6 font-semibold pr-5 self-start">
                    Tirzepatide
                  </div>
                  <div className="text-base leading-5 text-[#455F77]">
                    Faster results, dual-action, but more expensive.
                  </div>
                  <div
                    className="mt-1 flex items-center text-base leading-6"
                    style={{ color: "#00598d" }}
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-medium">Fastest Results</div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute right-2.5 top-3 bg-white rounded-full ${selectedPlan?.name.includes("Tirzepatide") ? "" : "hidden"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-8 text-brand-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>

              <div
                className={`absolute right-4 top-4 bg-white ${selectedPlan?.name.includes("Tirzepatide") ? "hidden" : ""
                  }`}
                aria-hidden="true"
              >
                <div className="h-6 w-6 rounded-full ring-2 ring-brand-75"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Select Your Plan */}
      <div
        ref={selectPlanRef}
        className={`mt-12 scroll-mt-15 ${selectedPlan ? "" : "hidden"}`}
      >
        <div className="flex items-center gap-1.5">
          <div className="bg-brand-500 text-white rounded-full px-4 py-1 text-base font-semibold">
            Step 2
          </div>
          <div className="text-brand-500 font-medium text-2xl tracking-tight">
            Select Your Plan
          </div>
        </div>
        <div className="mt-2 text-brand-500 leading-5">
          Lock in your savings without a big upfront payment—use free financing
          or pay in full with your card.
        </div>
        {/* Plan Variants */}
        <div className="mt-6 flex flex-col gap-4">
          {selectedVariant &&
            selectedVariant?.map((variant: any) => (
              <div
                key={variant.id}
                className="p-5 rounded bg-white ring cursor-pointer hover:bg-gray-50 text-brand-500 ring-brand-75"
                style={
                  variant.isPopular
                    ? ({
                      "--tw-ring-color": "#2ed296",
                      backgroundColor: "#f0fcf8",
                    } as React.CSSProperties)
                    : {}
                }
                onClick={() => handleSelectVariant(variant.id)}
              >
                <div className="flex items-center gap-2 justify-between sm:justify-start">
                  <div className="text-xl font-bold">{variant.name}</div>
                  {variant.isPopular && (
                    <div className="shrink-0">
                      <div className="rounded-full px-3 py-1 font-medium text-center whitespace-nowrap bg-[#e0f8ef] text-[#1c7e5a]">
                        Most Popular
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-start justify-between gap-4">
                  <div className="flex-1 text-base leading-6 whitespace-pre-line text-[#004d64]">
                    {variant.description}
                  </div>
                  <div className="shrink-0 text-right text-black font-semibold">
                    {variant.weeksSupply}
                  </div>
                </div>
                {variant.paymentSchedule !== "Monthly" && (
                  <div className="mt-3 flex items-center justify-between">
                    <div className="">
                      <div className="font-semibold">Easy 0% Installments</div>
                      <div className="text-sm">
                        Spread payments over 12 months.
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <img
                        className="h-6"
                        src="/assets/Icons/affirm_logo.svg"
                      />
                      <img
                        className="h-6"
                        src="/assets/Icons/klarna_logo.svg"
                      />
                      <img
                        className="h-6"
                        src="/assets/Icons/afterpay_logo.svg"
                      />
                    </div>
                  </div>
                )}
                {variant.savingPrice > 0 && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="text-center text-[#30B130] font-semibold border-2 border-dashed rounded w-full border-[#30B130]/30 p-1.5 bg-[#30B130]/5">
                      You are saving <strong> ${variant.savingPrice}</strong>
                    </div>
                  </div>
                )}
                <div
                  className="mt-4 rounded p-3 cursor-pointer"
                  style={{
                    backgroundColor: getPlanColors(selectedPlan?.name)
                      .backgroundColor,
                    color: getPlanColors(selectedPlan?.name).color,
                  }}
                >
                  <div className="flex items-baseline justify-center gap-2 text-center">
                    <div className="font-semibold text-xl">Select Plan</div>
                    <div className="">•</div>
                    <div className="flex items-center justify-center gap-1">
                      <div className="text-xl font-semibold">
                        ${variant.price}/month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Additional Information */}
      <div className="mt-8 flex items-center justify-center">
        <img className="h-12" src="/assets/imgs/tp.png" />
      </div>
      <div className="mt-12">
        <div className="text-lg font-bold">All Plans Include</div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              ></path>
            </svg>
            Free Dosage Increases
          </div>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              ></path>
            </svg>
            Treatment changes at anytime!
          </div>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              ></path>
            </svg>
            Unlimited Free Doctor Consults
          </div>

          <div className="flex items-center gap-2">
            <img className="h-7" src="/assets/Icons/truck.svg" alt="Truck" />
            Free Expedited Shipping
          </div>

          <div className="flex items-center gap-2">
            <img
              className="h-7"
              src="/assets/Icons/vaccines.svg"
              alt="Vaccines"
            />
            Home Injection Kit Included
          </div>

          <div className="flex items-center gap-2">
            <img className="h-7" src="/assets/Icons/chat.svg" alt="Chat" />
            24/7 Customer Support
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="text-lg font-bold">How It Works</div>
        <div className="flex flex-col gap-2 mt-4">
          Each month includes one shot per week, for a total of four shots. Your
          provider will start you on a low dose and gradually increase it to
          your ideal level, helping you lose weight safely and effectively.
        </div>
      </div>
      <div className="mt-12">
        <div className="text-lg font-bold">All major credit cards accepted</div>
        <div className="flex items-center gap-2 mt-4">
          <img className="h-6" src="/assets/Icons/visa-ee71e0b5.svg" />
          <img className="h-6" src="/assets/Icons/mastercard-cd70929d.svg" />
          <img className="h-6" src="/assets/Icons/amex-5a1bd533.svg" />
          <img className="h-6" src="/assets/Icons/discover-62e417a8.svg" />
          <img className="h-6" src="/assets/Icons/apple_pay-8671b239.svg" />
          <img className="h-6" src="/assets/Icons/google_pay-abef4348.svg" />
        </div>
        <div className="mt-4">
          <img className="h-10" src="/assets/Icons/hsa_fsa-b8c1e240.png" />
        </div>
      </div>
    </div>
  );
}
