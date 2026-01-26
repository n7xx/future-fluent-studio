import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Lightbulb, BarChart3, Clock, Handshake } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "فريق متخصص",
    description: "فريق من الخبراء المتخصصين في مختلف مجالات التسويق الرقمي والتصميم والتطوير",
  },
  {
    icon: Lightbulb,
    title: "أفكار غير تقليدية",
    description: "نؤمن بالتفكير خارج الصندوق ونقدم حلولاً إبداعية تميزك عن المنافسين",
  },
  {
    icon: BarChart3,
    title: "نتائج قابلة للقياس",
    description: "نركز على تحقيق نتائج ملموسة وقابلة للقياس تحقق أهداف عملك",
  },
  {
    icon: Clock,
    title: "التزام بالمواعيد",
    description: "نحترم وقتك ونلتزم بالجداول الزمنية المتفق عليها دون تأخير",
  },
  {
    icon: Handshake,
    title: "شراكة طويلة المدى",
    description: "نبني علاقات شراكة حقيقية مع عملائنا تمتد لسنوات من التعاون المثمر",
  },
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background Effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(262, 83%, 58%) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-4">
            لماذا نحن
          </span>
          <h2 className="section-title">
            ما الذي يميزنا
            <span className="block gradient-text">عن الآخرين</span>
          </h2>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className={`glass-card p-8 text-center ${
                index === 4 ? "lg:col-start-2" : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 5 }}
              >
                <reason.icon className="w-10 h-10 text-primary" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
