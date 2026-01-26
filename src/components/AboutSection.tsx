import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "رؤيتنا",
    description: "أن نكون الوكالة الرقمية الرائدة في تحويل الأفكار إلى تجارب رقمية استثنائية",
  },
  {
    icon: Eye,
    title: "مهمتنا",
    description: "نساعد الشركات على النمو من خلال حلول رقمية مبتكرة ومتكاملة",
  },
  {
    icon: Zap,
    title: "قيمنا",
    description: "الإبداع، الجودة، الالتزام، والشراكة الحقيقية مع عملائنا",
  },
  {
    icon: Users,
    title: "فريقنا",
    description: "خبراء متخصصون في التصميم، التطوير، والتسويق الرقمي",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background effect */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block text-primary font-bold text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              من نحن
            </motion.span>
            
            <h2 className="section-title">
              نصنع المستقبل
              <span className="block gradient-text">بأفكار إبداعية</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              نحن وكالة رقمية متكاملة نجمع بين الإبداع والتكنولوجيا لتقديم حلول
              رقمية استثنائية. نؤمن بأن كل مشروع فريد ويستحق اهتماماً خاصاً،
              ولذلك نعمل بشكل وثيق مع عملائنا لفهم احتياجاتهم وتحويل رؤيتهم إلى واقع.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              فريقنا يضم مصممين ومطورين ومسوقين محترفين يعملون بتناغم لتحقيق
              نتائج تفوق التوقعات. نستخدم أحدث التقنيات والأدوات لضمان جودة
              عالية وأداء متميز.
            </p>

            <motion.a
              href="#services"
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اكتشف خدماتنا
            </motion.a>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
