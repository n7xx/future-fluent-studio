import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد سامي",
    role: "CEO",
    company: "TechStart Egypt",
    content: "4Creative غيروا كل حاجة! الـ Website الجديد ضاعف الـ Leads بتاعتنا 3 مرات. فريق Professional جداً وفاهمين الـ Digital Marketing صح.",
    rating: 5,
  },
  {
    name: "نورا حسن",
    role: "Marketing Director",
    company: "Fashion House",
    content: "اشتغلنا مع 4Creative على الـ Social Media والـ Paid Ads. النتيجة؟ 200% زيادة في المبيعات في 3 شهور! Highly Recommended.",
    rating: 5,
  },
  {
    name: "محمد عادل",
    role: "Founder",
    company: "EduPlatform",
    content: "أحسن Agency اتعاملت معاها. بيفهموا الـ Brand وبيشتغلوا بجد. الـ Branding اللي عملوهولنا خلى الناس تعرفنا من أول نظرة.",
    rating: 5,
  },
];

const clients = [
  "TechStart", "Fashion House", "EduPlatform", 
  "Cairo Eats", "ConsultPro", "ShopEasy"
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-4">
            Client Reviews
          </span>
          <h2 className="section-title">
            براندات اتحولت
            <span className="block gradient-text">مع 4Creative</span>
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-primary/20 absolute top-6 left-6" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-white">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} - {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-center text-muted-foreground mb-8">
            Brands اشتغلنا معاها في 4Creative
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="glass px-8 py-4 rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-muted-foreground font-medium">
                  {client}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
