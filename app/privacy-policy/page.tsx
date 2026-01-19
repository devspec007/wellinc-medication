import Header2 from '@/components/landing-page/Header2';
import Footer2 from '@/components/landing-page/Footer2';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Well.inc',
  description: 'Privacy Policy for Well.inc Telehealth Services',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header2 />
      
      <main>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              <strong>Effective Date:</strong> November 24, 2025
            </p>
            <p className="text-lg mb-6">
              <strong>Last Updated:</strong> November 24, 2025
            </p>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                Well.Inc LLC (&quot;WELL,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of your personal information and protected health information (PHI). This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our telehealth platform and services, including our website, mobile applications, and patient portal (collectively, the &quot;Services&quot;).
              </p>
              <p>
                By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
              </p>
              <p>
                <strong>Important:</strong> This Privacy Policy applies to information collected through our platform. Your medical information is also protected by our Notice of Privacy Practices (HIPAA Notice), which is provided separately and governs how we use and disclose your protected health information.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. HIPAA Compliance and Covered Entity Status</h2>
              <p>
                WELL operates as a covered entity under the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and complies with all applicable HIPAA Privacy and Security Rules. We are committed to protecting your protected health information (PHI) in accordance with federal and state privacy laws.
              </p>
              <p>
                Your PHI is subject to the protections outlined in our Notice of Privacy Practices, which is available upon request and provided during your initial enrollment. This Privacy Policy supplements our HIPAA Notice of Privacy Practices.
              </p>
              <p><strong>Your HIPAA Rights Include:</strong></p>
              <ul className="list-disc ml-6 mb-4">
                <li>The right to access and obtain a copy of your medical records</li>
                <li>The right to request corrections to your PHI</li>
                <li>The right to receive an accounting of disclosures of your PHI</li>
                <li>The right to request restrictions on certain uses and disclosures</li>
                <li>The right to request confidential communications</li>
                <li>The right to file a complaint if you believe your privacy rights have been violated</li>
              </ul>
              <p>
                To exercise any of these rights or to request a copy of our Notice of Privacy Practices, please contact our Privacy Officer at privacy@well.inc.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Information We Collect</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">3.1 Protected Health Information (PHI)</h3>
              <p>We collect protected health information necessary to provide you with quality telehealth services, including:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Demographic Information:</strong> Full legal name, date of birth, gender, address, phone number, email address</li>
                <li><strong>Medical History:</strong> Current and past medical conditions, allergies, family medical history, surgical history</li>
                <li><strong>Medication Information:</strong> Current medications, dosages, pharmacy information, medication history</li>
                <li><strong>Clinical Information:</strong> Symptoms, diagnoses, treatment plans, lab results, vital signs, body measurements (height, weight, BMI)</li>
                <li><strong>Treatment Records:</strong> Physician notes, consultation records, prescription records, progress notes, treatment outcomes</li>
                <li><strong>Clinical Photos:</strong> Photos submitted for medical evaluation and documentation (if applicable to your treatment)</li>
                <li><strong>Health Questionnaire Responses:</strong> Responses to medical intake forms and ongoing health assessments</li>
                <li><strong>Insurance Information:</strong> Health insurance provider, policy numbers, coverage details (if applicable)</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">3.2 Personal Identification Information</h3>
              <p>We collect personal information to verify your identity, process payments, and communicate with you:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address, shipping address</li>
                <li><strong>Identity Verification:</strong> Government-issued photo identification, date of birth, last four digits of Social Security Number (for identity verification purposes only)</li>
                <li><strong>Payment Information:</strong> Credit card or debit card information, billing address, payment history</li>
                <li><strong>Account Credentials:</strong> Username, password (encrypted), security questions and answers</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">3.3 Technical and Usage Information</h3>
              <p>We automatically collect certain information when you access our Services:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Device Information:</strong> IP address, device type, operating system, browser type and version, unique device identifiers</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent on pages, links clicked, features accessed, search queries</li>
                <li><strong>Location Information:</strong> General geographic location based on IP address (city and state level, not precise GPS location)</li>
                <li><strong>Cookies and Tracking Technologies:</strong> Session cookies, persistent cookies, web beacons, pixel tags (see Section 10 for details)</li>
                <li><strong>Communication Records:</strong> Records of your communications with our support team, chat logs, email correspondence</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">3.4 Information from Third Parties</h3>
              <p>We may receive information about you from:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Healthcare Providers:</strong> Medical records from your previous healthcare providers (with your authorization)</li>
                <li><strong>Pharmacies:</strong> Prescription fulfillment status, medication delivery information</li>
                <li><strong>Laboratory Services:</strong> Lab test results (if ordered as part of your treatment)</li>
                <li><strong>Identity Verification Services:</strong> Verification of your identity to comply with legal requirements and prevent fraud</li>
                <li><strong>Payment Processors:</strong> Payment confirmation and transaction details</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. How We Use Your Information</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">4.1 Treatment, Payment, and Healthcare Operations (TPO)</h3>
              <p>Under HIPAA, we may use and disclose your PHI without your authorization for treatment, payment, and healthcare operations:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Treatment:</strong> Provide, coordinate, and manage your healthcare services; consult with healthcare providers; provide medical consultations; prescribe medications; monitor treatment effectiveness; coordinate care with other providers</li>
                <li><strong>Payment:</strong> Process payments for services; bill for services rendered; verify coverage; coordinate benefits; collect outstanding balances</li>
                <li><strong>Healthcare Operations:</strong> Improve quality of care; conduct quality assessment and improvement activities; train medical staff; perform business planning and development; conduct compliance audits</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">4.2 With Your Consent</h3>
              <p>With your explicit consent, we may use your information to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Send you marketing communications about our services</li>
                <li>Conduct research and analysis to improve our services</li>
                <li>Share de-identified data for research purposes</li>
                <li>Use testimonials or success stories (with identifying information removed unless you specifically authorize)</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">4.3 Legal and Safety Purposes</h3>
              <p>We may use and disclose your information when required by law or to protect safety:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Comply with federal, state, or local laws and regulations</li>
                <li>Respond to court orders, subpoenas, or legal process</li>
                <li>Report suspected abuse, neglect, or domestic violence as required by law</li>
                <li>Prevent or investigate suspected fraud or illegal activity</li>
                <li>Protect against threats to health or safety</li>
                <li>Report adverse drug reactions or product defects to the FDA</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">4.4 Service Delivery and Support</h3>
              <p>We use your information to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Create and maintain your patient account</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Process your orders and deliver medications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send appointment reminders and follow-up communications</li>
                <li>Send important service updates and notifications</li>
                <li>Conduct satisfaction surveys to improve our services</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">4.5 Platform Improvement and Analytics</h3>
              <p>We use aggregated, de-identified data to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Analyze usage patterns and improve user experience</li>
                <li>Develop new features and services</li>
                <li>Conduct quality assurance and testing</li>
                <li>Monitor platform performance and troubleshoot issues</li>
                <li>Generate statistical reports and business intelligence</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. How We Share Your Information</h2>
              <p><strong>We do not sell your personal information or protected health information.</strong></p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.1 Healthcare Providers</h3>
              <p>
                We share your PHI with licensed physicians, nurse practitioners, physician assistants, and other qualified healthcare professionals who evaluate your medical condition, prescribe treatment, and provide ongoing care. All providers are bound by HIPAA and state medical privacy laws.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.2 Business Associates</h3>
              <p>
                We engage third-party service providers (Business Associates) who assist us in providing services. These parties are contractually required to protect your information and may only use it as necessary to perform services on our behalf:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Pharmacy Partners:</strong> Licensed pharmacies that dispense and deliver your prescriptions</li>
                <li><strong>Laboratory Services:</strong> Clinical laboratories that process lab work ordered by your provider (if applicable)</li>
                <li><strong>Payment Processors:</strong> Secure payment processing services that handle credit card transactions</li>
                <li><strong>Cloud Infrastructure Providers:</strong> Secure cloud hosting services that store and process data</li>
                <li><strong>Technology Services:</strong> Software platforms for electronic health records, video consultations, and patient communications</li>
                <li><strong>Customer Support Platforms:</strong> Services that help us provide customer support</li>
                <li><strong>Identity Verification Services:</strong> Third-party services that verify your identity to prevent fraud</li>
                <li><strong>Shipping and Logistics Partners:</strong> Couriers who deliver medications to your address</li>
              </ul>
              <p>All Business Associates sign HIPAA-compliant Business Associate Agreements requiring them to safeguard your PHI.</p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.3 Legal and Regulatory Requirements</h3>
              <p>We may disclose your information when required by law:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>To comply with court orders, warrants, subpoenas, or legal process</li>
                <li>To law enforcement agencies as required by law</li>
                <li>To state medical boards or licensing authorities</li>
                <li>To the Food and Drug Administration (FDA) for adverse event reporting</li>
                <li>To report suspected abuse, neglect, or domestic violence as mandated by law</li>
                <li>To avert serious threat to health or safety when necessary</li>
                <li>For public health activities as required by law</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">5.4 With Your Authorization</h3>
              <p>
                We will obtain your written authorization before using or disclosing your PHI for purposes other than treatment, payment, healthcare operations, or as otherwise permitted by law. You may revoke your authorization at any time by contacting us at privacy@well.inc.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">5.5 De-Identified Information</h3>
              <p>
                We may use and share de-identified health information that cannot be reasonably used to identify you for research, analytics, and business purposes. De-identified information is not subject to HIPAA restrictions.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Security and Safeguards</h2>
              <p>
                We implement comprehensive administrative, technical, and physical safeguards to protect your information from unauthorized access, use, or disclosure:
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">6.1 Technical Safeguards</h3>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using industry-standard TLS/SSL protocols. Data at rest is encrypted using AES-256 encryption.</li>
                <li><strong>Access Controls:</strong> Multi-factor authentication for user accounts; role-based access controls limiting staff access to only necessary information.</li>
                <li><strong>Secure Infrastructure:</strong> HIPAA-compliant cloud hosting with regular security audits and penetration testing.</li>
                <li><strong>Network Security:</strong> Firewalls, intrusion detection systems, and security monitoring to protect against unauthorized access.</li>
                <li><strong>Automatic Logoff:</strong> Sessions automatically expire after periods of inactivity.</li>
                <li><strong>Data Backups:</strong> Regular encrypted backups with secure, redundant storage.</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">6.2 Administrative Safeguards</h3>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Privacy and Security Training:</strong> All workforce members receive regular training on HIPAA and data protection requirements.</li>
                <li><strong>Business Associate Agreements:</strong> Written agreements with all third parties who handle PHI.</li>
                <li><strong>Incident Response Plan:</strong> Documented procedures for responding to security incidents and data breaches.</li>
                <li><strong>Risk Assessments:</strong> Regular evaluation of security risks and implementation of appropriate safeguards.</li>
                <li><strong>Sanctions Policy:</strong> Disciplinary measures for workforce members who violate privacy policies.</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">6.3 Physical Safeguards</h3>
              <ul className="list-disc ml-6 mb-4">
                <li>Secure data centers with restricted physical access</li>
                <li>Video surveillance and access logging</li>
                <li>Secure disposal of physical records and devices containing PHI</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">6.4 Breach Notification</h3>
              <p>
                In the event of a breach of unsecured protected health information, we will notify affected individuals, the Secretary of the Department of Health and Human Services, and, if required, the media, in accordance with HIPAA Breach Notification requirements.
              </p>
              <p className="mt-4">
                <strong>Important Security Note:</strong> While we implement robust security measures, no system is completely secure. You are responsible for maintaining the confidentiality of your account credentials and should never share your password with others.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Your Privacy Rights</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">7.1 HIPAA Rights</h3>
              <p>Under HIPAA, you have the following rights regarding your protected health information:</p>

              <h4 className="text-lg font-bold mb-2 mt-4">Right to Access</h4>
              <p>
                You have the right to inspect and obtain a copy of your medical records and billing records. We will respond to your request within 30 days. We may charge a reasonable, cost-based fee for copying and mailing records.
              </p>

              <h4 className="text-lg font-bold mb-2 mt-4">Right to Amend</h4>
              <p>
                You have the right to request that we amend your PHI if you believe it is incorrect or incomplete. We may deny your request in certain circumstances, and we will provide you with a written explanation of any denial.
              </p>

              <h4 className="text-lg font-bold mb-2 mt-4">Right to an Accounting of Disclosures</h4>
              <p>
                You have the right to receive a list of certain disclosures we have made of your PHI within the past six years (excluding disclosures for treatment, payment, or healthcare operations).
              </p>

              <h4 className="text-lg font-bold mb-2 mt-4">Right to Request Restrictions</h4>
              <p>
                You have the right to request restrictions on how we use or disclose your PHI. We are not required to agree to your request except in certain circumstances involving payments from health plans.
              </p>

              <h4 className="text-lg font-bold mb-2 mt-4">Right to Confidential Communications</h4>
              <p>
                You have the right to request that we communicate with you about medical matters in a certain way or at a certain location (e.g., by mail instead of phone).
              </p>

              <h4 className="text-lg font-bold mb-2 mt-4">Right to a Paper Copy of This Notice</h4>
              <p>
                You have the right to receive a paper copy of our Notice of Privacy Practices at any time, even if you agreed to receive it electronically.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">7.2 General Privacy Rights</h3>
              <p>In addition to your HIPAA rights, you have the following rights:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Right to Know:</strong> Request information about what personal information we collect, use, and share</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
                <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt out of marketing communications at any time</li>
                <li><strong>Right to Data Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Right to Non-Discrimination:</strong> You will not receive discriminatory treatment for exercising your privacy rights</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">7.3 How to Exercise Your Rights</h3>
              <p>To exercise any of these rights, please contact us:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Email:</strong> privacy@well.inc</li>
                <li><strong>Mail:</strong> Well.Inc LLC, Attn: Privacy Officer, 30 N Gould St Ste R, Sheridan, WY 82801</li>
                <li><strong>Patient Portal:</strong> Submit a request through your account settings</li>
              </ul>
              <p>
                We will respond to your request within 30 days (or as required by applicable law). We may require verification of your identity before processing your request.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. State-Specific Privacy Rights</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">8.1 California Residents (CCPA/CPRA)</h3>
              <p>California residents have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Right to know what personal information we collect, use, disclose, and sell</li>
                <li>Right to delete personal information (subject to exceptions)</li>
                <li>Right to correct inaccurate personal information</li>
                <li>Right to opt-out of the sale or sharing of personal information (we do not sell personal information)</li>
                <li>Right to limit use of sensitive personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>
              <p>
                <strong>Note:</strong> Medical information governed by HIPAA is exempt from certain CCPA provisions, but we extend many CCPA protections to all personal information we collect.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">8.2 Virginia, Colorado, Connecticut, and Utah Residents</h3>
              <p>Residents of these states have rights including:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Right to access personal data</li>
                <li>Right to correct inaccuracies in personal data</li>
                <li>Right to delete personal data</li>
                <li>Right to data portability</li>
                <li>Right to opt-out of targeted advertising and sale of personal data (we do not engage in these activities)</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">8.3 Washington Residents (My Health My Data Act)</h3>
              <p>
                Washington residents have enhanced protections for consumer health data. Please see our <Link href="/consumer-health-data-privacy" className="text-blue-600 hover:underline">Consumer Health Data Privacy Policy</Link> for details.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">8.4 Nevada Residents</h3>
              <p>
                Nevada residents have the right to opt-out of the sale of their personal information. We do not sell personal information to third parties.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Cookies and Tracking Technologies</h2>
              
              <h3 className="text-xl font-bold mb-3 mt-6">9.1 Types of Cookies We Use</h3>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly (e.g., authentication, security)</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site (e.g., Google Analytics)</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and personalize your experience</li>
                <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant advertising (only with your consent)</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">9.2 Third-Party Analytics</h3>
              <p>
                We use third-party analytics services (e.g., Google Analytics) to understand how users interact with our Services. These services may use cookies and similar technologies to collect information about your use of our Services. This information is aggregated and does not identify you personally.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">9.3 Your Cookie Choices</h3>
              <p>
                Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies. However, disabling cookies may affect your ability to use certain features of our Services. You can also opt-out of targeted advertising through industry opt-out tools:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Digital Advertising Alliance: <a href="http://optout.aboutads.info/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">optout.aboutads.info</a></li>
                <li>Network Advertising Initiative: <a href="http://optout.networkadvertising.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">optout.networkadvertising.org</a></li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy and to comply with legal and regulatory requirements:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Medical Records:</strong> Retained for a minimum of 7 years from the date of last treatment, or as required by state law (whichever is longer). Some states require longer retention periods.</li>
                <li><strong>Prescription Records:</strong> Retained in accordance with DEA and state pharmacy regulations (typically 2-7 years)</li>
                <li><strong>Billing Records:</strong> Retained for 7 years as required by IRS regulations</li>
                <li><strong>Account Information:</strong> Retained while your account is active and for a reasonable period thereafter</li>
                <li><strong>Marketing Data:</strong> Retained until you opt-out or request deletion</li>
              </ul>
              <p>
                After the retention period expires, we securely delete or de-identify your information. You may request early deletion of certain information (subject to legal retention requirements) by contacting privacy@well.inc.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Children&apos;s Privacy</h2>
              <p>
                Our Services are intended for adults aged 18 and older. We do not knowingly collect, use, or disclose personal information from individuals under 18 years of age. If you are under 18, please do not use our Services or provide any information to us.
              </p>
              <p>
                If we learn that we have collected personal information from a child under 18 without verification of parental consent, we will delete that information as quickly as possible. If you believe we have collected information from a child under 18, please contact us immediately at privacy@well.inc.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. International Users and Data Transfers</h2>
              <p>
                Our Services are provided from the United States and are intended for users located in the United States. If you access our Services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located and our service providers operate.
              </p>
              <p>
                The data protection laws in the United States may differ from those in your country of residence. By using our Services, you consent to the transfer of your information to the United States and its processing in accordance with this Privacy Policy and applicable U.S. laws.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Third-Party Links and Services</h2>
              <p>
                Our Services may contain links to third-party websites, applications, or services that are not owned or controlled by WELL. This Privacy Policy does not apply to third-party websites or services. We are not responsible for the privacy practices of third parties.
              </p>
              <p>
                We encourage you to review the privacy policies of any third-party websites or services before providing them with your personal information.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Posting the updated Privacy Policy on our website with a new &quot;Last Updated&quot; date</li>
                <li>Sending you an email notification (if you have an account)</li>
                <li>Displaying a prominent notice on our website or in our patient portal</li>
              </ul>
              <p>
                Your continued use of our Services after the effective date of the updated Privacy Policy constitutes your acceptance of the changes. If you do not agree with the updated Privacy Policy, you must stop using our Services.
              </p>
              <p>
                We will not make material changes to how we use your PHI without first obtaining your authorization, as required by HIPAA.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. How to Contact Us</h2>
              <p>
                If you have questions, concerns, or complaints about this Privacy Policy, our privacy practices, or your privacy rights, please contact us:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg mt-4">
                <p className="mb-2"><strong>Well.Inc LLC</strong></p>
                <p className="mb-2">Attn: Privacy Officer</p>
                <p className="mb-2">30 N Gould St Ste R, Sheridan, WY 82801</p>
                <p className="mb-2"><strong>Email:</strong> privacy@well.inc</p>
                <p className="mb-2"><strong>Support Email:</strong> support@well.inc</p>
              </div>
              <p className="mt-6">
                We will investigate and attempt to resolve complaints and disputes regarding use and disclosure of PHI in accordance with this Privacy Policy and applicable law.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">16. Filing a Complaint</h2>
              <p>If you believe your privacy rights have been violated, you have the right to file a complaint with:</p>
              
              <h3 className="text-xl font-bold mb-3 mt-6">WELL:</h3>
              <p>
                Well.Inc LLC<br />
                Attn: Privacy Officer<br />
                30 N Gould St Ste R, Sheridan, WY 82801<br />
                Email: privacy@well.inc
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">U.S. Department of Health and Human Services:</h3>
              <p>
                Office for Civil Rights<br />
                U.S. Department of Health and Human Services<br />
                200 Independence Avenue, S.W.<br />
                Washington, D.C. 20201<br />
                Phone: 1-877-696-6775<br />
                Website: <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.hhs.gov/ocr/privacy/hipaa/complaints/</a>
              </p>

              <p className="mt-4">
                <strong>You will not be retaliated against or penalized for filing a complaint.</strong>
              </p>
            </section>

            {/* Section 17 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">17. Acknowledgment and Consent</h2>
              <p>
                By using our Services, you acknowledge that you have read and understood this Privacy Policy and our Notice of Privacy Practices. You consent to the collection, use, and disclosure of your information as described in this Privacy Policy.
              </p>
              <p>
                If you do not agree with this Privacy Policy, you must not access or use our Services.
              </p>
            </section>

            {/* Effective Date Box */}
            <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm"><strong>Last Updated:</strong> November 24, 2025</p>
              <p className="text-sm mt-2">
                This Privacy Policy is effective as of the date listed above and applies to all information collected by Well.Inc LLC on or after this date.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer2 />
    </>
  );
}
