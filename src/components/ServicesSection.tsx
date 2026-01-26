import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  TrendingUp, 
  PenTool, 
  Video, 
  Palette, 
  Lightbulb,
  ArrowUpLeft
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "تطوير المواقع",
    description: "مواقع إلكترونية احترافية ومتجاوبة تعكس هوية علامتك التجارية بأحدث التقنيات",
    features: ["تصميم متجاوب", "تجربة مستخدم متميزة", "سرعة عالية"],
  },
  {
    icon: TrendingUp,
    title: "التسويق الرقمي",
    description: "استراتيجيات تسويقية متكاملة لزيادة الوصول والمبيعات عبر القنوات الرقمية",
    features: ["إعلانات مدفوعة", "تحسين محركات البحث", "تحليل البيانات"],
  },
  {
    icon: PenTool,
    title: "صناعة المحتوى",
    description: "محتوى إبداعي ومؤثر يروي قصة علامتك التجارية ويجذب جمهورك المستهدف",
    features: ["كتابة إبداعية", "تصوير احترافي", "إدارة المحتوى"],
  },
  {
    icon: Video,
    title: "المونتاج والموشن",
    description: "فيديوهات احترافية ورسوم متحركة تجذب الانتباه وتوصل رسالتك بفعالية",
    features: ["مونتاج احترافي", "موشن جرافيك", "مؤثرات بصرية"],
  },
  {
    icon: Palette,
    title: "التصميم والهوية",
    description: "هوية بصرية متكاملة وتصميمات مبتكرة تميز علامتك التجارية",
    features: ["تصميم الهوية", "تصميم الجرافيك", "التغليف"],
  },
  {
    icon: Lightbulb,
    title: "الاستراتيجية الرقمية",
    description: "خطط استراتيجية شاملة للتحول الرقمي وتحقيق أهداف عملك",
    features: ["تحليل السوق", "خطة النمو", "استشارات رقمية"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
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
            خدماتنا
          </span>
          <h2 className="section-title">
            حلول رقمية
            <span className="block gradient-text">متكاملة ومبتكرة</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            نقدم مجموعة شاملة من الخدمات الرقمية لتلبية جميع احتياجات عملك
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpLeft className="w-5 h-5" />
                <span>اكتشف المزيد</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
