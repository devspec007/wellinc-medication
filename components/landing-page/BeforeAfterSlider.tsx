'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      let widthPercentage = (x / rect.width) * 100;
      widthPercentage = Math.max(0, Math.min(widthPercentage, 100));
      setSliderPosition(widthPercentage);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      let widthPercentage = (x / rect.width) * 100;
      widthPercentage = Math.max(0, Math.min(widthPercentage, 100));
      setSliderPosition(widthPercentage);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-lg relative select-none custom-image-slider" ref={containerRef}>
      <style jsx>{`
        .before-after-label {
          position: absolute;
          top: 1rem;
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          background-color: rgba(255, 255, 255, 0.8);
          color: #1a202c;
          border-radius: 9999px;
          z-index: 10;
          pointer-events: none;
          text-transform: uppercase;
        }
        .label-before {
          left: 1rem;
        }
        .label-after {
          right: 1rem;
        }
        .slider-handle {
          position: absolute;
          top: 0;
          width: 4px;
          height: 100%;
          background-color: #fff;
          cursor: ew-resize;
          z-index: 20;
        }
        .slider-handle::before,
        .slider-handle::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 0;
          height: 0;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          cursor: ew-resize;
          transition: all 0.2s ease-out;
        }
        .slider-handle::before {
          left: -24px;
          border-right: 16px solid #fff;
        }
        .slider-handle::after {
          right: -24px;
          border-left: 16px solid #fff;
        }
      `}</style>

      <span className="before-after-label label-before">Before</span>
      <span className="before-after-label label-after">After</span>

      {/* Before Image */}
      <Image 
        src="/landing/results2.jpg" 
        alt="Before" 
        fill
        className="slider-before object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />

      {/* After Image with Clip */}
      <div
        className="slider-after absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Image 
          src="/landing/results1.jpg" 
          alt="After" 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Slider Handle */}
      <div
        className="slider-handle"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      />
    </div>
  );
}

