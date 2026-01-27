import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, ArrowUpLeft } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, hsla(262, 83%, 58%, 0.15) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto glass-card p-12 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            boxShadow: "0 0 100px hsla(262, 83%, 58%, 0.2), inset 0 0 100px hsla(262, 83%, 58%, 0.05)",
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              جاهز تكبر البراند
              <span className="block gradient-text mt-2">مع 4Creative؟</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              سواء محتاج Website، Digital Marketing، أو Branding كامل - فريق 4Creative 
              جاهز يحول رؤيتك لواقع. احجز مكالمة مع فريقنا النهاردة!
            </p>

            <motion.a
              href="#contact"
              className="btn-primary inline-flex items-center gap-3 text-xl md:text-xl text-base px-8 md:px-10 py-4 md:py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm md:text-xl whitespace-nowrap">ابدأ مشروعك مع 4Creative</span>
              <ArrowUpLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
