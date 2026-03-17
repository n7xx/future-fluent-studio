import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Target, Eye, Zap, Award, Heart, Lightbulb, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { aboutPageContent } from "@/data/content";

const valueIcons = [Lightbulb, Target, Heart, TrendingUp];

const AboutPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const { lang } = useLanguage();
  const c = aboutPageContent[lang];
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const anim = useMemo(() => {
    if (prefersReducedMotion) {
      return { initial: {}, fadeIn: { opacity: 1 }, slideRight: { opacity: 1, x: 0 }, slideLeft: { opacity: 1, x: 0 }, transition: { duration: 0 } };
    }
    return { initial: { opacity: 0, y: 30 }, fadeIn: { opacity: 1, y: 0 }, slideRight: { opacity: 1, x: 0 }, slideLeft: { opacity: 1, x: 0 }, transition: { duration: 0.8 } };
  }, [prefersReducedMotion]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "4Creative",
    "url": "https://4creative.agency",
    "description": lang === "ar" ? "Creative Agency مصرية متخصصة في Digital Marketing، Website Development، Branding، وContent Creation" : "Egyptian Creative Agency specializing in Digital Marketing, Website Development, Branding, and Content Creation",
    "foundingDate": "2020",
    "areaServed": "Egypt",
    "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 15 },
  };

  return (
    <Layout>
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href="https://4creative.agency/about" />
        <meta property="og:title" content={c.metaTitle} />
        <meta property="og:description" content={c.metaDesc} />
        <meta property="og:url" content="https://4creative.agency/about" />
        <meta property="og:image" content="https://4creative.agency/og-about.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="text-center max-w-4xl mx-auto" initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={isHeroInView ? anim.fadeIn : {}} transition={anim.transition}>
            <motion.span className="inline-block text-primary font-bold text-lg mb-4" initial={prefersReducedMotion ? {} : { opacity: 0 }} animate={isHeroInView ? { opacity: 1 } : {}} transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 }}>
              {c.heroTag}
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {c.heroTitle1} <span className="gradient-text">4Creative</span>
              <br />
              {c.heroTitle2}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{c.heroDesc}</p>
          </motion.div>
        </div>
      </section>

      <section ref={storyRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, x: 50 }} animate={isStoryInView ? anim.slideRight : {}} transition={anim.transition}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {c.storyTitle1}
                <span className="block gradient-text mt-2">{c.storyTitle2}</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>{c.storyP1}</p>
                <p>{c.storyP2}</p>
                <p>{c.storyP3}</p>
              </div>
            </motion.div>

            <motion.div className="relative" initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }} animate={isStoryInView ? anim.slideLeft : {}} transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}>
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-6">
                  {[{ icon: Eye, title: c.vision, desc: c.visionDesc }, { icon: Target, title: c.mission, desc: c.missionDesc }, { icon: Zap, title: c.approach, desc: c.approachDesc }].map((item) => (
                    <div key={item.title} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                        <item.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 relative">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {c.stats.map((stat, index) => (
              <motion.div key={index} className="text-center" initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={isStatsInView ? { opacity: 1, y: 0 } : {}} transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1, duration: 0.6 }}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={isValuesInView ? { opacity: 1, y: 0 } : {}} transition={anim.transition}>
            <span className="inline-block text-primary font-bold text-lg mb-4">{c.valuesTag}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.valuesTitle}</h2>
            <p className="text-lg text-muted-foreground">{c.valuesDesc}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <motion.div key={index} className="glass-card p-6 text-center group" initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={isValuesInView ? { opacity: 1, y: 0 } : {}} transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 + index * 0.1, duration: 0.6 }} whileHover={prefersReducedMotion ? {} : { y: -5 }}>
                  <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div className="glass-card p-12 text-center relative overflow-hidden" initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={anim.transition}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Award className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{c.ctaDesc}</p>
              <motion.a href="/start-project" className="btn-primary inline-flex" whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}>
                {c.ctaButton}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
