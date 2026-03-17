import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { heroContent } from "@/data/content";

const HeroSection = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const c = heroContent[lang];

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-navbar-fix pt-20 md:pt-0">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(262, 83%, 58%) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(187, 94%, 48%) 0%, transparent 70%)" }} />
      </div>

      <main id="main-content" className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground/80">{c.badge}</span>
          </motion.div>

          <motion.h1 id="hero-heading" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 md:mb-8">
            <span className="block text-foreground">{c.headline1}</span>
            <span className="block gradient-text">{c.headline2}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="hero-subtitle text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-2">
            {c.subheadline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4" role="group" aria-label={c.ctaLinks}>
            <motion.button onClick={() => navigate("/start-project")} className="btn-primary flex items-center gap-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Rocket className="w-5 h-5" aria-hidden="true" />
              {c.ctaPrimary}
            </motion.button>
            <motion.button onClick={() => navigate("/portfolio")} className="btn-secondary flex items-center gap-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {c.ctaSecondary}
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 md:mt-20 max-w-2xl mx-auto" role="list" aria-label={c.statsAria}>
            {c.stats.map((stat, index) => (
              <div key={index} className="text-center" role="listitem">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <a href="#about" className="scroll-indicator"><ArrowDown className="w-4 h-4 text-primary" /></a>
      </div>
    </section>
  );
};

export default HeroSection;
