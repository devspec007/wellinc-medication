'use client';

import { useEffect, useRef } from 'react';
import 'swiper/css';

const testimonials = [
  {
    title: 'Life-Changing!',
    content: "I've never felt more confident and supported. The team truly cares about your progress and it shows.",
    author: 'Jessica R.',
  },
  {
    title: 'Highly Recommend',
    content: 'The process was seamless and the results were faster than I expected. 5 stars!',
    author: 'Daniel T.',
  },
  {
    title: "I haven't been a size 4 since High School",
    content: "I'm 42 and every year I was just getting heavier and heavier. Losing the amount of weight that I did is completely life changing.",
    author: 'Sarah',
  },
  {
    title: 'Absolutely incredible!',
    content: "I take it once a week and I cannot believe how fast I am losing weight. I just don't eat like I used to. I naturally just crave healthier stuff. I'm down to 220 from 245 and I've been on it for only 3 months.",
    author: 'B.H.',
  },
  {
    title: 'A miracle',
    content: "A miracle, has changed my life mentally and physically. Also, no desire to drink, a side benefit? I didn't do anything, this is all science. I pray it continues to work. Great delivery system.",
    author: 'Johnny J.',
  },
  {
    title: 'One week since my first injection, I lost 6 lbs',
    content: 'Today, in one week since my first injection, I lost 6 lbs. In one week, the last diet (one of very many), it took me 3 months to lose 10 lbs by starving myself.',
    author: 'Mary',
  },
  {
    title: 'The Missing Key',
    content: "I started at 240 and have consistently let go of a couple pounds a week. Starting the second round and couldn't be happier with it overall.",
    author: 'James',
  },
  {
    title: 'Nothing less than a miracle',
    content: "NO HEAD HUNGER! For the first time (probably in my life), I don't think about food. I don't crave junk food, I get full very quickly and can only eat small amounts.",
    author: 'Daniel T.',
  },
  {
    title: 'Down 15 lbs!',
    content: 'I used to work out 3-5 days per week but was not losing weight. I am down 15 lbs and have lost all cravings. I listen to my body and eat when I am hungry. I have zero side effects.',
    author: 'Jenny J.',
  },
  {
    title: 'I am so happy with it',
    content: 'I used to work out 3-5 days per week but was not losing weight. I am down 15 lbs and have lost all cravings. I listen to my body and eat when I am hungry. I have zero side effects.',
    author: 'Amy J.',
  },
  {
    title: "Don't be afraid to try it!",
    content: "I've lost 6 lbs in the first 2 weeks. I've had no side effects whatsoever so far. I'm on the 2.5 initial dose. I am 64 yo and I think it's an amazing drug.",
    author: 'Amy J.',
  },
];

export default function CustomerTestimonials() {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const initSwiper = async () => {
      const Swiper = (await import('swiper')).default;
      const { Autoplay } = await import('swiper/modules');

      if (swiperRef.current) {
        new Swiper('.testimonials-carousel', {
          modules: [Autoplay],
          slidesPerView: 1.2,
          spaceBetween: 16,
          breakpoints: {
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 5,
            },
          },
          loop: true,
          autoplay: {
            delay: 5000,
          },
        });
      }
    };

    initSwiper();
  }, []);

  return (
    <section className="pt-20 pb-6 px-0 md:px-6" style={{ background: '#f7f0eb' }}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-6xl font-normal tracking-tight text-gray-900">100k+ Happy Customers :)</h2>
        <p className="text-lg text-gray-600 mt-4">
          Real results, real people. Discover how we&apos;ve transformed lives.
        </p>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        <div className="swiper testimonials-carousel" ref={swiperRef}>
          <div className="swiper-wrapper">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="swiper-slide bg-gray-50 p-6 mb-2 rounded-xl shadow-md"
              >
                <div className="flex justify-center mb-3 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h3 className="text-xl font-light text-gray-800 mb-2">{testimonial.title}</h3>
                <p className="text-gray-600 text-sm">{testimonial.content}</p>
                <p className="mt-4 text-sm font-medium text-gray-500">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div
          className="absolute right-0 top-0 h-full w-6 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #f7f0eb, transparent)' }}
        />
        <div
          className="absolute left-0 top-0 h-full w-6 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #f7f0eb, transparent)' }}
        />
      </div>
    </section>
  );
}

