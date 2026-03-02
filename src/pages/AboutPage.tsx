import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Target, Eye, Zap, Award, Heart, Lightbulb, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Helmet } from "react-helmet-async";

const values = [
  {
    icon: Lightbulb,
    title: "الإبداع",
    description: "بنفكر برا الصندوق وبنقدم حلول مبتكرة تميز براندك عن المنافسين",
  },
  {
    icon: Target,
    title: "الدقة",
    description: "كل تفصيلة مهمة - من الـ Pixel لـ Strategy كل حاجة محسوبة",
  },
  {
    icon: Heart,
    title: "الشغف",
    description: "بنحب اللي بنعمله وده بيظهر في كل مشروع بنسلمه",
  },
  {
    icon: TrendingUp,
    title: "النتائج",
    description: "مش بنشتغل عشان نعمل حاجات حلوة وبس - بنشتغل على ROI حقيقي",
  },
];

const stats = [
  { number: "150+", label: "مشروع ناجح" },
  { number: "50+", label: "عميل سعيد" },
  { number: "5+", label: "سنوات خبرة" },
  { number: "15+", label: "فريق متخصص" },
];

const AboutPage = () => {
  const prefersReducedMotion = useReducedMotion();
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
      return {
        initial: {},
        fadeIn: { opacity: 1 },
        slideRight: { opacity: 1, x: 0 },
        slideLeft: { opacity: 1, x: 0 },
        transition: { duration: 0 },
      };
    }
    return {
      initial: { opacity: 0, y: 30 },
      fadeIn: { opacity: 1, y: 0 },
      slideRight: { opacity: 1, x: 0 },
      slideLeft: { opacity: 1, x: 0 },
      transition: { duration: 0.8 },
    };
  }, [prefersReducedMotion]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "4Creative",
    "url": "https://4creative.agency",
    "description": "Creative Agency مصرية متخصصة في Digital Marketing، Website Development، Branding، وContent Creation",
    "foundingDate": "2020",
    "areaServed": "Egypt",
    "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 15 },
  };

  return (
    <Layout>
      <Helmet>
        <title>من نحن | 4Creative - Creative Agency في مصر</title>
        <meta name="description" content="تعرف على 4Creative - Creative Agency مصرية متخصصة في Digital Marketing، Website Development، Branding وContent Creation. 150+ مشروع ناجح و50+ عميل سعيد." />
        <link rel="canonical" href="https://4creative.agency/about" />
        <meta property="og:title" content="من نحن | 4Creative - Creative Agency في مصر" />
        <meta property="og:description" content="تعرف على 4Creative - شريكك في النجاح الرقمي. بنبني براندات تفضل في دماغ الناس!" />
        <meta property="og:url" content="https://4creative.agency/about" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isHeroInView ? anim.fadeIn : {}}
            transition={anim.transition}
          >
            <motion.span
              className="inline-block text-primary font-bold text-lg mb-4"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              تعرف علينا
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              إحنا <span className="gradient-text">4Creative</span>
              <br />
              شريكك في النجاح الرقمي
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Creative Agency مصرية بنفهم السوق وبنتكلم لغة الناس. 
              هدفنا نحول براندك من مجرد اسم لـ Brand يفضل في دماغ الناس ويحقق Sales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 50 }}
              animate={isStoryInView ? anim.slideRight : {}}
              transition={anim.transition}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                قصتنا
                <span className="block gradient-text mt-2">من البداية للنهاردة</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  بدأنا 4Creative من فكرة بسيطة: السوق المصري محتاج Agency تفهمه صح. 
                  شوفنا براندات كتير بتصرف على Marketing ومفيش نتيجة... المشكلة مش في الإعلانات، 
                  المشكلة في الـ Strategy!
                </p>
                <p>
                  من يومها وإحنا بنبني Digital Marketing Systems كاملة مش حملات مؤقتة. 
                  ده اللي بيخلي النتيجة تكبر مع الوقت مش تختفي لما الحملة تخلص.
                </p>
                <p>
                  النهاردة فريقنا فيه Designers، Developers، Marketers، وContent Creators 
                  تحت سقف واحد - كلهم بيشتغلوا على هدف واحد: نجاح براندك.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
              animate={isStoryInView ? anim.slideLeft : {}}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">رؤيتنا</h3>
                      <p className="text-muted-foreground">نبقى Reference في السوق المصري</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">مهمتنا</h3>
                      <p className="text-muted-foreground">نحول البراندات لـ Success Stories</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">أسلوبنا</h3>
                      <p className="text-muted-foreground">Performance First - نتائج قابلة للقياس</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 relative">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={anim.transition}
          >
            <span className="inline-block text-primary font-bold text-lg mb-4">قيمنا</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              اللي بيميزنا عن غيرنا
            </h2>
            <p className="text-lg text-muted-foreground">
              مش بس بنشتغل - إحنا بنؤمن بقيم بتوجه كل قرار بناخده
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center group"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="glass-card p-12 text-center relative overflow-hidden"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={anim.transition}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Award className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                جاهز تبدأ رحلة النجاح؟
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                خلينا نتكلم عن براندك وإزاي نقدر نساعدك توصل لأهدافك
              </p>
              <motion.a
                href="/start-project"
                className="btn-primary inline-flex"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                ابدأ مشروعك دلوقتي
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
