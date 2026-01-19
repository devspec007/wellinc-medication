'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import VideoCarousel from './VideoCarousel';

export default function VideoTestimonials() {
  useEffect(() => {
    // Animation for pens
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const penLeft = document.getElementById('penLeft');
          const penTop = document.getElementById('penTop');
          const penRight = document.getElementById('penRight');
          
          penLeft?.classList.add('animate');
          penTop?.classList.add('animate');
          penRight?.classList.add('animate');
        }
      },
      { threshold: 0.1 }
    );

    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-100" id="reviews">
      <section className="relative hero-bg overflow-hidden px-6 pt-20 text-center">
        {/* Decorative Pen Images */}
        <img 
          src="/landing/mounjaro.png" 
          alt="Pen Left" 
          className="pen pen-left" 
          id="penLeft"
        />
        <img 
          src="/landing/ozempic.png" 
          alt="Pen Top" 
          className="pen pen-top" 
          id="penTop"
        />
        <img 
          src="/landing/ozempic.png" 
          alt="Pen Right" 
          className="pen pen-right" 
          id="penRight"
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 pt-20">
            Real Customers. No shame.
          </h1>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
            All <i>Confidence.</i>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed my-8">
            There&apos;s no shame in using medical weight loss to support your health when traditional methods aren&apos;t
            cutting it. Paired with a balanced diet and regular exercise, a weight loss treatment plan can help you
            overcome biological barriers, maintain healthy habits, and reach your goals.
          </p>
          <h2 className="text-3xl sm:text-3xl font-light text-gray-800">
            Watch what our customers have to say about losing weight with WellInc:
          </h2>
          <img src="/landing/dwnarrow.png" alt="Down Arrow" className="mx-auto mt-10" style={{ width: '80px' }} />
        </div>

        {/* Video Testimonials Carousel */}
        <VideoCarousel />

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto pb-8 text-center">
          <h2 className="text-5xl sm:text-5xl font-light text-gray-800 mb-10">
            Ready to lose 15% of your body weight?
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/intake/height_weight"
              className="bg-black text-white px-12 py-3 rounded-full font-semibold shadow hover:bg-blue-500 transition"
            >
              Let&apos;s Go!
            </Link>
            <Link
              href="/intake/height_weight"
              className="bg-white border border-gray-300 text-gray-800 px-12 py-3 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition"
            >
              See pricing
            </Link>
          </div>
          <div className="alt pt-1 text-sm text-gray-900 pb-8 flex flex-col items-center mt-3 space-y-4">
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
    </div>
  );
}

