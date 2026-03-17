import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Eye, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { useLanguage } from "@/contexts/LanguageContext";
import { portfolioPageContent } from "@/data/content";

const MemoizedBackground = memo(Background3D);

const projects = [
  { id: 1, title: "E-commerce Platform - Fashion Brand", category: "Website Development", description: { ar: "4Creative بنت متجر إلكتروني متكامل مع UX سلس وتصميم عصري يعكس هوية الـ Brand", en: "4Creative built a full e-commerce store with smooth UX and modern design reflecting the Brand identity" }, fullDescription: { ar: "صممنا وطورنا E-commerce Platform متكامل لـ Fashion Brand. الموقع بيتميز بـ Smooth UX، نظام Payment آمن، وDesign يعكس فخامة الـ Brand.", en: "We designed and developed a complete E-commerce Platform for a Fashion Brand. The site features Smooth UX, secure Payment system, and Design reflecting the Brand's luxury." }, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", color: "from-purple-500/20 to-pink-500/20", tools: ["React", "Node.js", "Stripe", "Figma"], results: { ar: ["150% زيادة في Sales", "40% تحسين Conversion Rate", "60% تقليل Bounce Rate"], en: ["150% increase in Sales", "40% improved Conversion Rate", "60% reduced Bounce Rate"] } },
  { id: 2, title: "Product Launch Campaign", category: "Marketing Campaigns", description: { ar: "حملة Digital Marketing متكاملة لإطلاق منتج جديد حققت Results استثنائية", en: "Integrated Digital Marketing campaign for a new product launch achieving exceptional Results" }, fullDescription: { ar: "4Creative خططت ونفذت Launch Campaign متكاملة شملت Social Media، Paid Ads، وContent Marketing.", en: "4Creative planned and executed a complete Launch Campaign including Social Media, Paid Ads, and Content Marketing." }, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", color: "from-blue-500/20 to-cyan-500/20", tools: ["Meta Ads", "Google Ads", "Analytics", "Hootsuite"], results: { ar: ["2 Million Reach", "100K+ Engagement", "300% ROI"], en: ["2 Million Reach", "100K+ Engagement", "300% ROI"] } },
  { id: 3, title: "Explainer Motion Graphics", category: "Video Production", description: { ar: "4Creative أنتجت فيديو Motion Graphics يشرح خدمات الشركة بطريقة Creative", en: "4Creative produced a Motion Graphics video explaining company services in a Creative way" }, fullDescription: { ar: "أنتجنا Motion Graphics Video احترافي يشرح خدمات الشركة بطريقة جذابة وSimplified.", en: "We produced a professional Motion Graphics Video explaining company services in an engaging and Simplified way." }, image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop", color: "from-orange-500/20 to-red-500/20", tools: ["After Effects", "Premiere Pro", "Illustrator"], results: { ar: ["1M+ Views", "85% Watch Rate", "200% Increase in Inquiries"], en: ["1M+ Views", "85% Watch Rate", "200% Increase in Inquiries"] } },
  { id: 4, title: "Restaurant Brand Identity", category: "Branding", description: { ar: "4Creative صممت Visual Identity متكاملة لمطعم راقي تعكس الـ Premium Feel", en: "4Creative designed a complete Visual Identity for an upscale restaurant reflecting the Premium Feel" }, fullDescription: { ar: "صممنا Brand Identity متكاملة تشمل Logo، Colors، Typography، والتطبيقات المختلفة.", en: "We designed a complete Brand Identity including Logo, Colors, Typography, and various applications." }, image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop", color: "from-green-500/20 to-emerald-500/20", tools: ["Illustrator", "Photoshop", "Figma"], results: { ar: ["Full Brand Identity", "Increased Brand Recognition", "Scalable Design System"], en: ["Full Brand Identity", "Increased Brand Recognition", "Scalable Design System"] } },
  { id: 5, title: "Educational Platform", category: "Website Development", description: { ar: "منصة تعليمية تفاعلية مع CMS متكامل بنتها 4Creative", en: "Interactive educational platform with integrated CMS built by 4Creative" }, fullDescription: { ar: "طورنا E-learning Platform متكاملة تشمل Course System، Quizzes، وDigital Certificates.", en: "We developed a complete E-learning Platform including Course System, Quizzes, and Digital Certificates." }, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop", color: "from-violet-500/20 to-purple-500/20", tools: ["React", "Node.js", "MongoDB", "AWS"], results: { ar: ["10K Active Users", "500+ Courses", "75% Completion Rate"], en: ["10K Active Users", "500+ Courses", "75% Completion Rate"] } },
  { id: 6, title: "Ramadan Marketing Campaign", category: "Marketing Campaigns", description: { ar: "4Creative نفذت Seasonal Campaign ناجحة حققت أعلى Sales في رمضان", en: "4Creative executed a successful Seasonal Campaign achieving highest Ramadan Sales" }, fullDescription: { ar: "خططنا Ramadan Campaign متكاملة استهدفت المشاعر والقيم الرمضانية.", en: "We planned a complete Ramadan Campaign targeting Ramadan emotions and values." }, image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop", color: "from-amber-500/20 to-yellow-500/20", tools: ["Meta Ads", "TikTok", "Influencer Marketing"], results: { ar: ["5M Reach", "8% Engagement Rate", "Highest Seasonal Sales"], en: ["5M Reach", "8% Engagement Rate", "Highest Seasonal Sales"] } },
];

const PortfolioPage = () => {
  const navigate = useNavigate();
  const { lang, isRTL } = useLanguage();
  const c = portfolioPageContent[lang];
  const [activeCategory, setActiveCategory] = useState(c.categories[0]);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const filteredProjects = activeCategory === c.categories[0] ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href="https://4creative.agency/portfolio" />
      </Helmet>
      <MemoizedBackground />
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6">
          <motion.button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <BackArrow className="w-5 h-5" />
            <span>{c.backButton}</span>
          </motion.button>
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-primary font-bold text-lg mb-4">{c.heroTag}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="block">{c.heroTitle1}</span>
              <span className="block gradient-text">{c.heroTitle2}</span>
            </h1>
            <p className="text-xl text-muted-foreground">{c.heroDesc}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <motion.div className="flex flex-wrap justify-center gap-3 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {c.categories.map((category) => (
              <motion.button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category ? "bg-primary text-primary-foreground shadow-lg" : "glass hover:bg-primary/20"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {category}
              </motion.button>
            ))}
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} layout whileHover={{ y: -10 }} onClick={() => setSelectedProject(project)}>
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center" whileHover={{ scale: 1.1 }}>
                      <Eye className="w-5 h-5 text-primary-foreground" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-medium">{project.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description[lang]}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedProject && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
          <motion.div className="relative glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center z-10">
              <X className="w-5 h-5" />
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover" />
            <div className="p-8">
              <span className="text-sm text-primary font-medium">{selectedProject.category}</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">{selectedProject.title}</h2>
              <p className="text-muted-foreground mb-6">{selectedProject.fullDescription[lang]}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">{c.toolsTitle}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">{tool}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3">{c.resultsTitle}</h3>
                  <ul className="space-y-2">
                    {selectedProject.results[lang].map((result) => (
                      <li key={result} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div className="glass-card p-12 rounded-2xl text-center relative overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
              <p className="text-xl text-muted-foreground mb-8">{c.ctaDesc}</p>
              <motion.button onClick={() => navigate("/start-project")} className="btn-primary text-lg px-8 py-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {c.ctaButton}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
