import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "إيه الخدمات اللي بتقدمها 4Creative؟",
    answer: "4Creative بتقدم Full Digital Marketing Services تشمل Website Development، Social Media Management، Branding، Content Creation، Video Production، Paid Advertising على Meta وGoogle، وDigital Strategy. كل حاجة البراند بتاعك محتاجها تحت سقف واحد."
  },
  {
    question: "كام بتاخد وقت عشان تبني Website مع 4Creative؟",
    answer: "الـ Timeline بيختلف حسب حجم المشروع. Simple Website بياخد من 2-4 أسابيع، E-commerce Store من 4-8 أسابيع، وCustom Web Applications ممكن تاخد 8-12 أسبوع. بنحدد Timeline دقيق في أول ميتنج."
  },
  {
    question: "هل 4Creative بتشتغل مع Startups ولا الشركات الكبيرة بس؟",
    answer: "بنشتغل مع كل الـ Sizes! من Startups لـ SMEs للشركات الكبيرة. عندنا Packages مختلفة تناسب كل Budget. الأهم إننا نفهم الـ Goals بتاعتك ونحط Plan يحققها."
  },
  {
    question: "إيه الفرق بين 4Creative وباقي الـ Agencies؟",
    answer: "4Creative بتركز على Results مش مجرد Deliverables. بنشتغل Data-Driven ونقيس كل حاجة بـ KPIs واضحة. كمان فريقنا Full In-House يعني Quality Control أعلى وCommunication أسرع. وفاهمين السوق المصري كويس جداً."
  },
  {
    question: "بتقدموا Monthly Retainer للـ Social Media؟",
    answer: "أيوه! عندنا Monthly Social Media Packages تشمل Content Creation، Posting، Community Management، وReporting. الـ Packages بتبدأ من Basic لـ Premium حسب عدد الـ Posts والـ Platforms."
  },
  {
    question: "إزاي أبدأ مشروع مع 4Creative؟",
    answer: "الموضوع بسيط! تقدر تملأ الـ Form في صفحة 'ابدأ مشروعك' أو تكلمنا على WhatsApp أو تحجز Meeting مباشرة. هنعمل Discovery Call نفهم فيها الـ Requirements ونبعتلك Proposal خلال 48 ساعة."
  },
  {
    question: "هل بتقدموا SEO Services؟",
    answer: "طبعاً! الـ SEO جزء أساسي من خدماتنا. بنعمل Technical SEO، On-Page Optimization، Content Strategy، وLink Building. كمان كل الـ Websites اللي بنبنيها بتكون SEO-Ready من البداية."
  },
  {
    question: "إيه ضمانات الـ Results مع 4Creative؟",
    answer: "بنحط Clear KPIs من البداية ونتابعها Monthly. للـ Paid Ads بنضمن Minimum ROAS. للـ SEO بنستهدف Rankings محددة. وللـ Social Media بنستهدف Growth Rate معين. لو مش راضي بعد 3 شهور، بنعيد تقييم الـ Strategy مجاناً."
  }
];

// JSON-LD Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 relative overflow-hidden" ref={ref} aria-labelledby="faq-heading">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-4">
            FAQs
          </span>
          <h2 id="faq-heading" className="section-title">
            أسئلة شائعة
            <span className="block gradient-text">عن 4Creative</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            كل اللي محتاج تعرفه عن خدمات 4Creative وطريقة شغلنا
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4" role="list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              role="listitem"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-right hover:bg-primary/5 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-bold pr-4">{faq.question}</span>
                <span className="flex-shrink-0" aria-hidden="true">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-primary" />
                  ) : (
                    <Plus className="w-6 h-6 text-primary" />
                  )}
                </span>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={openIndex !== index}
              >
                {openIndex === index && (
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">
            عندك سؤال تاني؟
          </p>
          <motion.a
            href="#contact"
            className="btn-secondary inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            تواصل مع فريق 4Creative
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
