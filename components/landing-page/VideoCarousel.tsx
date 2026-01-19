'use client';

import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Vimeo video IDs from the original site
const videos = [
  { id: '1123949957', title: 'Customer 1' },
  { id: '1123958880', title: 'Customer 6' },
  { id: '1123965031', title: 'Customer 7' },
  { id: '1123964421', title: 'Customer 8' },
  { id: '1123986623', title: 'Customer 11' },
  { id: '1123988338', title: 'Customer 12' },
  { id: '1123982301', title: 'Customer 9' },
  { id: '1123948862', title: 'Customer 2' },
  { id: '1123944535', title: 'Customer 4' },
  { id: '1123946072', title: 'Customer 5' },
  { id: '1123947633', title: 'Customer 3' },
  { id: '1123984693', title: 'Customer 10' },
];

export default function VideoCarousel() {
  const swiperRef = useRef<any>(null);
  const playersRef = useRef<any[]>([]);

  useEffect(() => {
    // Dynamically import Swiper and Vimeo Player to avoid SSR issues
    const initCarousel = async () => {
      const Swiper = (await import('swiper')).default;
      const { Navigation, Pagination, Keyboard, A11y } = await import('swiper/modules');
      const VimeoPlayer = (await import('@vimeo/player')).default;

      if (!swiperRef.current) return;

      // Helper function to build Vimeo player
      const buildPlayerFor = (el: HTMLElement, vimeoId: string) => {
        if ((el as any).dataset.playerBuilt) return;

        // Add spinner
        let spinner = el.querySelector('.vimeo-spinner');
        if (!spinner) {
          spinner = document.createElement('div');
          spinner.className = 'vimeo-spinner';
          const dot = document.createElement('div');
          dot.className = 'spinner-dot';
          spinner.appendChild(dot);
          el.appendChild(spinner);
        }

        const options = {
          id: vimeoId,
          responsive: true,
          autopause: true,
          autoplay: false,
          byline: false,
          portrait: false,
          title: false,
          controls: true,
          muted: false,
        };

        try {
          const player = new VimeoPlayer(el, options);
          (el as any)._playerRef = player;

          // Hide spinner once loaded
          player.on('loaded', () => {
            if (spinner) (spinner as HTMLElement).style.display = 'none';
          });

          // Pause other videos when one plays
          player.on('play', () => {
            playersRef.current.forEach((p) => {
              if (p !== player) {
                p.pause().catch(() => {});
              }
            });
          });

          playersRef.current.push(player);
          (el as any).dataset.playerBuilt = '1';
        } catch (error) {
          console.error('Error loading Vimeo player:', error);
        }
      };

      // Helper to build visible players
      const buildVisibleNow = (swiper: any) => {
        const containerRect = swiper.el.getBoundingClientRect();
        swiper.slides.forEach((slide: HTMLElement) => {
          const rect = slide.getBoundingClientRect();
          const horizontallyVisible = rect.right > containerRect.left && rect.left < containerRect.right;
          const verticallyVisible = rect.bottom > containerRect.top && rect.top < containerRect.bottom;
          
          if (horizontallyVisible && verticallyVisible) {
            const frame = slide.querySelector('.vimeo-frame');
            if (frame && frame.getAttribute('data-vimeo-id')) {
              const vimeoId = frame.getAttribute('data-vimeo-id')!;
              buildPlayerFor(frame as HTMLElement, vimeoId);
            }
          }
        });
      };

      // Initialize Swiper
      const swiperInstance = new Swiper('.vimeo-carousel', {
        modules: [Navigation, Pagination, Keyboard, A11y],
        slidesPerView: 1.1,
        spaceBetween: 16,
        centeredSlides: true,
        loop: false,
        watchOverflow: true,
        initialSlide: 0,
        centeredSlidesBounds: true,
        keyboard: { enabled: true },
        a11y: { enabled: true },
        pagination: {
          el: '.vimeo-carousel .swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: '.vimeo-carousel .swiper-button-next',
          prevEl: '.vimeo-carousel .swiper-button-prev',
        },
        breakpoints: {
          640: { slidesPerView: 1.2, spaceBetween: 18, centeredSlides: true },
          768: { slidesPerView: 2.2, spaceBetween: 20, centeredSlides: true },
          1024: { slidesPerView: 3, spaceBetween: 24, centeredSlides: false },
          1280: { slidesPerView: 4, spaceBetween: 24, centeredSlides: false },
          1536: { slidesPerView: 4, spaceBetween: 28, centeredSlides: false },
        },
        on: {
          init(swiper) {
            buildVisibleNow(swiper);
          },
          slideChange(swiper) {
            // Pause all players
            playersRef.current.forEach((p) => p.pause().catch(() => {}));
            buildVisibleNow(swiper);
          },
          transitionEnd(swiper) {
            buildVisibleNow(swiper);
          },
          resize(swiper) {
            buildVisibleNow(swiper);
          },
        },
      });
    };

    initCarousel();
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Vertical video slider (9:16) */
        .video-testimonials-section {
          overflow: hidden;
        }
        
        #video-testimonials {
          width: 100%;
        }
        
        #video-testimonials .max-w-7xl {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        .vimeo-carousel {
          width: 100%;
          margin: 0 auto;
          position: relative;
        }
        
        .vimeo-carousel .swiper-wrapper {
          align-items: center;
          display: flex;
        }

        .vimeo-carousel .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto;
        }

        .vimeo-card {
          width: 100%;
          max-width: 400px;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          display: flex;
          flex-direction: column;
        }

        .vimeo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vimeo-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .vimeo-meta {
          padding: 10px 12px;
          background: #fff;
          color: #111;
          font-size: 14px;
        }

        .vimeo-meta .name {
          font-weight: 600;
        }

        /* Swiper controls */
        .vimeo-carousel .swiper-pagination {
          position: relative;
          margin-top: 10px;
          bottom: auto !important;
        }

        .vimeo-carousel .swiper-button-prev,
        .vimeo-carousel .swiper-button-next {
          color: #fff;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        
        .vimeo-carousel .swiper-button-prev {
          left: 0;
        }
        
        .vimeo-carousel .swiper-button-next {
          right: 0;
        }
        
        @media (max-width: 768px) {
          .vimeo-carousel .swiper-button-prev,
          .vimeo-carousel .swiper-button-next {
            display: none;
          }
        }

        @media (min-width: 768px) {
          .vimeo-card {
            max-width: 380px;
          }
          
          #video-testimonials .max-w-7xl {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
        
        @media (min-width: 1024px) {
          .vimeo-card {
            max-width: 360px;
          }
          
          #video-testimonials .max-w-7xl {
            padding-left: 3rem;
            padding-right: 3rem;
          }
        }

        /* Loading spinner for Vimeo frames */
        .vimeo-frame .vimeo-spinner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .vimeo-frame .vimeo-spinner .spinner-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.35);
          border-top-color: #ffffff;
          animation: vimeo-spin 0.9s linear infinite;
        }

        @keyframes vimeo-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <section id="video-testimonials" className="video-testimonials-section py-10">
        <div className="max-w-7xl mx-auto">
          <div className="swiper vimeo-carousel" ref={swiperRef}>
            <div className="swiper-wrapper">
              {videos.map((video, index) => (
                <div key={index} className="swiper-slide">
                  <div className="vimeo-card">
                    <div className="vimeo-frame" data-vimeo-id={video.id} data-title={video.title}>
                      {/* Vimeo player will be inserted here */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br />
            {/* Controls */}
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </section>
    </>
  );
}


