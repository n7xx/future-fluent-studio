import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "رؤية 4Creative",
    description: "نبني Creative Agency تبقى Reference في السوق المصري للـ Digital Marketing والـ Branding",
  },
  {
    icon: Eye,
    title: "مهمتنا",
    description: "نحول البراندات من مجرد اسم لـ Brand يفضل في دماغ الناس ويحقق Sales",
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "مش بنعمل حاجات حلوة وبس - إحنا بنشتغل على Results قابلة للقياس",
  },
  {
    icon: Users,
    title: "فريق 4Creative",
    description: "Designers، Developers، Marketers، وContent Creators تحت سقف واحد",
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
              مين 4Creative؟
            </motion.span>
            
            <h2 className="section-title">
              Creative Agency
              <span className="block gradient-text">بتفهم السوق المصري</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              أغلب البراندات بتصرف على Marketing ومفيش نتيجة... المشكلة مش في الإعلانات، 
              المشكلة في الـ Strategy! إحنا في 4Creative بنبني لك Digital Marketing System 
              كامل مش حملات مؤقتة. ده اللي بيخلي النتيجة تكبر مع الوقت.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              من Website Development لـ Social Media Management لـ Video Production 
              لـ Branding - كل حاجة تحت سقف واحد. فريق 4Creative فاهم السوق المصري 
              وبيتكلم لغة الناس.
            </p>

            <motion.a
              href="#services"
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اكتشف خدمات 4Creative
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
