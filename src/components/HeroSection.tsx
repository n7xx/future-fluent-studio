import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Background Effects - CSS only, no JS animation */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(262, 83%, 58%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(187, 94%, 48%) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <main id="main-content" className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground/80">
              4Creative | Digital Marketing Agency في مصر
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8"
          >
            <span className="block text-foreground">البراند بتاعك</span>
            <span className="block gradient-text">يستاهل يكبر</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            إحنا في 4Creative بنبني لك Marketing System كامل - من Website Development 
            لـ Social Media Management لـ Branding. مش بوستات وخلاص، إحنا بنشتغل Results!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            role="group"
            aria-label="روابط سريعة"
          >
            <motion.button
              onClick={() => navigate("/start-project")}
              className="btn-primary flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="ابدأ مشروعك مع 4Creative - صفحة بدء مشروع جديد"
            >
              <Rocket className="w-5 h-5" aria-hidden="true" />
              ابدأ مشروعك مع 4Creative
            </motion.button>
            <motion.button
              onClick={() => navigate("/portfolio")}
              className="btn-secondary flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="شوف أعمالنا - صفحة معرض الأعمال"
            >
              شوف أعمالنا
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            role="list"
            aria-label="إحصائيات 4Creative"
          >
            {[
              { number: "+150", label: "مشروع ناجح مع 4Creative" },
              { number: "+50", label: "براند اتحول معانا" },
              { number: "+5", label: "سنين في السوق المصري" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
                role="listitem"
              >
                <div className="text-3xl md:text-4xl font-black gradient-text mb-2" aria-label={stat.number}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <a 
          href="#about" 
          className="scroll-indicator"
          aria-label="انتقل إلى قسم من نحن"
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
