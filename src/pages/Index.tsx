import { lazy, Suspense, memo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

// Lazy load below-fold sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const WhyUsSection = lazy(() => import("@/components/WhyUsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const MemoizedBackground = memo(Background3D);

// Simple loading placeholder
const SectionLoader = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <MemoizedBackground />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <WhyUsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
