import { memo, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

// Lazy load below-the-fold sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const WhyUsSection = lazy(() => import("@/components/WhyUsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionFallback = () => <div className="py-32" />;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "4Creative",
  "url": "https://4creative.agency",
  "logo": "https://4creative.agency/og-image.png",
  "description": "4Creative هي Creative Agency متخصصة في Digital Marketing، Website Development، Branding، وContent Creation في مصر",
  "foundingDate": "2020",
  "areaServed": {
    "@type": "Country",
    "name": "Egypt"
  },
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "English"]
  }
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "4Creative Digital Marketing Agency",
  "image": "https://4creative.agency/og-image.png",
  "url": "https://4creative.agency",
  "description": "Full-Service Digital Marketing Agency في مصر - Website Development، Branding، Content Creation",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "EG"
  },
  "priceRange": "$$"
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>4Creative | Digital Marketing Agency في مصر - Website Development, Branding, Social Media</title>
        <meta name="description" content="4Creative هي Creative Agency متخصصة في Digital Marketing، Website Development، Branding، وContent Creation في مصر. بنبني براندات تفضل في دماغ الناس!" />
        <link rel="canonical" href="https://4creative.agency/" />
        <meta property="og:title" content="4Creative | أفضل Digital Marketing Agency في مصر" />
        <meta property="og:description" content="4Creative بتبني براندات تفضل في دماغ الناس. Website Development، Digital Marketing، Branding، وContent Creation - كل حاجة تحت سقف واحد!" />
        <meta property="og:url" content="https://4creative.agency/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://4creative.agency/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      </Helmet>
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyUsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default memo(Index);
