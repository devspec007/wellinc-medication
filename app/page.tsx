import MarqueeBar from '@/components/landing-page/MarqueeBar';
import Header from '@/components/landing-page/Header';
import HeroSection from '@/components/landing-page/HeroSection';
import BeforeAfterSection from '@/components/landing-page/BeforeAfterSection';
import VideoTestimonials from '@/components/landing-page/VideoTestimonials';
import HowItWorks from '@/components/landing-page/HowItWorks';
import CustomerTestimonials from '@/components/landing-page/CustomerTestimonials';
import ProductsSection from '@/components/landing-page/ProductsSection';
import FAQ from '@/components/landing-page/FAQ';
import Footer from '@/components/landing-page/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MarqueeBar />
      <Header />
      <HeroSection />
      <BeforeAfterSection />
      {/* <VideoTestimonials /> */}
      <HowItWorks />
      <CustomerTestimonials />
      <ProductsSection />
      <FAQ />
      <Footer />
    </div>
  );
}

