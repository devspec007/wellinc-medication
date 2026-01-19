'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-900">
          <Link href="/">
            <span style={{ fontSize: '1.7rem' }}>Well.inc</span>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#howitworks" className="hover:text-blue-500">How it works</a>
          <a href="#reviews" className="hover:text-blue-500">Reviews</a>
          <a href="#faqs" className="hover:text-blue-500">FAQ&apos;s</a>
          <Link href="/intake/height_weight" className="hover:text-blue-500">Pricing</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/intake/height_weight"
            className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-500 transition"
          >
            Start Your Journey
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Link
            href="/intake/height_weight"
            className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-500 transition"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </header>
  );
}

