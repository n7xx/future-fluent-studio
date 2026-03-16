import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, TrendingUp, PenTool, Video, Palette, Lightbulb, ArrowUpLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { servicesContent } from "@/data/content";

const serviceIcons = [Globe, TrendingUp, PenTool, Video, Palette, Lightbulb];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const c = servicesContent[lang];

  return (
    <section id="services" className="py-32 relative overflow-hidden" ref={ref} aria-labelledby="services-heading">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-20" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="inline-block text-primary font-bold text-lg mb-4">{c.tag}</span>
          <h2 id="services-heading" className="section-title">{c.title1}<span className="block gradient-text">{c.title2}</span></h2>
          <p className="text-lg text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {c.services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.article key={service.id} className="service-card group cursor-pointer" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} onClick={() => navigate(`/services/${service.id}`)} role="link" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(`/services/${service.id}`)}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">{feature}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-primary font-medium" aria-hidden="true">
                  <ArrowUpLeft className="w-5 h-5" />
                  <span>{c.discoverMore}</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div className="text-center mt-16" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <motion.button onClick={() => navigate("/services")} className="btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{c.viewAll}</motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
