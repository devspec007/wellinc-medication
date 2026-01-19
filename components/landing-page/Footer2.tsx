'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="bg-[linear-gradient(164deg,#d2ffda_0%,#e6fbff_50%,#b5d3fd_100%)] rounded-t-[48px] mt-32 overflow-hidden">
        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Footer Links */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-6 gap-10 text-sm text-gray-700">
          {/* Column 1: Logo + copyright */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <Link href="/">
              <span style={{ fontSize: '1.7rem' }}>Well.inc</span>
            </Link>
            <p className="mt-4 text-xs text-gray-500">&copy; 2025 WellInc</p>
          </div>

          {/* Column 2: Links */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 font-medium mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/consumer-health-data-privacy">Consumer Health Data Privacy</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Terms */}
          <div className="md:col-span-4 text-xs text-gray-500 leading-snug">
            <p className="mb-2">
              * Based on the average weight loss in three 68-week clinical trials of patients without diabetes who
              reached and maintained a dose of 2.4 mg/week of GLP-1 treatment, along with a reduced-calorie diet and
              increased physical activity. Results may vary based on starting weight and program adherence.
            </p>
            <p className="mb-2">
              Safety info: GLP-1 medications are used to treat obesity or overweight (with weight-related problems),
              along with diet and exercise. They may have serious side effects, including possible thyroid tumors. Do
              not use if you or your family have a history of a type of thyroid cancer called MTC or MEN 2.
            </p>
            <p className="mb-2">
              These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat,
              cure or prevent any disease.
            </p>
            <p className="mb-2">
              + Wegovy® is for weight loss. Ozempic® is for type 2 diabetes treatment but may be prescribed for weight
              loss. All trademarks and brand names belong to their respective owners.
            </p>
            <p>Medical treatment is provided and approved by a licensed medical professional.</p>
          </div>
        </div>

        {/* Social Icons / Certification */}
        <div className="border-t border-gray-200 py-6 px-6 flex justify-center space-x-6 text-gray-600 text-xl">
          <div className="footer-badge">
            <img
              src="https://static.legitscript.com/seals/183773.png"
              alt="Verify LegitScript Approval"
              width="73"
              height="79"
            />
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm">
        &copy; 2025 WellInc. All rights reserved.
      </footer>
    </>
  );
}

