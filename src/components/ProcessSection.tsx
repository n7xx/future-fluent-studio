import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Map, Rocket, CheckCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Research",
    description: "بنبدأ نفهم البراند بتاعك، الـ Target Audience، والـ Competition. كل حاجة بالـ Data",
  },
  {
    icon: Map,
    number: "02",
    title: "Strategy & Planning",
    description: "بنحط خطة شغل واضحة مع Milestones وDeadlines محددة. عشان تعرف إيه اللي هيحصل",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Creative Execution",
    description: "فريق 4Creative بيشتغل على التنفيذ - Design، Development، Content - بأعلى Quality",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Launch & Delivery",
    description: "بنعمل Testing شامل وبعدين Launch. بنتأكد إن كل حاجة شغالة زي الفل",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Optimization & Growth",
    description: "الشغل مبيخلصش عند الـ Launch. بنتابع الـ Performance ونعمل Optimization مستمر",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-4">
            طريقة شغل 4Creative
          </span>
          <h2 className="section-title">
            Our Process
            <span className="block gradient-text">من الفكرة للنتيجة</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            5 خطوات واضحة بنمشي فيها مع كل Client عشان نضمن أفضل Results
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <motion.div
            className="absolute right-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: "linear-gradient(180deg, hsl(262, 83%, 58%) 0%, hsl(187, 94%, 48%) 100%)",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5 }}
          />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <motion.div
                    className="glass-card p-8 relative group"
                    whileHover={{ y: -5 }}
                  >
                    {/* Step Number */}
                    <span className="absolute -top-4 text-6xl font-black text-primary/10">
                      {step.number}
                    </span>
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-primary z-10"
                  style={{
                    boxShadow: "0 0 30px hsla(262, 83%, 58%, 0.5)",
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                >
                  <span className="text-primary font-bold">{index + 1}</span>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
