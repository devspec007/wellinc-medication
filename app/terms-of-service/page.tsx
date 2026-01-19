import Header2 from '@/components/landing-page/Header2';
import Footer2 from '@/components/landing-page/Footer2';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Well.inc',
  description: 'Terms of Service for Well.inc Telehealth Platform',
};

export default function TermsOfService() {
  return (
    <>
      <Header2 />
      
      <main>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              <strong>Effective Date:</strong> November 24, 2025
            </p>
            <p className="text-lg mb-6">
              <strong>Last Updated:</strong> November 24, 2025
            </p>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                Welcome to Well.Inc LLC (&quot;WELL,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;you,&quot; &quot;your,&quot; or &quot;Patient&quot;) and Well.Inc LLC governing your access to and use of our telehealth platform, website, mobile applications, and related services (collectively, the &quot;Services&quot;).
              </p>
              <p>
                <strong>By creating an account, accessing, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.</strong> If you do not agree to these Terms, you must not access or use our Services.
              </p>
              <p>
                These Terms apply to all users of our Services, including patients, website visitors, and anyone who accesses our platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Nature of Medical Services</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">2.1 Telehealth Services</h3>
              <p>
                WELL provides a technology platform that connects patients with independent, licensed healthcare providers for telehealth consultations and ongoing medical care. Our services include:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Medical evaluations conducted via secure online questionnaires and consultations</li>
                <li>Physician consultations for weight management and related conditions</li>
                <li>Prescription of compounded medications from certified US pharmacies when medically appropriate</li>
                <li>Coordination of prescription fulfillment and home delivery</li>
                <li>Ongoing monitoring and follow-up care</li>
                <li>Access to a patient portal for managing your treatment</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">2.2 Independent Healthcare Providers</h3>
              <p>
                <strong>Important:</strong> WELL is a technology platform and does not practice medicine or provide medical advice. All medical services are provided by independent, licensed physicians and healthcare providers who exercise their own professional judgment in evaluating and treating patients. WELL does not interfere with the physician-patient relationship or the practice of medicine.
              </p>
              <p>
                The healthcare providers accessible through our platform are independent contractors, not employees or agents of WELL. Each provider is responsible for their own professional actions and decisions regarding your care.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">2.3 Not Emergency Services</h3>
              <p>
                <strong>WELL IS NOT AN EMERGENCY MEDICAL SERVICE AND SHOULD NOT BE USED FOR MEDICAL EMERGENCIES.</strong>
              </p>
              <p>
                If you are experiencing a medical emergency, including but not limited to chest pain, severe difficulty breathing, severe allergic reactions, loss of consciousness, severe bleeding, or any condition that requires immediate medical attention, you should:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Call 911 immediately, or</li>
                <li>Go to the nearest emergency room, or</li>
                <li>Contact your local emergency services</li>
              </ul>
              <p>
                Our Services are not suitable for urgent or emergency medical conditions and should not replace in-person care when medically necessary.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">2.4 Limitations of Telehealth</h3>
              <p>
                You acknowledge and understand that telehealth services have certain limitations compared to in-person medical care, including:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Healthcare providers cannot perform physical examinations or certain diagnostic tests</li>
                <li>Reliance on your accurate reporting of symptoms and medical history</li>
                <li>Potential technology limitations affecting video or communication quality</li>
                <li>May not be appropriate for all medical conditions or situations</li>
              </ul>
              <p>
                Your healthcare provider will determine whether telehealth is appropriate for your specific medical needs and may recommend in-person evaluation if necessary.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Eligibility and Account Registration</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">3.1 Eligibility Requirements</h3>
              <p>To use our Services, you must meet the following requirements:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Age:</strong> Be at least 18 years of age or the age of majority in your state of residence</li>
                <li><strong>Residency:</strong> Be a current resident of a U.S. state where WELL operates and where the treating provider is licensed</li>
                <li><strong>Identity:</strong> Provide valid identification and undergo identity verification</li>
                <li><strong>Payment:</strong> Have a valid payment method on file</li>
                <li><strong>Communication:</strong> Have access to the internet and the ability to communicate in English</li>
                <li><strong>Consent:</strong> Consent to receive telehealth services and electronic communications</li>
              </ul>
              <p>
                WELL currently operates in select states. We will verify your state of residence and ensure our providers are licensed in your state. Services may not be available in all states.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">3.2 Account Creation</h3>
              <p>
                To access our Services, you must create a patient account by providing accurate, current, and complete information, including:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Full legal name</li>
                <li>Date of birth</li>
                <li>Email address and phone number</li>
                <li>Residential address</li>
                <li>Payment information</li>
                <li>Government-issued photo identification (for verification)</li>
              </ul>
              <p>
                You agree to keep your account information accurate and up-to-date. You must promptly notify us of any changes to your contact information, address, or payment method.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">3.3 Account Security</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Maintaining the confidentiality of your account credentials (username and password)</li>
                <li>All activities that occur under your account</li>
                <li>Preventing unauthorized access to your account</li>
                <li>Notifying us immediately of any unauthorized access or security breach</li>
              </ul>
              <p>
                <strong>Never share your account credentials with anyone.</strong> WELL will never ask you for your password via email, phone, or text message.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">3.4 Account Restrictions</h3>
              <p>Each person may have only one active patient account. You may not:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Create multiple accounts</li>
                <li>Use another person&apos;s account</li>
                <li>Share your account with others</li>
                <li>Transfer or sell your account</li>
                <li>Create an account using false or misleading information</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Medical Evaluation and Treatment</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">4.1 Informed Consent to Telehealth Services</h3>
              <p>By using our Services, you provide your informed consent to receive healthcare services via telehealth. You understand and agree that:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Telehealth consultations are conducted remotely using technology</li>
                <li>Your healthcare provider will not be physically present with you</li>
                <li>The same standards of care apply to telehealth as to in-person care</li>
                <li>There are benefits and limitations to telehealth services</li>
                <li>You have the right to withhold or withdraw consent at any time</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">4.2 Medical History and Health Information</h3>
              <p>You must provide complete, accurate, and truthful information about:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Your medical history, including all current and past medical conditions</li>
                <li>All medications, supplements, and over-the-counter drugs you are taking</li>
                <li>Known allergies and adverse reactions</li>
                <li>Current symptoms and health concerns</li>
                <li>Previous treatments and surgeries</li>
                <li>Lifestyle factors relevant to your health</li>
              </ul>
              <p>
                <strong>Providing false, incomplete, or misleading health information may result in inappropriate medical treatment and could harm your health.</strong> It may also result in termination of your account and denial of services.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">4.3 Medical Evaluation Process</h3>
              <p>Our medical evaluation process typically includes:</p>
              <ol className="list-decimal ml-6 mb-4">
                <li>Completion of a comprehensive medical intake questionnaire</li>
                <li>Review of your medical history and submitted information</li>
                <li>Consultation with a licensed healthcare provider (via asynchronous messaging or video consultation)</li>
                <li>Medical evaluation to determine appropriateness of treatment</li>
                <li>Discussion of treatment options, risks, benefits, and alternatives</li>
                <li>Issuance of prescription if medically appropriate</li>
              </ol>

              <h3 className="text-xl font-bold mb-3 mt-6">4.4 No Guarantee of Prescription</h3>
              <p>
                <strong>Not all patients will qualify for treatment or receive a prescription.</strong> The decision to prescribe medication is made solely by the independent healthcare provider based on their professional medical judgment. WELL does not guarantee that you will be prescribed medication or that any particular treatment will be recommended.
              </p>
              <p>
                Healthcare providers may decline to prescribe medication or may recommend alternative treatments, in-person evaluation, or referral to another provider if they determine it is in your best medical interest.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">4.5 Medical Advice and Physician-Patient Relationship</h3>
              <p>
                The information provided through our Services, including educational content on our website, does not constitute medical advice and should not be relied upon as a substitute for consultations with qualified healthcare professionals. A physician-patient relationship is established only when you are evaluated and treated by a healthcare provider through our platform.
              </p>
              <p>
                Always consult with your healthcare provider before making any medical decisions or starting, stopping, or changing any treatment or medication.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">4.6 Ongoing Monitoring and Follow-Up</h3>
              <p>If you are prescribed medication, your healthcare provider may require:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Regular check-ins to monitor treatment progress and safety</li>
                <li>Updated health information and vital signs</li>
                <li>Laboratory tests or other diagnostic evaluations</li>
                <li>Dose adjustments or medication changes based on your response</li>
              </ul>
              <p>
                You must comply with your provider&apos;s instructions and attend all required follow-up appointments. Failure to do so may result in discontinuation of treatment.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Prescriptions and Medications</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">5.1 Prescription Issuance</h3>
              <p>
                If your healthcare provider determines that medication is medically appropriate for your condition, they will electronically transmit a prescription to our partner pharmacy. All prescriptions are issued in accordance with applicable federal and state laws, including the Ryan Haight Online Pharmacy Consumer Protection Act.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.2 Medication Dispensing and Delivery</h3>
              <p>Medications are dispensed by licensed pharmacies and delivered directly to your address. You acknowledge that:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Delivery times vary based on pharmacy processing and shipping</li>
                <li>You are responsible for ensuring someone is available to receive medications</li>
                <li>Medications requiring refrigeration must be properly stored upon receipt</li>
                <li>You must report any issues with medication quality, packaging, or delivery immediately</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">5.3 Medication Safety and Compliance</h3>
              <p>You agree to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Take medications exactly as prescribed by your healthcare provider</li>
                <li>Read and follow all medication information and instructions</li>
                <li>Store medications properly and securely</li>
                <li>Report any side effects or adverse reactions immediately</li>
                <li>Not share, sell, or transfer your medications to anyone else</li>
                <li>Inform your provider of all other medications and supplements you are taking</li>
                <li>Attend follow-up appointments as required</li>
              </ul>
              <p>
                <strong>Misuse of prescription medications is illegal and dangerous.</strong> Sharing or selling prescription medications is a federal crime and may result in criminal prosecution.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.4 Controlled Substances</h3>
              <p>
                Some medications prescribed through our Services may be controlled substances regulated by the Drug Enforcement Administration (DEA) and state laws. If you are prescribed a controlled substance, you agree to additional monitoring and compliance requirements, including but not limited to periodic prescription drug monitoring program (PDMP) checks.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.5 Refills and Prescription Renewals</h3>
              <p>
                Prescription refills are not automatic. Your healthcare provider will evaluate your continued need for medication and treatment progress before authorizing refills. You may need to complete follow-up consultations before refills are approved.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.6 Pharmacy Substitutions</h3>
              <p>
                Our partner pharmacies may substitute generic equivalents for brand-name medications unless your provider specifically requires the brand-name version and you agree to pay any additional cost.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Fees, Payment, and Billing</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">6.1 Service Fees</h3>
              <p>WELL charges fees for the following services:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Initial Consultation Fee:</strong> One-time fee for medical evaluation</li>
                <li><strong>Subscription Fee:</strong> Recurring monthly fee for ongoing care, follow-up consultations, and platform access</li>
                <li><strong>Medication Cost:</strong> Cost of prescribed medications (billed separately based on prescribed dosage and quantity)</li>
                <li><strong>Shipping Fees:</strong> Delivery charges for medication shipments (may be included in medication cost)</li>
              </ul>
              <p>Current pricing is displayed on our website and during the checkout process. Prices are subject to change with notice.</p>

              <h3 className="text-xl font-bold mb-3 mt-6">6.2 Payment Authorization</h3>
              <p>By providing payment information, you authorize WELL and our payment processors to charge your payment method for:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Initial consultation fees</li>
                <li>Recurring subscription fees (charged monthly on your subscription date)</li>
                <li>Medication costs when prescriptions are filled</li>
                <li>Any other fees you agree to</li>
              </ul>
              <p>You represent and warrant that you have the legal right to use any payment method you provide and that the information you provide is accurate.</p>

              <h3 className="text-xl font-bold mb-3 mt-6">6.3 Recurring Subscription Billing</h3>
              <p>If you subscribe to a recurring subscription plan:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Your payment method will be automatically charged on a monthly basis</li>
                <li>Subscriptions automatically renew until you cancel</li>
                <li>You are responsible for all charges until cancellation is complete</li>
                <li>You must cancel before your next billing date to avoid being charged</li>
              </ul>
              <p>We will send you a reminder before charging your payment method for recurring fees.</p>

              <h3 className="text-xl font-bold mb-3 mt-6">6.4 Failed Payments</h3>
              <p>If a payment fails or is declined:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>We will notify you and attempt to charge your payment method again</li>
                <li>Your access to Services may be suspended until payment is received</li>
                <li>Your account may be terminated if payment issues are not resolved</li>
                <li>You remain responsible for all amounts owed</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">6.5 Insurance</h3>
              <p>
                WELL currently does not accept health insurance. All fees are out-of-pocket expenses. You may be able to submit receipts to your insurance company or use HSA/FSA funds for eligible expenses, but we cannot guarantee reimbursement.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">6.6 Taxes</h3>
              <p>
                You are responsible for any applicable federal, state, or local taxes related to your use of the Services. We will collect and remit sales tax where required by law.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Cancellation, Refunds, and Termination</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">7.1 Your Right to Cancel</h3>
              <p>
                You may cancel your subscription at any time through your patient portal or by contacting customer support at support@well.inc. Cancellation will be effective at the end of your current billing period. You will continue to have access to Services through the end of your paid subscription period.
              </p>
              <p>To avoid being charged for the next billing period, you must cancel before your next billing date.</p>

              <h3 className="text-xl font-bold mb-3 mt-6">7.2 Refund Policy</h3>
              <p>
                <strong>Consultation Fees:</strong> Initial consultation fees are generally non-refundable once your medical evaluation has been completed, regardless of whether a prescription is issued.
              </p>
              <p>
                <strong>Subscription Fees:</strong> Subscription fees for the current billing period are non-refundable. If you cancel mid-cycle, you will retain access through the end of the paid period but will not receive a prorated refund.
              </p>
              <p>
                <strong>Medication Costs:</strong> Medication costs are non-refundable once the prescription has been filled and shipped. If there is an error in your order, you must contact us within 48 hours of delivery for potential resolution.
              </p>
              <p><strong>Exceptions:</strong> We may issue refunds on a case-by-case basis at our sole discretion for exceptional circumstances, such as:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Billing errors or duplicate charges</li>
                <li>Service unavailability or technical failures preventing service delivery</li>
                <li>Medication errors by the pharmacy</li>
              </ul>
              <p>To request a refund, contact support@well.inc with your account information and explanation.</p>

              <h3 className="text-xl font-bold mb-3 mt-6">7.3 Our Right to Terminate</h3>
              <p>WELL reserves the right to suspend or terminate your account and access to Services at any time, with or without notice, for any reason, including but not limited to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Violation of these Terms or our policies</li>
                <li>Providing false or misleading information</li>
                <li>Abusive or inappropriate conduct toward staff or providers</li>
                <li>Suspected fraud or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Failure to comply with treatment requirements</li>
                <li>Drug-seeking behavior or medication misuse</li>
                <li>If your provider determines it is not safe or appropriate to continue treatment</li>
              </ul>
              <p>If your account is terminated, you forfeit access to Services and any unused subscription time without refund.</p>

              <h3 className="text-xl font-bold mb-3 mt-6">7.4 Effect of Termination</h3>
              <p>Upon termination of your account:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Your access to Services will be immediately revoked</li>
                <li>You remain responsible for any outstanding fees</li>
                <li>You will no longer receive prescriptions or refills</li>
                <li>Your medical records will be retained as required by law</li>
                <li>Provisions of these Terms that should survive termination will remain in effect</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. User Conduct and Prohibited Activities</h2>
              <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Provide false, inaccurate, or misleading information</li>
                <li>Impersonate another person or entity</li>
                <li>Use the Services to obtain medications for anyone other than yourself</li>
                <li>Share, sell, or distribute medications prescribed to you</li>
                <li>Attempt to manipulate or deceive healthcare providers</li>
                <li>Engage in drug-seeking behavior or request specific medications inappropriately</li>
                <li>Use the Services while in a location other than your verified state of residence</li>
                <li>Harass, threaten, or abuse our staff, providers, or other users</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Reverse engineer, decompile, or attempt to extract source code from our platform</li>
                <li>Use automated systems (bots, scrapers) to access the Services</li>
                <li>Violate any applicable federal, state, or local laws or regulations</li>
                <li>Infringe on intellectual property rights of WELL or others</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Interfere with or disrupt the Services or servers</li>
              </ul>
              <p>Violation of these prohibitions may result in immediate termination of your account and may be reported to law enforcement authorities.</p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">9.1 WELL Content and Materials</h3>
              <p>
                All content, materials, features, and functionality available through our Services, including but not limited to text, graphics, logos, icons, images, audio, video, software, and the compilation thereof (collectively, &quot;Content&quot;), are the exclusive property of Well.Inc LLC or its licensors and are protected by U.S. and international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">9.2 Limited License</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal, non-commercial use, subject to these Terms. This license does not include any rights to:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any Content</li>
                <li>Use any Content for commercial purposes</li>
                <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">9.3 Trademarks</h3>
              <p>
                Well.Inc LLC, WELL, our logo, and related marks are trademarks and service marks of Well.Inc LLC. You may not use these marks without our prior written consent.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">9.4 User Content</h3>
              <p>
                By submitting content to our Services (including medical information, photos, messages, and feedback), you grant WELL a non-exclusive, worldwide, royalty-free license to use, store, and process such content solely for the purpose of providing Services to you and as described in our Privacy Policy.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our collection, use, and disclosure of your personal information and protected health information is governed by our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and our HIPAA Notice of Privacy Practices, which are incorporated into these Terms by reference.
              </p>
              <p>
                By using our Services, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.
              </p>
              <p>
                We implement industry-standard security measures to protect your information, but you acknowledge that no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Disclaimers and Warranties</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">11.1 Medical Disclaimer</h3>
              <p>
                <strong>WELL DOES NOT PRACTICE MEDICINE, PROVIDE MEDICAL ADVICE, OR DIAGNOSE OR TREAT MEDICAL CONDITIONS.</strong> All medical services are provided by independent, licensed healthcare providers who are solely responsible for their medical judgments and decisions.
              </p>
              <p>WELL makes no representations or warranties regarding:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>The quality, safety, or effectiveness of medical services provided by healthcare providers</li>
                <li>The accuracy or completeness of medical advice or information provided</li>
                <li>Treatment outcomes or results</li>
                <li>That any particular treatment will be appropriate for your condition</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">11.2 Platform Disclaimer</h3>
              <p>
                <strong>THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong> To the fullest extent permitted by law, WELL disclaims all warranties, express or implied, including but not limited to:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                <li>Warranties that the Services will be uninterrupted, error-free, secure, or free of viruses or harmful components</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of content or information</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">11.3 Third-Party Services</h3>
              <p>
                Our Services may integrate with or link to third-party services (such as pharmacies, payment processors, or shipping providers). WELL is not responsible for the actions, content, or services of third parties. Your use of third-party services is at your own risk and subject to their terms and policies.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">11.4 No Guarantee of Results</h3>
              <p>
                WELL makes no guarantees or warranties regarding treatment outcomes, weight loss results, or any specific medical results. Individual results may vary based on many factors including adherence to treatment, individual physiology, lifestyle, and other medical conditions.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Limitation of Liability</h2>
              <p>
                <strong>TO THE FULLEST EXTENT PERMITTED BY LAW, Well.Inc LLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, SUCCESSORS, AND ASSIGNS SHALL NOT BE LIABLE FOR:</strong>
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES</li>
                <li>DAMAGES FOR LOSS OF PROFITS, REVENUE, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES</li>
                <li>DAMAGES RESULTING FROM MEDICAL TREATMENT, MEDICATION SIDE EFFECTS, OR TREATMENT OUTCOMES</li>
                <li>DAMAGES ARISING FROM ACTS OR OMISSIONS OF HEALTHCARE PROVIDERS, PHARMACIES, OR OTHER THIRD PARTIES</li>
                <li>DAMAGES RESULTING FROM UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA OR TRANSMISSIONS</li>
                <li>DAMAGES RESULTING FROM SERVICE INTERRUPTIONS, ERRORS, OR TECHNICAL FAILURES</li>
                <li>DAMAGES ARISING FROM YOUR VIOLATION OF THESE TERMS</li>
              </ul>
              <p>
                <strong>IN NO EVENT SHALL Well.Inc LLC&apos;S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICES EXCEED THE AMOUNT YOU PAID TO WELL IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.</strong>
              </p>
              <p>
                Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Well.Inc LLC, its officers, directors, employees, agents, affiliates, successors, and assigns from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising from or relating to:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Your violation of these Terms or any applicable law or regulation</li>
                <li>Your violation of any rights of any third party</li>
                <li>Your use or misuse of the Services</li>
                <li>Your provision of false, inaccurate, or misleading information</li>
                <li>Your misuse of prescription medications</li>
                <li>Any content or information you submit through the Services</li>
              </ul>
              <p>
                WELL reserves the right to assume the exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Dispute Resolution and Arbitration</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">14.1 Informal Resolution</h3>
              <p>
                If you have a dispute with WELL, you agree to first contact us at support@well.inc to attempt to resolve the dispute informally. We will work with you in good faith to resolve any issues.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">14.2 Binding Arbitration</h3>
              <p>
                <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.</strong>
              </p>
              <p>
                Except where prohibited by law, you agree that any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Services shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Consumer Arbitration Rules, rather than in court.
              </p>
              <p>
                The arbitration will be conducted in Wyoming or in your state of residence (at your option), and the arbitrator&apos;s decision shall be final and binding. Judgment on the arbitration award may be entered in any court having jurisdiction.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">14.3 Class Action Waiver</h3>
              <p>
                <strong>YOU AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS ONLY, AND NOT AS A CLASS ACTION, CONSOLIDATED ACTION, OR REPRESENTATIVE ACTION.</strong> You waive any right to participate in a class action lawsuit or class-wide arbitration.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">14.4 Exceptions</h3>
              <p>
                Either party may bring a claim in small claims court if the claim qualifies. Additionally, either party may seek injunctive or equitable relief in court to prevent infringement of intellectual property rights.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">14.5 Opt-Out</h3>
              <p>
                You may opt out of this arbitration agreement by sending written notice to Well.Inc LLC at 30 N Gould St Ste R, Sheridan, WY 82801 within 30 days of first accepting these Terms. Your notice must include your name, address, and a clear statement that you wish to opt out of the arbitration agreement.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. Governing Law and Jurisdiction</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the State of Wyoming, without regard to its conflict of law principles.
              </p>
              <p>
                Subject to the arbitration provisions above, any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the federal or state courts located in Wyoming, and you consent to the personal jurisdiction of such courts.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">16. Modifications to Terms</h2>
              <p>WELL reserves the right to modify, update, or change these Terms at any time. We will notify you of material changes by:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Posting the updated Terms on our website with a new &quot;Last Updated&quot; date</li>
                <li>Sending an email notification to the address on file</li>
                <li>Displaying a prominent notice on our platform</li>
              </ul>
              <p>
                Material changes will be effective 30 days after notice is provided, except changes required by law which may be effective immediately. Your continued use of the Services after the effective date constitutes your acceptance of the updated Terms.
              </p>
              <p>
                If you do not agree to the updated Terms, you must stop using the Services and cancel your account before the effective date.
              </p>
            </section>

            {/* Section 17 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">17. General Provisions</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">17.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and WELL regarding the Services and supersede all prior agreements and understandings.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">17.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">17.3 Waiver</h3>
              <p>
                Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision or any other provision. No waiver shall be effective unless in writing and signed by WELL.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">17.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. WELL may assign these Terms without restriction.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">17.5 No Third-Party Beneficiaries</h3>
              <p>
                These Terms do not create any third-party beneficiary rights except as expressly stated herein.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">17.6 Force Majeure</h3>
              <p>
                WELL shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, labor disputes, or government actions.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">17.7 Electronic Communications</h3>
              <p>
                By using the Services, you consent to receive electronic communications from us, including emails, text messages, and notices posted on our platform. These electronic communications satisfy any legal requirement that communications be in writing.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">17.8 Survival</h3>
              <p>
                Provisions of these Terms that by their nature should survive termination shall survive, including but not limited to: ownership provisions, warranty disclaimers, indemnification, limitations of liability, and dispute resolution provisions.
              </p>
            </section>

            {/* Section 18 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">18. Contact Information</h2>
              <p>If you have questions about these Terms of Service or need to contact us for any reason, please reach out:</p>
              <div className="bg-gray-100 p-6 rounded-lg mt-4">
                <p className="mb-2"><strong>Well.Inc LLC</strong></p>
                <p className="mb-2">30 N Gould St Ste R, Sheridan, WY 82801</p>
                <p className="mb-2"><strong>Email:</strong> support@well.inc</p>
                <p className="mb-2"><strong>Website:</strong> www.well.inc</p>
              </div>
              <p className="mt-6">
                For medical or clinical questions about your treatment, please contact your healthcare provider through your patient portal.
              </p>
            </section>

            {/* Section 19 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">19. Acknowledgment</h2>
              <p>
                <strong>BY CREATING AN ACCOUNT OR USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.</strong>
              </p>
              <p>You further acknowledge that:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You understand the nature and limitations of telehealth services</li>
                <li>You consent to receive medical treatment via telehealth</li>
                <li>You will provide accurate and complete health information</li>
                <li>You understand that WELL is a technology platform, not a medical provider</li>
                <li>Medical services are provided by independent licensed healthcare providers</li>
                <li>There is no guarantee you will receive a prescription</li>
              </ul>
            </section>

            {/* Effective Date Box */}
            <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm"><strong>Effective Date:</strong> November 24, 2025</p>
              <p className="text-sm mt-2"><strong>Last Updated:</strong> November 24, 2025</p>
              <p className="text-sm mt-2">These Terms of Service are effective as of the date listed above.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer2 />
    </>
  );
}
