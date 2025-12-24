"use client";
import { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Country, State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getPlanColors } from "@/lib/helper";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/intake/checkout/success",
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message || "Payment failed.");
    } else if (paymentIntent?.status === "succeeded") {
      window.location.href = "/intake/checkout/success";
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <PaymentElement />
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="bg-[#4f01ff] text-white w-full py-3 mt-4 cursor-pointer rounded hover:bg-brand-500"
      >
        {loading ? "Processing payment..." : "Pay"}
      </button>
    </form>
  );
}

// Get all countries and sort alphabetically
const COUNTRIES = Country.getAllCountries().sort((a, b) => 
  a.name.localeCompare(b.name)
);


export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [country, setCountry] = useState("US");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2000 }), // $20.00 in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct") || "{}");
    setSelectedProduct(selectedProduct);
    console.log("Selected Product:", selectedProduct);
  }, []);

  // Reset state when country changes
  useEffect(() => {
    setState("");
  }, [country]);

  const getStatesForCountry = () => {
    if (!country) return [];
    return State.getStatesOfCountry(country).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  };

  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""),
    []
  );
  const options = clientSecret ? { clientSecret } : undefined;

  return (
    <div className="md:mt-6 mx-auto max-w-3xl">
      <div
        className="w-full p-8 lg:p-12 md:rounded-4xl"
        style={{ backgroundColor: getPlanColors(selectedProduct?.medication).backgroundColor }}
      >
        <div
          className="hidden md:block text-2xl font-semibold"
          style={{ color: getPlanColors(selectedProduct?.medication).color }}
        >
          Your Treatment Details
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-6 md:mt-4">
          <div
            className="rounded-2xl overflow-hidden flex items-start justify-center aspect-video md:aspect-square md:w-44"
            style={{ backgroundColor: getPlanColors(selectedProduct?.medication).thirdBgColor }}
          >
            <img
              className="w-full h-full object-cover"
              src={selectedProduct?.imgSrc}
              alt="Treatment"
            />
          </div>
          <div
            className="flex-1 rounded-2xl p-4 lg:p-8 flex flex-col gap-2"
            style={{ backgroundColor: getPlanColors(selectedProduct?.medication).secondBgColor, color: getPlanColors(selectedProduct?.medication).color }}
          >
            <div className="flex justify-between text-lg">
              <div className="">Medication:</div>
              <div className="font-semibold text-right">{selectedProduct?.medication}</div>
            </div>

            <div className="flex justify-between text-lg">
              <div className="">Delivery Plan:</div>
              <div className="font-semibold text-right">{selectedProduct?.deliveryPlan}</div>
            </div>

            <div className="flex justify-between text-lg">
              <div className="">Total Savings:</div>
              <div className="font-semibold text-right text-green-500">
                ${selectedProduct?.totalSavings}
              </div>
            </div>

            <div className="flex justify-between text-lg">
              <div className="">Shipping:</div>
              <div className="font-semibold text-right text-green-500">
                FREE
              </div>
            </div>

            <div className="h-[1pt] bg-white opacity-25 w-full"></div>

            <div className="flex justify-between">
              <div className="font-semibold">Monthly Price:</div>
              <div className="font-semibold text-right">
                <div className="font-semibold text-green-500">${selectedProduct?.monthlyPrice}</div>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-xl">
              <div className="font-bold">Total if prescribed:</div>
              <div className="font-bold">${selectedProduct?.totalPrice}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1" style={{ color: getPlanColors(selectedProduct?.medication).color }}>
          <div className="flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              ></path>
            </svg>
            Same Price. All Dosage Levels.
          </div>

          <div className="flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              ></path>
            </svg>
            Prescribed &amp; shipped within 48 hours
          </div>

          <div className="flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              ></path>
            </svg>
            UNLIMITED doctor calls 7 days a week
          </div>

          <div className="mt-4 bg-green-500/75 rounded p-3 flex items-center justify-center text-center text-brand-300">
            <div>
              <div className="text-lg font-semibold mr-1">$0 Due Today!</div>
              Only charged if your prescription is approved.
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center flex-col sm:flex-row gap-2 bg-white rounded p-2">
            <img
              className="h-10"
              src="/assets/imgs/hsa_fsa.png"
              alt="HSA FSA"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-white p-4 ring ring-brand-50 w-full">
        <div className="text-2xl leading-9 font-semibold text-brand-300 text-center">
          Enter Your Shipping Address
        </div>
        <div className="text-[#455F77] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
          </svg>
          Your privacy guaranteed
        </div>
        <div className="space-y-4">
          {/* Country or region */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-brand-700 mb-1"
            >
              Country or region
            </label>
            <select
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="block w-full rounded border border-brand-200 bg-white px-4 py-2.5 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Address line 1 */}
          <div>
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-brand-700 mb-1"
            >
              Address line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="block w-full rounded border border-brand-200 bg-white px-4 py-2.5 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
            />
          </div>

          {/* Address line 2 */}
          <div>
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-brand-700 mb-1"
            >
              Address line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              placeholder="Apt., suite, unit number, etc. (optional)"
              className="block w-full rounded border border-brand-200 bg-white px-4 py-2.5 text-brand-800 placeholder:text-brand-400 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-brand-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full rounded border border-brand-200 bg-white px-4 py-2.5 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
            />
          </div>

          {/* State and ZIP code in a row */}
          <div className="grid grid-cols-2 gap-4">
            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-brand-700 mb-1"
              >
                State
              </label>
              {getStatesForCountry().length > 0 ? (
                <select
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="block w-full rounded border border-brand-200 bg-white px-4 py-2.5 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
                >
                  <option value="">Select state</option>
                  {getStatesForCountry().map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="block w-full rounded border border-brand-200 bg-white px-4 py-2.5 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
                />
              )}
            </div>

            {/* ZIP code */}
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-brand-700 mb-1"
              >
                ZIP code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="block w-full rounded border border-brand-200 bg-white px-4 py-2.5 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
              />
            </div>
          </div>

          {/* Phone number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-brand-700 mb-1"
            >
              Phone number
            </label>
            <PhoneInput
              country={"us"}
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              inputProps={{
                id: "phoneNumber",
                name: "phoneNumber",
                required: true,
              }}
              containerClass="phone-input-container"
              inputClass="phone-input-field"
              buttonClass="phone-input-button"
            />
          </div>
        </div>
      </div>
      <div className="text-2xl mt-4 leading-8 font-semibold text-brand-300 text-center">
        Enter Your Card Details
      </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
      <div className="mt-6 text-sm text-brand-200 text-center">
        🛡️ 256-bit SSL encryption • PCI DSS compliant
      </div>
      <div className="mt-2 text-sm text-[#7D8FA0] text-center">
        Your payment information is secure and encrypted
      </div>
      <div id="checkout-tos" className="mt-8 text-sm text-[#7D8FA0] text-center">
        By continuing, I confirm I have read and agree to Wellinc's Telehealth
        Visit Policy, Privacy Policy, Shipping Policy, and all Terms and
        Conditions, consent to the collection, use, processing, and disclosure
        of my PHI, and authorize healthcare services via telehealth. I
        authorize Wellinc to enroll me in an auto-renewing subscription and to
        charge my saved payment method at the specified recurring intervals
        until I cancel in accordance with the Terms and Conditions; I
        understand failed payments may be retried, I am responsible for all
        resulting amounts and fees, and cancellation only stops future charges,
        with any refunds governed solely by the Wellinc Refund Policy. If I use
        third-party financing (such as Klarna, Afterpay, or Affirm), I
        understand that financing is solely between me and that provider under
        its own terms and privacy policy, that Wellinc is not a party to those
        agreements, that such payments are generally not refundable by Wellinc
        except as allowed by its Refund Policy, and that financing typically
        covers only the specific treatment period, requiring a new purchase or
        valid payment method to continue services or my account may be paused
        or suspended. I agree that my order is a binding, final transaction,
        that refunds are only available as stated in the Wellinc Refund Policy,
        that cancellation fees may apply, and that multi-month packages will
        not be refunded for unused medication or remaining months; I attest
        that all medical information I provide is complete and accurate,
        release the provider and affiliated entities from liability arising
        from errors or omissions in my submissions, and confirm I understand
        the potential risks and serious adverse effects of treatment and am
        proceeding voluntarily.
      </div>
    </div>
  );
}
