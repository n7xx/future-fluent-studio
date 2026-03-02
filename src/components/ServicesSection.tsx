import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
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
    id: "web-development",
    icon: Globe,
    title: "Website Development",
    description: "4Creative بتبني لك Website يبيع مش مجرد شكل حلو. مواقع سريعة، متجاوبة، ومحسّنة للـ SEO",
    features: ["Responsive Design", "UX متميز", "SEO Ready"],
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Performance Marketing مش بوستات وخلاص! Paid Ads، SEO، وSocial Media Management بنتائج ملموسة",
    features: ["Meta & Google Ads", "SEO", "Analytics"],
  },
  {
    id: "content-creation",
    icon: PenTool,
    title: "Content Creation",
    description: "Content يتكلم بلغة جمهورك ويحقق Engagement حقيقي. تصوير، كتابة، وإدارة محتوى",
    features: ["Copywriting", "Photography", "Content Strategy"],
  },
  {
    id: "video-motion",
    icon: Video,
    title: "Video Production",
    description: "4Creative بتنتج فيديوهات تجذب الانتباه وتحقق Views. Reels، Motion Graphics، وAds",
    features: ["Video Editing", "Motion Graphics", "Ads Production"],
  },
  {
    id: "design-branding",
    icon: Palette,
    title: "Branding & Design",
    description: "Branding يخلي الناس تفتكرك بسهولة. هوية بصرية متكاملة تميزك عن المنافسين",
    features: ["Logo Design", "Brand Identity", "Packaging"],
  },
  {
    id: "digital-strategy",
    icon: Lightbulb,
    title: "Digital Strategy",
    description: "خطة Growth شاملة للتحول الرقمي. بنحلل السوق ونحط Strategy تحقق أهدافك",
    features: ["Market Analysis", "Growth Plan", "Consulting"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section id="services" className="py-32 relative overflow-hidden" ref={ref} aria-labelledby="services-heading">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
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
            خدمات 4Creative
          </span>
          <h2 id="services-heading" className="section-title">
            Full-Service
            <span className="block gradient-text">Digital Agency</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            كل اللي البراند بتاعك محتاجه تحت سقف واحد - Website، Marketing، Branding، وContent
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className="service-card group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(`/services/${service.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/services/${service.id}`)}
              aria-label={`خدمة ${service.title} - ${service.description}`}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="flex flex-wrap gap-2 mb-6" aria-label={`مميزات ${service.title}`}>
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-primary font-medium" aria-hidden="true">
                <ArrowUpLeft className="w-5 h-5" />
                <span>اكتشف المزيد</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => navigate("/services")}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            اكتشف كل خدمات 4Creative
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
