import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, ArrowUpLeft, Globe, TrendingUp, PenTool, Video, Palette, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { useLanguage } from "@/contexts/LanguageContext";
import { servicesPageContent } from "@/data/content";

const MemoizedBackground = memo(Background3D);
const serviceIcons = [Globe, TrendingUp, PenTool, Video, Palette, Lightbulb];
const serviceColors = ["from-blue-500 to-cyan-500", "from-green-500 to-emerald-500", "from-purple-500 to-pink-500", "from-orange-500 to-red-500", "from-violet-500 to-purple-500", "from-amber-500 to-yellow-500"];

const ServicesPage = () => {
  const navigate = useNavigate();
  const { lang, isRTL } = useLanguage();
  const c = servicesPageContent[lang];
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href="https://4creative.agency/services" />
      </Helmet>
      <MemoizedBackground />
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6">
          <motion.button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <BackArrow className="w-5 h-5" />
            <span>{c.backButton}</span>
          </motion.button>
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-primary font-bold text-lg mb-4">{c.heroTag}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="block">{c.heroTitle1}</span>
              <span className="block gradient-text">{c.heroTitle2}</span>
            </h1>
            <p className="text-xl text-muted-foreground">{c.heroDesc}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.services.map((service, index) => {
              const Icon = serviceIcons[index];
              const color = serviceColors[index];
              return (
                <motion.div key={service.id} className="group glass-card p-8 rounded-2xl cursor-pointer relative overflow-hidden" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -10 }} onClick={() => navigate(`/services/${service.id}`)}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">{feature}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <ArrowUpLeft className="w-5 h-5" />
                    <span>{c.discoverMore}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div className="glass-card p-12 rounded-2xl text-center relative overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
              <p className="text-xl text-muted-foreground mb-8">{c.ctaDesc}</p>
              <motion.button onClick={() => navigate("/start-project")} className="btn-primary text-lg px-8 py-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {c.ctaButton}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
