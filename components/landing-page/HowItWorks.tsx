'use client';

export default function HowItWorks() {
  return (
    <section className="hero-bg2 px-4 pb-10" id="howitworks">
      <div className="rounded-[58px] overflow-hidden w-full bg-white px-7 py-10 md:py-16" style={{ borderRadius: '50px' }}>
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Steps */}
          <div className="space-y-8">
            <h2 className="text-6xl font-thin text-gray-900">Why we&apos;re better at weight loss</h2>
            <p className="text-lg text-gray-700">
              Direct healthcare, without the long wait times or doctor denials.
            </p>

            <div className="space-y-1 text-left">
              <div>
                <p className="text-sm font-medium" style={{ color: '#d9b596' }}>Today</p>
                <details className="cursor-pointer">
                  <summary className="text-xl font-semibold text-gray-900 py-2 border-b">
                    See if you qualify in 5 minutes!
                  </summary>
                </details>
              </div>

              <div>
                <p className="text-sm font-medium" style={{ color: '#b89e73' }}>In 1 day</p>
                <details className="cursor-pointer">
                  <summary className="text-xl font-semibold text-gray-900 py-2 border-b">
                    Provider writes an Rx
                  </summary>
                </details>
              </div>

              <div>
                <p className="text-sm font-medium" style={{ color: '#c9a9c9' }}>Within 1 day</p>
                <details className="cursor-pointer">
                  <summary className="text-xl font-semibold text-gray-900 py-2 border-b">
                    Your order ships from our licensed US pharmacies
                  </summary>
                </details>
              </div>

              <div>
                <p className="text-sm font-medium" style={{ color: '#e7a1d9' }}>Free & Discreet 2-Day Delivery</p>
                <details className="cursor-pointer">
                  <summary className="text-xl font-semibold text-gray-900 py-2 border-b">
                    Get your medication
                  </summary>
                </details>
              </div>

              <div>
                <p className="text-sm font-medium" style={{ color: '#c87ad4' }}>On-going care & support</p>
                <details className="cursor-pointer">
                  <summary className="text-xl font-semibold text-gray-900 py-2 border-b">
                    Begin treatment
                  </summary>
                </details>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Image */}
          <div className="flex justify-center">
            <img 
              src="/landing/phone_new.png" 
              alt="Phone with app screen" 
              className="w-full rounded-xl shadow-lg max-w-[320px] p-11 bg-[linear-gradient(216deg,#eff5fa_0%,#bed2e8_100%)]"
            />
          </div>
        </section>
      </div>
    </section>
  );
}

