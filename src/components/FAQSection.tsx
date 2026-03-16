import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqContent } from "@/data/content";

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLanguage();
  const c = faqContent[lang];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": c.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  return (
    <section id="faq" className="py-32 relative overflow-hidden" ref={ref} aria-labelledby="faq-heading">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="inline-block text-primary font-bold text-lg mb-4">{c.tag}</span>
          <h2 id="faq-heading" className="section-title">{c.title1}<span className="block gradient-text">{c.title2}</span></h2>
          <p className="text-lg text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4" role="list">
          {c.faqs.map((faq, index) => (
            <motion.div key={index} className="glass-card rounded-xl overflow-hidden" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} role="listitem">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-6 flex items-center justify-between text-right hover:bg-primary/5 transition-colors" aria-expanded={openIndex === index}>
                <span className="text-lg font-bold pr-4">{faq.question}</span>
                <span className="flex-shrink-0">{openIndex === index ? <Minus className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-primary" />}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <p className="text-muted-foreground mb-4">{c.moreQuestion}</p>
          <motion.a href="#contact" className="btn-secondary inline-flex" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{c.contactCta}</motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
