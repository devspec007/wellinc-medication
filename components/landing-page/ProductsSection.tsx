'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductsSection() {
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
    <section className="w-full bg-gray-100 py-16" style={{ borderTop: '5px solid #fff' }}>
      <div className="text-center">
        <h2 className="text-3xl lg:text-3xl py-10 font-normal tracking-tight text-gray-900 mb-4">
          Medications In Stock Ready to Ship
        </h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-10 px-4">
        {/* Product 1: Injections */}
        <div className="md:w-1/2 w-full flex items-center justify-center px-6 pt-6 rounded-3xl bg-white overflow-hidden relative">
          {/* Tag */}
          <span className="absolute bottom-10 left-4 text-black text-xs font-semibold px-6 py-3 rounded-full shadow-md z-10 bg-[linear-gradient(164deg,#d2ffda_0%,#e6fbff_50%,#b5d3fd_100%)]">
            As Low As $155/Mo
          </span>

          <div className="text-center md:text-left max-w-md w-full">
            <h2 className="text-5xl font-light tracking-tight text-gray-900 mb-4" style={{ fontSize: '2.5rem' }}>
              Compounded GLP-1
              <p style={{ fontSize: '1.7rem', paddingTop: '15px' }}>(Contains: Semaglutide)</p>
            </h2>
            <hr className="my-5" />
            <img
              src="/landing/well_inc_final_semaglutide_transparent.png"
              alt="GLP-1"
              className='-mb-[10px] md:-mb-[80px]'
            />
          </div>
        </div>

        {/* Product 2: Oral Drops */}
        <div className="md:w-1/2 w-full flex items-center justify-center px-6 pt-6 rounded-3xl bg-white overflow-hidden relative">
          {/* Tag */}
          <span className="absolute bottom-10 left-4 text-black text-xs font-semibold px-6 py-3 rounded-full shadow-md z-10 bg-[linear-gradient(164deg,#d2ffda_0%,#e6fbff_50%,#b5d3fd_100%)]">
            As Low As $225/Mo
          </span>

          <div className="text-center md:text-left max-w-md w-full">
            <h2 className="text-5xl font-light tracking-tight text-gray-900 mb-4" style={{ fontSize: '2.5rem' }}>
              Compounded GLP-1 + GIP
              <p style={{ fontSize: '1.7rem', paddingTop: '15px' }}>(Contains: Tirzepatide)</p>
            </h2>
            <hr className="my-5" />
            <img
              src="/landing/well_inc_final_tirzepatide_transparent.png"
              alt="GLP-1 + GIP"
              className='-mb-[10px] md:-mb-[80px]'
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 pt-8 md:pb-8">
        {/* Mobile Carousel - Hidden on desktop */}
        <div className="md:hidden border border-gray-200 rounded-xl p-2 overflow-hidden">
          <div className="relative flex items-center justify-center min-h-[40px]">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute w-full flex items-center justify-center space-x-3 transition-all duration-500 ${index === currentSlide
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

