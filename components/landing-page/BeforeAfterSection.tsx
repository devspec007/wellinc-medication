'use client';

import BeforeAfterSlider from './BeforeAfterSlider';
import WeightCalculator from './WeightCalculator';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BeforeAfterSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    { icon: '/landing/hospital.png', text: 'US-Certified Pharmacy' },
    { icon: '/landing/personalized.webp', text: 'Personalized Treatments' },
    { icon: '/landing/trusted.webp', text: 'Trusted by 100k+ Americans' },
    { icon: '/landing/medical.webp', text: '1:1 Medical Support' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-10 px-4">
        {/* Left: Before/After Slider */}
        <BeforeAfterSlider />

        {/* Right: Weight Calculator */}
        <WeightCalculator />
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 pt-8 md:pb-8">
        {/* Mobile Carousel - Hidden on desktop */}
        <div className="md:hidden border border-gray-200 rounded-xl p-2 overflow-hidden">
          <div className="relative flex items-center justify-center min-h-[40px]">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute w-full flex items-center justify-center space-x-3 transition-all duration-500 ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <img src={feature.icon} alt={feature.text} className="w-8 h-8 object-contain flex-shrink-0" />
                <p className="text-sm font-medium text-center">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:flex justify-center space-x-12 p-4 items-center border border-gray-200 rounded-xl">
          <div className="flex items-center text-center">
            <img src="/landing/hospital.png" alt="US-Certified Pharmacy" className="mx-auto mr-1" />
            <p className="text-sm lg:text-base font-normal">US-Certified Pharmacy</p>
          </div>
          <div className="flex items-center text-center">
            <img src="/landing/personalized.webp" alt="Personalized Treatments" className="mx-auto mr-1" />
            <p className="text-sm lg:text-base font-normal">Personalized Treatments</p>
          </div>
          <div className="flex items-center text-center">
            <img src="/landing/trusted.webp" alt="Trusted by 100k+ Americans" className="mx-auto mr-1" />
            <p className="text-sm lg:text-base font-normal">Trusted by 100k+ Americans</p>
          </div>
          <div className="flex items-center text-center">
            <img src="/landing/medical.webp" alt="1:1 Medical Support" className="mx-auto mr-1" />
            <p className="text-sm lg:text-base font-normal">1:1 Medical Support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 pt-8 md:pb-8 text-center">
        <div className="flex justify-center gap-4 mb-2">
          <Link
            href="/intake/height_weight"
            className="bg-black text-white px-12 py-3 rounded-full font-semibold shadow hover:bg-blue-500 transition"
          >
            Get started
          </Link>
          <Link
            href="/intake/height_weight"
            className="bg-white border border-gray-300 text-gray-800 px-12 py-3 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition"
          >
            See pricing
          </Link>
        </div>
        <div className="alt mt-4 text-sm text-gray-900 flex flex-col items-center space-y-4">
          <div className="flex justify-center gap-4 flex-wrap text-center">
            <span><i className="bi bi-ban"></i> No Hidden Fees</span>
            <span><i className="bi bi-ban"></i> No Monthly Membership</span>
            <span><i className="bi bi-check-circle"></i> Cancel Anytime</span>
          </div>

          <img 
            src="/landing/trustpilot-100.png" 
            alt="Trustpilot Rating" 
            className="w-full max-w-[300px] pt-4 mx-auto h-auto"
            style={{ maxWidth: '300px' }}
          />
        </div>
      </section>
    </section>
  );
}

