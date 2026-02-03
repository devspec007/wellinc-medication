'use client';

import { useState } from 'react';

const faqs = [
  {
    avatar: '/landing/q1.jpg',
    question: 'How does WellInc work?',
    answer: [
      "WellInc allows you to get prescription weight loss medications such as semaglutide & tirzepatide from the comfort of your home. Your pricing is one simple monthly price and includes medication, supplies, doctor review and shipping. Once you've selected and paid for the first month of your chosen medication, you will need to complete an intake form for the doctor to review and approve your prescription. Once your doctor approves your prescription, our pharmacies will ship out your medication within 2 business days.",
      "When you run out of your medication, you simply let your doctor know in your WellInc Patient Portal and your Doctor will review your dosage, adjust it if needed, and write you a new prescription that gets delivered next day via UPS or FedEx.",
      "*If for any reason your prescription is not approved, you will receive a full refund.",
    ],
  },
  {
    avatar: '/landing/q2.jpg',
    question: 'How do I know this is safe?',
    answer: {
      safety: true,
    },
  },
  {
    avatar: '/landing/q3.jpg',
    question: 'So how does the signup process work?',
    answer: [
      [
        'Complete the health qualifier (should only take 5 minutes).',
        'Select your preferred prescription.',
        'Pay for the first month of your prescription.*',
        'Complete medical intake form by logging into your WellInc patient portal.',
        'Your medical practitioner is expected to review your chart within 24 hrs and often less than 5 hrs.',
        'After a thorough medical evaluation, your provider will determine whether a prescription is appropriate.',
        'If your prescription is approved, our pharmacy will ship your medication using 1-day FedEx or UPS.',
      ],
      '*If for any reason your prescription is not approved, you will receive a full refund.',
    ],
  },
  {
    avatar: '/landing/q4.jpg',
    question: 'What States/Jurisdictions are eligible?',
    answer: [
      'WellInc currently provides services to all US States.',
    ],
  },
  {
    avatar: '/landing/q5.jpg',
    question: 'How does the pricing work?',
    answer: [
      'WellInc partners with licensed doctors and pharmacy to offer competitive pricing on compounded GLP-1 weight loss medications. Our pricing is transparent with no hidden costs or monthly fees.',
      'For Semaglutide (same active ingredient in Ozempic®) pricing starts at $195/month (monthly), $175/month (quarterly), $165/month (6 months), or $155/month (annual).',
      'For Tirzepatide (same active ingredient found in Mounjaro®) pricing starts at $295/month (monthly), $265/month (quarterly), $245/month (6 months), or $225/month (annual).',
      'Included in this simple pricing is your medication, doctors visits (normally $99/visit), 1-day FedEx or UPS shipping, and all supplies needed for injections.',
      'Competitors will often charge \'access\' or membership fees. WellInc does not have those so that pricing is extremely clear and you don\'t get surprise costs.',
    ],
  },
  {
    avatar: '/landing/q6.jpg',
    question: 'What if I need to cancel?',
    answer: [
      'With WellInc there are no contracts for our month to month pricing. We also offer subscribe and save discounts where customers will agree to a subscription length for stated monthly discount. Month to month customers can cancel their shipment anytime by sending an email to support@wellinc.com or call us at (416) 262-6838. We want to make sure that our customers love the results of our treatment plans so we offer a patient satisfaction guarantee. If you are unhappy with your results, let us know and we\'ll make it right.',
    ],
  },
  {
    avatar: '/landing/q2.jpg',
    question: 'Is the medication real semaglutide & tirzepatide?',
    answer: [
      'Yes, both of our GLP-1 weight loss medications are real prescription medications that are prescribed by a doctor and compounded by a real US based pharmacy. We offer only the best Semaglutide and Tirzepatide medications for weightloss management for customers that meet the qualifications required for GLP-1 medications. These are the same medications that people are talking about and getting real results with all over social media.',
    ],
  },
  {
    avatar: '/landing/q7.jpg',
    question: 'Do you offer non-injectable options?',
    answer: [
      'No! We don’t offer oral (sublingual) Semaglutide or Tirzepatide. Current evidence suggests these options aren’t as effective or as reliable as injections, so we stick to injectable treatment for better, more consistent results.',
    ],
  },
  {
    avatar: '/landing/q8.jpg',
    question: "What is the dosage I'll be taking?",
    answer: {
      text: 'Our medical practitioner will ultimately decide what is right for you. However, our standard protocol for many patients is:',
      dosageTable: true,
    },
  },
  {
    avatar: '/landing/q9.jpg',
    question: 'Where do my prescriptions come from?',
    answer: [
      'Our pharmacies are 503A compounding pharmacies based right here in the US. A 503A pharmacy is a designation for traditional compounding, meaning they prepare medications specifically for individual patients based on a valid prescription. These pharmacies follow strict state and federal guidelines to ensure safety and quality for customized medications.',
    ],
  },
  {
    avatar: '/landing/q10.jpg',
    question: 'How do I take my medication?',
    answer: [
      'You will be provided with small insulin sized needles along with your medication. Your doctor will explain how and when to take your medication during your telemed visit. You will start with a low dose to begin your treatment once per week as your body gets used to the medication and increase your dose every 4 weeks until you are at your full dosage. Medication will be administered by injecting into the fatty area on your stomach weekly.',
    ],
  },
  {
    avatar: '/landing/q1.jpg',
    question: 'How is it shipped?',
    answer: [
      'Prescriptions received before 2 pm central time will be shipped the same day. Your prescription will be shipped next-day via UPS in a temperature controlled package. To ensure temperature management and weekend orders (Friday-Sunday) will be shipped Monday. You\'ll receive a tracking number for every shipment. Each shipment is fully insured for lost prescriptions. The only exception for insured product replacement is if a patient provides incorrect shipping information. If this occurs, please speak with customer service by emailing support@wellinc.com or calling us at (888) 696-7176.',
    ],
  },
  {
    avatar: '/landing/q11.jpg',
    question: 'How much weight will I lose?',
    answer: [
      'Individual weight-loss is dependent on a number of factors but on average patients using these weight loss medications report an average loss of 1.5% of their body weight per week. Over 12 weeks, it can be as high as 10%. This equates to a weight loss of 10–20 pounds for a 200 pound person.',
    ],
  },
  {
    avatar: '/landing/q12.jpg',
    question: 'How do I contact support?',
    answer: [
      'You can reach our friendly support team by emailing support@wellinc.com or calling us at (416) 262-6838. For faster service, visit our Patient Services page to submit a message, request a refill, or check order status. We\'re here to help!',
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderAnswer = (answer: any) => {
    // Handle special answer types
    if (typeof answer === 'object' && !Array.isArray(answer)) {
      // Safety information
      if (answer.safety) {
        return (
          <div className="space-y-4 font-light px-1">
            <p>WellInc has taken numerous steps to ensure compliance and safety for our patients.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>All <u>doctors</u> have been properly vetted to ensure they&apos;re licensed to prescribe GLP-1 medications in your state.</li>
              <li><u>Pharmacies</u> are US based 503A compounding pharmacies.</li>
              <li>WellInc has its own <u>medical director</u> who is a practicing physician and has reviewed our doctor and pharmacy network to ensure your safety.</li>
              <li>WellInc maintains <u>LegitScript certification</u> which is the telemedicine industry&apos;s most recognized compliance authority. They have independently verified WellInc pharmacies, doctors network and software providers to ensure safety and privacy protection.</li>
            </ol>
          </div>
        );
      }
      
      // Dosage table
      if (answer.dosageTable) {
        return (
          <div className="space-y-4 font-light px-1">
            <p>{answer.text}</p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="align-top pr-4 font-semibold">Medication 1:</td>
                      <td>
                        0.25mg/week for the first 4 weeks<br />
                        0.5 mg/week for the next 8 weeks<br />
                        Dosage will include Ondanestron (brand name Zofran®)
                        <br /><br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="align-top pr-4 font-semibold">Medication 2:</td>
                      <td>
                        10mg for the first 4 weeks<br />
                        20mg for the next 8 weeks<br />
                        <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
      
      // Safety information
      if (answer.safety) {
        return (
          <div className="space-y-4 font-light px-1">
            <p>WellInc has taken numerous steps to ensure compliance and safety for our patients.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>All <u>doctors</u> have been properly vetted to ensure they&apos;re licensed to prescribe GLP-1 medications in your state.</li>
              <li><u>Pharmacies</u> are US based 503A compounding pharmacies.</li>
              <li>WellInc has its own <u>medical director</u> who is a practicing physician and has reviewed our doctor and pharmacy network to ensure your safety.</li>
              <li>WellInc maintains <u>LegitScript certification</u> which is the telemedicine industry&apos;s most recognized compliance authority. They have independently verified WellInc pharmacies, doctors network and software providers to ensure safety and privacy protection.</li>
            </ol>
          </div>
        );
      }
      
    }
    
    if (Array.isArray(answer)) {
      return (
        <div className="space-y-4 font-light px-1">
          {answer.map((item, idx) => {
            if (Array.isArray(item)) {
              return (
                <ol key={idx} className="list-decimal list-inside space-y-2">
                  {item.map((subItem, subIdx) => (
                    <li key={subIdx}>{subItem}</li>
                  ))}
                </ol>
              );
            }
            return <p key={idx}>{item}</p>;
          })}
        </div>
      );
    }
    return <p className="font-light px-1">{answer}</p>;
  };

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-10" id="faqs">
      <h2 className="text-6xl text-center font-normal tracking-tight text-gray-900">We&apos;ve got you.</h2>
      <p className="text-lg text-center text-gray-600 py-4">You have questions, we have answers.</p>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className={`border border-gray-200 rounded-lg ${openIndex === index ? 'open' : ''}`}>
            <button
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 text-lg font-medium text-gray-900 focus:outline-none group"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center gap-4">
                <img src={faq.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                {faq.question}
              </div>
              {/* Icon */}
              <div className="text-3xl text-gray-500 transition-transform duration-300">
                <span className="plus-minus-icon"></span>
              </div>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-700">
                <div className="flex items-start gap-4 pl-4">
                  {renderAnswer(faq.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

