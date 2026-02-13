"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import { BaskPayment, PaymentElementOptions } from "@baskhealth/payment-element";
import { toast } from "react-hot-toast";
import { Country, State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { getPlanColors, isValidPhone } from "@/lib/helper";
import { withTokenRefresh, getPatientData, initiateCheckout, updatePatient } from "@/lib/api";
import { useRouter } from "next/navigation";
import { getEverflowTransactionId } from "@/lib/everflow";
import { trackViewContent, trackPurchase } from "@/lib/facebook-pixel";

// Get all countries and sort alphabetically
const COUNTRIES = Country.getAllCountries().sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function CheckoutPage() {
  const baskPaymentRef = useRef<BaskPayment | null>(null);
  const baskElementsRef = useRef<any>(null);
  const clientSecretRef = useRef<string | null>(null);
  const paymentContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize BaskPayment instance once
  if (baskPaymentRef.current === null) {
    baskPaymentRef.current = new BaskPayment();
  }
  const [country, setCountry] = useState("US");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const pendingStateRef = useRef<string | null>(null);
  const [errors, setErrors] = useState<{
    addressLine?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phoneNumber?: string;
  }>({});
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [isLoadingPatientData, setIsLoadingPatientData] = useState(true);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isLoadingPaymentElement, setIsLoadingPaymentElement] = useState(false);
  const [isPaymentElementLoaded, setIsPaymentElementLoaded] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct") || "{}");
    setSelectedProduct(selectedProduct);
    
    // Track ViewContent event for Facebook Pixel
    if (selectedProduct) {
      trackViewContent({
        content_name: selectedProduct?.name || 'Checkout Page',
        content_category: 'Medication',
        value: selectedProduct?.totalPrice || selectedProduct?.monthlyPrice || 0,
        currency: 'USD',
      });
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      router.push("/intake/contact");
      return;
    }

    (async () => {
      setIsLoadingPatientData(true);
      const data = await withTokenRefresh(
        getPatientData,
        token,
        [],
        { on404: () => router.push("/intake/contact") }
      );

      if (data && !data?.error) {
        setPatientData(data?.patient);
        // Add a delay to ensure all state updates from setPatientData are complete
        // This prevents validation from running before fields are populated
        setTimeout(() => {
          setIsLoadingPatientData(false);
        }, 300);
        return;
      }

      if (!data) {
        setIsLoadingPatientData(false);
        return; // Error already handled by wrapper
      }

      setIsLoadingPatientData(false);
      router.push("/intake/contact");
    })();
  }, []);

  // Reset state when country changes (unless we have a pending state from patient data)
  useEffect(() => {
    if (pendingStateRef.current) {
      setState(pendingStateRef.current || "");
      pendingStateRef.current = null;
    } else {
      setState("");
      setIsAddressSubmitted(false);
      resetPaymentElementState();
    }
  }, [country]);

  // Validate address when all fields are populated (e.g., from patient data on load)
  useEffect(() => {
    // Only validate if patient data has finished loading and all required fields have values
    if (!isLoadingPatientData && addressLine && city && state && zipCode && phoneNumber) {
      // Use a small delay to ensure state updates have completed
      const timer = setTimeout(() => {
        if (validateShippingAddress()) {
          setIsAddressSubmitted(true);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [addressLine, city, state, zipCode, country, phoneNumber, isLoadingPatientData]);

  // Cleanup payment element on unmount
  useEffect(() => {
    return () => {
      // Clean up payment element when component unmounts
      if (baskElementsRef.current) {
        try {
          const paymentElement = baskElementsRef.current.getElement("payment");
          if (paymentElement && typeof paymentElement.unmount === 'function') {
            paymentElement.unmount();
          }
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, []);

  const setPatientData = async (data: any) => {
    setAddressLine(data?.address?.street || "");
    setCity(data?.address?.city || "");

    // Convert state name to ISO code if needed
    const stateValue = data?.address?.state;
    let stateIsoCode = stateValue;

    if (stateValue) {
      const countryCode = data?.address?.country || country;
      if (countryCode) {
        const states = State.getStatesOfCountry(countryCode);
        // Check if stateValue is already an ISO code
        const stateByCode = states.find((s: any) => s.isoCode === stateValue);
        if (stateByCode) {
          stateIsoCode = stateValue;
        } else {
          // Try to find by name
          const stateByName = states.find((s: any) =>
            s.name.toLowerCase() === stateValue.toLowerCase()
          );
          if (stateByName) {
            stateIsoCode = stateByName.isoCode;
          }
        }
      }
    }

    // Set country first if available (this will trigger the useEffect that resets state)
    if (data?.address?.country) {
      // Store the state value to set after country change
      pendingStateRef.current = stateIsoCode || "";
      setCountry(data?.address?.country);
    } else {
      // If no country change, set state directly
      setState(stateIsoCode || "");
    }

    setZipCode(data?.address?.zipCode || "");

    // Set phone number if available
    if (data?.phoneNumber) {
      // If phone number is already in digits format, format it for PhoneInput
      // PhoneInput expects format like "11234567890" (with country code)
      const phoneDigits = data.phoneNumber.replace(/\D/g, '');
      if (phoneDigits.length === 10) {
        // If it's 10 digits, prepend "1" for US country code
        setPhoneNumber(`1${phoneDigits}`);
      } else if (phoneDigits.length === 11 && phoneDigits.startsWith('1')) {
        // If it's 11 digits starting with 1, use as is
        setPhoneNumber(phoneDigits);
      } else {
        setPhoneNumber("");
      }
    } else {
      setPhoneNumber("");
    }

    // Use the actual values from data instead of state (which hasn't updated yet)
    const finalCountry = data?.address?.country || country;
    
    // Check if address is valid - if patient data has all required fields, enable the button
    const phoneDigits = data?.phoneNumber ? data.phoneNumber.replace(/\D/g, '') : '';
    const phoneWithoutCountry = phoneDigits.length === 11 && phoneDigits.startsWith('1') 
      ? phoneDigits.substring(1) 
      : phoneDigits;
    const formattedPhone = phoneDigits.length === 10 ? `1${phoneDigits}` : (phoneDigits.length === 11 && phoneDigits.startsWith('1') ? phoneDigits : '');

    const hasValidAddress = 
      data?.address?.street && 
      data?.address?.city && 
      stateIsoCode && 
      data?.address?.zipCode &&
      data?.phoneNumber &&
      isValidPhone(phoneWithoutCountry);
    
    if (hasValidAddress) {
      // Validate the address to ensure it's truly valid
      const isValid = validateShippingAddress(
        data?.address?.street,
        data?.address?.city,
        stateIsoCode,
        data?.address?.zipCode,
        finalCountry,
        formattedPhone
      );
      
      if (isValid) {
        setIsAddressSubmitted(true);
        // Automatically call initiate-checkout when all information is valid
        const checkoutData = await getCheckoutData(
          data?.address?.street,
          data?.address?.city,
          stateIsoCode,
          data?.address?.zipCode,
          finalCountry,
          formattedPhone,
          true // suppressError = true to prevent error toast during auto-load
        );

        if (checkoutData) {
          loadPaymentElementIntoDom(checkoutData?.publishableKey, checkoutData?.clientSecret);
          return;
        }
      }
    }
  };

  const resetPaymentElementState = () => {
    // Clean up payment element before resetting state
    if (baskElementsRef.current) {
      try {
        const paymentElement = baskElementsRef.current.getElement("payment");
        if (paymentElement && typeof paymentElement.unmount === 'function') {
          paymentElement.unmount();
        }
      } catch (e) {
        // Element might not exist, ignore
      }
    }
    
    // Don't manually manipulate DOM - let React handle it
    // Just reset the state flags
    setIsPaymentElementLoaded(false);
    setIsLoadingPaymentElement(false);
  };

  const getStatesForCountry = () => {
    if (!country) return [];
    return State.getStatesOfCountry(country).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  };

  async function getCheckoutData(
    addressValue?: string,
    cityValue?: string,
    stateValue?: string,
    zipCodeValue?: string,
    countryValue?: string,
    phoneValue?: string,
    suppressError: boolean = false
  ) {
    if (!validateShippingAddress(addressValue, cityValue, stateValue, zipCodeValue, countryValue, phoneValue)) {
      // Only show error if it's a user-initiated action (not during auto-load from patient data)
      if (!suppressError) {
        toast.error("Please fill in the shipping address form.");
      }
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      router.push("/intake/contact");
      return;
    }

    const product = JSON.parse(localStorage.getItem("selectedProduct") || "{}");
    const initiateCheckoutData = await withTokenRefresh(
      initiateCheckout,
      token,
      [{
        productGroupId: product?.productGroupId,
        membershipPlanId: product?.membershipPlanId,
        membershipPlanVariantId: product?.membershipPlanVariantId,
      }],
      { on404: () => router.push("/intake/contact") }
    );

    if (!initiateCheckoutData) {
      return null; // Error already handled by wrapper
    }

    if (!initiateCheckoutData?.error) {
      // Fire Add to Cart postback (only once per transaction_id)
      const transactionId = getEverflowTransactionId();
      if (transactionId) {
        const hasTrackedAddToCart = localStorage.getItem("everflow_add_to_cart_tracked");
        if (!hasTrackedAddToCart) {
          // Set flag immediately to prevent duplicate calls
          localStorage.setItem("everflow_add_to_cart_tracked", "true");
          
          // Get patient data for postback
          const patientData = await withTokenRefresh(
            getPatientData,
            token,
            [],
            { on404: () => {} }
          );
          
          if (patientData && !patientData?.error) {
            const patient = patientData.patient;
            fetch("/api/everflow/postback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event_type: "add_to_cart",
                transaction_id: transactionId,
                user_id: patient?.id || patient?.patientId || undefined,
                email: patient?.email || undefined,
                firstName: patient?.firstName || undefined,
                lastName: patient?.lastName || undefined,
                phone: patient?.phoneNumber || undefined,
              }),
            })
            .then((res) => {
              if (!res.ok) {
                console.error('[Everflow] Add to Cart postback failed:', res.status);
                // If it failed, remove the flag so it can retry
                localStorage.removeItem("everflow_add_to_cart_tracked");
              }
            })
            .catch((err) => {
              console.error("[Everflow] Failed to fire add to cart postback:", err);
              // If it failed, remove the flag so it can retry
              localStorage.removeItem("everflow_add_to_cart_tracked");
            });
          } else {
            // If patient data fetch failed, remove flag to allow retry
            localStorage.removeItem("everflow_add_to_cart_tracked");
          }
        }
      }
      
      return initiateCheckoutData.data;
    }

    if (initiateCheckoutData?.error == 409) {
      localStorage.clear();
      router.push("/intake/checkout/success");
      return null;
    }

    if(initiateCheckoutData?.error == 500) {
      toast.error("Server error. Please try again later.");
      return null;
    }

    router.push("/intake/contact");
    return null;
  }

  const validateShippingAddress = (
    addressValue?: string,
    cityValue?: string,
    stateValue?: string,
    zipCodeValue?: string,
    countryValue?: string,
    phoneValue?: string
  ) => {
    // Use provided values or fall back to state
    const addrLine = addressValue !== undefined ? addressValue : addressLine;
    const cityVal = cityValue !== undefined ? cityValue : city;
    const stateVal = stateValue !== undefined ? stateValue : state;
    const zipVal = zipCodeValue !== undefined ? zipCodeValue : zipCode;
    const countryVal = countryValue !== undefined ? countryValue : country;
    const phoneVal = phoneValue !== undefined ? phoneValue : phoneNumber;

    const newErrors: {
      addressLine?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      phoneNumber?: string;
    } = {};

    // Validate address line
    if (!addrLine || addrLine.trim() === "") {
      newErrors.addressLine = "Address line is required.";
    }

    // Validate city
    if (!cityVal || cityVal.trim() === "") {
      newErrors.city = "City is required.";
    }

    // Validate state
    if (!stateVal || stateVal.trim() === "") {
      newErrors.state = "State is required.";
    } else if (countryVal) {
      const states = State.getStatesOfCountry(countryVal);
      if (states.length > 0) {
        // If states are available, validate that the selected state exists
        const validState = states.find((s) => s.isoCode === stateVal);
        if (!validState) {
          newErrors.state = "Please select a valid state.";
        }
      }
    }

    // Validate ZIP code
    if (!zipVal || zipVal.trim() === "") {
      newErrors.zipCode = "ZIP code is required.";
    } else {
      // Basic ZIP code validation (5 digits or 5+4 format)
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (!zipRegex.test(zipVal.trim())) {
        newErrors.zipCode = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789).";
      }
    }

    // Validate phone number
    if (!phoneVal || phoneVal.trim() === "") {
      newErrors.phoneNumber = "Phone number is required.";
    } else {
      // Extract digits and validate using helper function
      const phoneDigits = phoneVal.replace(/\D/g, '');
      // Remove country code if present (US: 1)
      const phoneWithoutCountry = phoneDigits.length === 11 && phoneDigits.startsWith('1') 
        ? phoneDigits.substring(1) 
        : phoneDigits;
      
      if (!isValidPhone(phoneWithoutCountry)) {
        newErrors.phoneNumber = "Please enter a valid US phone number (10 digits, first digit 2-9).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitShippingAddress = async () => {
    // Mark that user has attempted to submit
    setHasAttemptedSubmit(true);
    
    // Don't allow submission while patient data is still loading
    if (isLoadingPatientData) {
      return;
    }

    if (validateShippingAddress()) {
      // Get checkout data and load payment element
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No auth token found.");
        router.push("/intake/contact");
        return;
      }

      // Extract digits from phone number and remove country code if present
      const phoneDigits = phoneNumber.replace(/\D/g, '');
      const phoneWithoutCountry = phoneDigits.length === 11 && phoneDigits.startsWith('1') 
        ? phoneDigits.substring(1) 
        : phoneDigits;

      // Only include phoneNumber if it's valid
      const patientUpdateData: any = {
        city,
        address: addressLine,
        state,
        zipCode,
        country: country,
      };

      if (isValidPhone(phoneWithoutCountry)) {
        patientUpdateData.phoneNumber = phoneWithoutCountry;
      }

      const updatePatientData = await withTokenRefresh(
        updatePatient,
        token,
        [patientUpdateData],
        { on404: () => router.push("/intake/contact") }
      );

      if (!updatePatientData) {
        return; // Error already handled by wrapper
      }

      if (!updatePatientData?.error) {
        toast.success("Patient data updated successfully!");
        setIsAddressSubmitted(true);
        // Extract digits from phone number and remove country code if present
        const phoneDigits = phoneNumber.replace(/\D/g, '');
        const phoneWithoutCountry = phoneDigits.length === 11 && phoneDigits.startsWith('1') 
          ? phoneDigits.substring(1) 
          : phoneDigits;
        const formattedPhoneForCheckout = phoneDigits.length === 10 ? `1${phoneDigits}` : (phoneDigits.length === 11 && phoneDigits.startsWith('1') ? phoneDigits : phoneNumber);
        
        const checkoutData = await getCheckoutData(
          addressLine,
          city,
          state,
          zipCode,
          country,
          formattedPhoneForCheckout,
          false // suppressError = false to show error if validation fails on user submit
        );
        if(checkoutData){
          loadPaymentElementIntoDom(checkoutData?.publishableKey, checkoutData?.clientSecret);
          return;
        } else {
          toast.error("Failed to initialize checkout.");
          return;
        }
      }

      router.push("/intake/contact");
      return;
    } else {
      // Only show error if user has actually attempted to submit (not during auto-validation)
      // and if fields are actually empty (meaning data wasn't loaded or user cleared them)
      if (hasAttemptedSubmit) {
        const hasEmptyFields = !addressLine || !city || !state || !zipCode || !phoneNumber;
        if (hasEmptyFields) {
          toast.error("Please fill out the information in the form.");
        }
      }
      return;
    }
  };

  async function loadPaymentElementIntoDom(publicKey: string, clientSecret: string) {
    if (!publicKey || !clientSecret) {
      toast.error("No public key or client secret found.");
      return;
    }

    if (!baskPaymentRef.current) {
      toast.error("Payment system not initialized.");
      return;
    }

    // Start loading
    setIsLoadingPaymentElement(true);
    setIsPaymentElementLoaded(false);

    try {
      await baskPaymentRef.current.loadPaymentElement(publicKey);
      clientSecretRef.current = clientSecret; // Store for later use
      baskElementsRef.current = baskPaymentRef.current.elements({
        locale: "en",
        clientSecret: clientSecret,
      });

      const paymentElementOptions: PaymentElementOptions = {
        layout: {
          type: "accordion",
          defaultCollapsed: true,
          radios: true,
          spacedAccordionItems: true,
          maxAccordionItems: 3,
        },
      };

      // Clean up any existing payment element before mounting a new one
      if (baskElementsRef.current) {
        try {
          const existingElement = baskElementsRef.current.getElement("payment");
          if (existingElement && typeof existingElement.unmount === 'function') {
            existingElement.unmount();
          }
        } catch (e) {
          // Element might not exist, ignore
        }
      }

      const element = baskElementsRef.current.create("payment", paymentElementOptions);
      baskElementsRef.current.getElement("payment");
      element.mount("#payment-container");
      
      // Small delay to ensure payment element is fully mounted before hiding loading overlay
      // This prevents React from trying to remove the overlay while BaskPayment is still manipulating DOM
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Payment element is now loaded
      setIsLoadingPaymentElement(false);
      setIsPaymentElementLoaded(true);
    } catch (error: any) {
      setIsLoadingPaymentElement(false);
      setIsPaymentElementLoaded(false);
      toast.error(error.message || "Failed to load payment element.");
    }
  }

  const firePurchasePostback = async (paymentIntentId?: string) => {
    const transactionId = getEverflowTransactionId();
    if (!transactionId) {
      return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) return;
    
    // Use order_id as key to prevent duplicate purchases for the same order
    const orderId = paymentIntentId || clientSecretRef.current;
    if (!orderId) {
      console.error("[Everflow] Cannot track purchase: missing order_id");
      return;
    }
    
    // Check if this order has already been tracked
    const purchaseKey = `everflow_purchase_${orderId}`;
    const hasTrackedPurchase = localStorage.getItem(purchaseKey);
    if (hasTrackedPurchase) {
      return; // Already tracked this order
    }
    
    // Set flag immediately to prevent duplicate calls
    localStorage.setItem(purchaseKey, "true");
    
    try {
      // Get patient data and order information
      const patientData = await withTokenRefresh(
        getPatientData,
        token,
        [],
        { on404: () => {} }
      );
      
      if (patientData && !patientData?.error) {
        const patient = patientData.patient;
        const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct") || "{}");
        
        // Fire Everflow Purchase postback
        fetch("/api/everflow/postback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_type: "purchase",
            transaction_id: transactionId,
            amount: selectedProduct?.totalPrice || selectedProduct?.monthlyPrice || undefined,
            order_id: orderId,
            email: patient?.email || undefined,
            firstName: patient?.firstName || undefined,
            lastName: patient?.lastName || undefined,
            phone: patient?.phoneNumber || undefined,
          }),
        })
        .then((res) => {
          if (!res.ok) {
            console.error('[Everflow] Purchase postback failed:', res.status);
            // If it failed, remove the flag so it can retry
            localStorage.removeItem(purchaseKey);
          }
        })
        .catch((err) => {
          console.error("[Everflow] Failed to fire purchase postback:", err);
          // If it failed, remove the flag so it can retry
          localStorage.removeItem(purchaseKey);
        });
        
        // Track Facebook Pixel Purchase event
        trackPurchase({
          value: selectedProduct?.totalPrice || selectedProduct?.monthlyPrice || 0,
          currency: 'USD',
          content_name: selectedProduct?.name || 'Medication Purchase',
        });
      } else {
        // If patient data fetch failed, remove flag to allow retry
        localStorage.removeItem(purchaseKey);
      }
    } catch (error) {
      console.error("[Everflow] Error firing purchase postback:", error);
      // If error occurred, remove flag to allow retry
      localStorage.removeItem(purchaseKey);
    }
  };

  const confirmPayment = async () => {
    if (baskElementsRef.current == null) {
      toast.error("No payment elements found. Please submit your shipping address first.");
      return;
    }

    const baskElement = baskElementsRef.current.getElement("payment");
    if (baskElement == null) {
      toast.error("No payment element found.");
      return;
    }

    if (!baskPaymentRef.current) {
      toast.error("Payment system not initialized.");
      return;
    }

    // Check payment status first if we have a client secret
    if (clientSecretRef.current) {
      try {
        const paymentIntent = await baskPaymentRef.current.retrievePaymentIntent(clientSecretRef.current);

        // If payment is already authorized (requires_capture) or succeeded, redirect to success
        if (paymentIntent.status === "requires_capture" || paymentIntent.status === "succeeded") {
          // Fire Purchase postback
          await firePurchasePostback(paymentIntent.id);
          
          toast.success("Payment authorized successfully!");
          localStorage.clear();
          router.push("/intake/checkout/success");
          return;
        }

        // If payment is already processing, show message
        if (paymentIntent.status === "processing") {
          toast.success("Payment is processing...");
          return;
        }
      } catch (error: any) {
        // Payment intent retrieval failed, proceeding with confirmation
      }
    }

    try {
      const result = await baskPaymentRef.current.confirmPayment({
        elements: baskElementsRef.current,
        confirmParams: {
          return_url: `${window.location.origin}/intake/checkout/success`,
        },
      });
      // Handle the result - check if it has an error property
      if (result && typeof result === 'object' && 'error' in result) {
        const errorResult = result as { error: { type?: string; message?: string; code?: string } };
        const errorMessage = errorResult.error.message || errorResult.error.code || "Payment failed.";
        if ((errorResult.error.type === "invalid_request" || errorResult.error.code === "invalid_request") &&
          errorMessage.includes("requires_capture")) {
          // Payment was already authorized, this is actually a success
          // Fire Purchase postback
          const paymentIntentId = clientSecretRef.current ? 
            (await baskPaymentRef.current.retrievePaymentIntent(clientSecretRef.current).catch(() => null))?.id : 
            undefined;
          await firePurchasePostback(paymentIntentId);
          
          toast.success("Payment authorized successfully!");
          localStorage.clear()
          router.push("/intake/checkout/success");
        } else {
          toast.error(errorMessage);
        }
      } else if (result && 'status' in result) {
        // Handle PaymentConfirmResponse
        const paymentResult = result as { status: string; paymentIntent?: { id?: string } };
        if (paymentResult.status === "succeeded" || paymentResult.status === "requires_capture") {
          // Fire Purchase postback
          const paymentIntentId = paymentResult.paymentIntent?.id || 
            (clientSecretRef.current ? 
              (await baskPaymentRef.current.retrievePaymentIntent(clientSecretRef.current).catch(() => null))?.id : 
              undefined);
          await firePurchasePostback(paymentIntentId);
          
          toast.success("Payment authorized successfully!");
          localStorage.clear()
          router.push("/intake/checkout/success");
        } else if (paymentResult.status === "failed") {
          toast.error("Payment failed.");
        } else {
          toast.success("Payment processing...");
        }
      }

    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed.");
    }
  };

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
              htmlFor="addressLine"
              className="block text-sm font-medium text-brand-700 mb-1"
            >
              Address line
            </label>
            <input
              type="text"
              id="addressLine"
              name="addressLine"
              value={addressLine}
              onChange={(e) => {
                setAddressLine(e.target.value);
                setIsAddressSubmitted(false);
                resetPaymentElementState();
                if (errors.addressLine) {
                  setErrors({ ...errors, addressLine: undefined });
                }
              }}
              className={`block w-full rounded border bg-white px-4 py-2.5 text-brand-800 outline-none focus:ring-1 ${errors.addressLine
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-brand-200 focus:border-brand-300 focus:ring-brand-300"
                }`}
            />
            {errors.addressLine && (
              <p className="mt-1 text-sm text-red-600">{errors.addressLine}</p>
            )}
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
              onChange={(e) => {
                setCity(e.target.value);
                setIsAddressSubmitted(false);
                resetPaymentElementState();
                if (errors.city) {
                  setErrors({ ...errors, city: undefined });
                }
              }}
              className={`block w-full rounded border bg-white px-4 py-2.5 text-brand-800 outline-none focus:ring-1 ${errors.city
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-brand-200 focus:border-brand-300 focus:ring-brand-300"
                }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
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
                  onChange={(e) => {
                    setState(e.target.value);
                    setIsAddressSubmitted(false);
                    resetPaymentElementState();
                    if (errors.state) {
                      setErrors({ ...errors, state: undefined });
                    }
                  }}
                  className={`block w-full rounded border bg-white px-4 py-2.5 text-brand-800 outline-none focus:ring-1 ${errors.state
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-brand-200 focus:border-brand-300 focus:ring-brand-300"
                    }`}
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
                  onChange={(e) => {
                    setState(e.target.value);
                    setIsAddressSubmitted(false);
                    resetPaymentElementState();
                    if (errors.state) {
                      setErrors({ ...errors, state: undefined });
                    }
                  }}
                  className={`block w-full rounded border bg-white px-4 py-2.5 text-brand-800 outline-none focus:ring-1 ${errors.state
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-brand-200 focus:border-brand-300 focus:ring-brand-300"
                    }`}
                />
              )}
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
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
                onChange={(e) => {
                  setZipCode(e.target.value);
                  setIsAddressSubmitted(false);
                  resetPaymentElementState();
                  if (errors.zipCode) {
                    setErrors({ ...errors, zipCode: undefined });
                  }
                }}
                className={`block w-full rounded border bg-white px-4 py-2.5 text-brand-800 outline-none focus:ring-1 ${errors.zipCode
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-brand-200 focus:border-brand-300 focus:ring-brand-300"
                  }`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
              )}
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
              onChange={(value) => {
                setPhoneNumber(value);
                setIsAddressSubmitted(false);
                resetPaymentElementState();
                if (errors.phoneNumber) {
                  setErrors({ ...errors, phoneNumber: undefined });
                }
              }}
              inputProps={{
                id: "phoneNumber",
                name: "phoneNumber",
                required: true,
              }}
              containerClass="phone-input-container"
              inputClass={`phone-input-field ${errors.phoneNumber ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              buttonClass="phone-input-button"
              onlyCountries={["us"]}
              countryCodeEditable={false}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Submit Shipping Address Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmitShippingAddress}
              className="w-full cursor-pointer bg-brand-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Submit Shipping Address
            </button>
          </div>
        </div>
      </div>
      <div className="text-2xl mt-4 leading-8 font-semibold text-brand-300 text-center">
        {isPaymentElementLoaded ? "Enter Your Card Details" : "Submit shipping address to continue"}
      </div>
      {/* Bask Payment Element */}
      <div className={`relative ${isLoadingPaymentElement || isPaymentElementLoaded ? 'min-h-[200px]' : ''}`}>
        {isLoadingPaymentElement && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/80 rounded-lg z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-brand-500"></div>
            <div className="mt-4 text-brand-500 font-semibold">
              Loading payment element...
            </div>
          </div>
        )}
        <div 
          id="payment-container" 
          ref={paymentContainerRef}
          className="relative"
        />
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={confirmPayment}
          disabled={!isAddressSubmitted}
          title={!isAddressSubmitted ? "Please submit valid shipping address first" : ""}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
            !isAddressSubmitted
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-brand-500 text-white cursor-pointer hover:bg-brand-600"
          }`}
        >
          Confirm Payment
        </button>
      </div>

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
