import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Zap, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { aboutContent } from "@/data/content";

const icons = [Target, Eye, Zap, Users];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const c = aboutContent[lang];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start md:items-center">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="order-1">
            <motion.span className="inline-block text-primary font-bold text-base sm:text-lg mb-3 sm:mb-4" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>{c.tag}</motion.span>
            <h2 className="section-title mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl">{c.title1}<span className="block gradient-text">{c.title2}</span></h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">{c.p1}</p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10">{c.p2}</p>
            <motion.a href="#services" className="btn-primary inline-flex text-sm sm:text-base" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{c.cta}</motion.a>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 order-2" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            {c.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <motion.div key={index} className="glass-card p-4 sm:p-6 flex flex-col h-full" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + index * 0.1 }} whileHover={{ y: -5 }}>
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
