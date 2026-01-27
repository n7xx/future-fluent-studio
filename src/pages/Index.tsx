import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import ParallaxWrapper from "@/components/ParallaxWrapper";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Background3D />
      <Navbar />
      <HeroSection />
      <ParallaxWrapper offset={30}>
        <AboutSection />
      </ParallaxWrapper>
      <ServicesSection />
      <ParallaxWrapper offset={40}>
        <PortfolioSection />
      </ParallaxWrapper>
      <ProcessSection />
      <ParallaxWrapper offset={25}>
        <WhyUsSection />
      </ParallaxWrapper>
      <TestimonialsSection />
      <ParallaxWrapper offset={35}>
        <FAQSection />
      </ParallaxWrapper>
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
