import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonialsContent } from "@/data/content";

const clients = ["TechStart", "Fashion House", "EduPlatform", "Cairo Eats", "ConsultPro", "ShopEasy"];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const c = testimonialsContent[lang];

  return (
    <section className="py-32 relative overflow-hidden" ref={ref} aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="inline-block text-primary font-bold text-lg mb-4">{c.tag}</span>
          <h2 id="testimonials-heading" className="section-title">{c.title1}<span className="block gradient-text">{c.title2}</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {c.testimonials.map((testimonial, index) => (
            <motion.article key={index} className="glass-card p-6 sm:p-8 relative" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }}>
              <Quote className="w-12 h-12 text-primary/20 absolute top-6 left-6" aria-hidden="true" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-lg text-foreground/90 mb-8 leading-relaxed">"{testimonial.content}"</blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground">{testimonial.name[0]}</div>
                <div>
                  <cite className="not-italic font-bold text-lg block">{testimonial.name}</cite>
                  <p className="text-sm text-muted-foreground">{testimonial.role} - {testimonial.company}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <p className="text-center text-muted-foreground mb-8">{c.clientsLabel}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {clients.map((client, index) => (
              <div key={index} className="glass px-8 py-4 rounded-xl">
                <span className="text-muted-foreground font-medium">{client}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
