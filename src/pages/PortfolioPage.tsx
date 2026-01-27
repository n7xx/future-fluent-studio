import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ExternalLink, Eye, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

const categories = ["الكل", "مواقع إلكترونية", "حملات تسويقية", "فيديوهات", "تصميمات"];

const projects = [
  {
    id: 1,
    title: "متجر أزياء راقية",
    category: "مواقع إلكترونية",
    description: "متجر إلكتروني متكامل مع تجربة تسوق سلسة وتصميم عصري يعكس هوية البراند",
    fullDescription: "صممنا وطورنا متجر إلكتروني متكامل لبراند أزياء راقية. المتجر يتميز بتجربة مستخدم سلسة، نظام دفع آمن، وتصميم يعكس فخامة البراند.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "from-purple-500/20 to-pink-500/20",
    tools: ["React", "Node.js", "Stripe", "Figma"],
    results: ["زيادة المبيعات 150%", "تحسين معدل التحويل 40%", "تقليل معدل الارتداد 60%"]
  },
  {
    id: 2,
    title: "حملة إطلاق منتج",
    category: "حملات تسويقية",
    description: "حملة رقمية متكاملة لإطلاق منتج جديد حققت نتائج استثنائية",
    fullDescription: "خططنا ونفذنا حملة إطلاق متكاملة شملت السوشيال ميديا، الإعلانات المدفوعة، والتسويق بالمحتوى.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-blue-500/20 to-cyan-500/20",
    tools: ["Meta Ads", "Google Ads", "Analytics", "Hootsuite"],
    results: ["وصول لـ 2 مليون شخص", "100,000 تفاعل", "ROI 300%"]
  },
  {
    id: 3,
    title: "فيديو موشن جرافيك",
    category: "فيديوهات",
    description: "فيديو ترويجي بتقنية الموشن جرافيك يشرح خدمات الشركة",
    fullDescription: "أنتجنا فيديو موشن جرافيك احترافي يشرح خدمات الشركة بطريقة جذابة ومبسطة.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
    color: "from-orange-500/20 to-red-500/20",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    results: ["مليون مشاهدة", "معدل مشاهدة 85%", "زيادة الاستفسارات 200%"]
  },
  {
    id: 4,
    title: "هوية مطعم فاخر",
    category: "تصميمات",
    description: "تصميم هوية بصرية متكاملة لمطعم راقي تعكس الفخامة",
    fullDescription: "صممنا هوية بصرية متكاملة تشمل الشعار، الألوان، الخطوط، والتطبيقات المختلفة.",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop",
    color: "from-green-500/20 to-emerald-500/20",
    tools: ["Illustrator", "Photoshop", "Figma"],
    results: ["هوية متكاملة", "زيادة التعرف على البراند", "تصميمات قابلة للتطوير"]
  },
  {
    id: 5,
    title: "منصة تعليمية",
    category: "مواقع إلكترونية",
    description: "منصة تعليمية تفاعلية مع نظام إدارة محتوى متكامل",
    fullDescription: "طورنا منصة تعليمية متكاملة تشمل نظام كورسات، اختبارات، وشهادات إلكترونية.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    color: "from-violet-500/20 to-purple-500/20",
    tools: ["React", "Node.js", "MongoDB", "AWS"],
    results: ["10,000 مستخدم نشط", "500 كورس", "معدل إكمال 75%"]
  },
  {
    id: 6,
    title: "حملة رمضان",
    category: "حملات تسويقية",
    description: "حملة موسمية ناجحة حققت نتائج استثنائية في رمضان",
    fullDescription: "خططنا حملة رمضانية متكاملة استهدفت المشاعر والقيم الرمضانية.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    color: "from-amber-500/20 to-yellow-500/20",
    tools: ["Meta Ads", "TikTok", "Influencers"],
    results: ["وصول 5 مليون", "engagement rate 8%", "أعلى مبيعات موسمية"]
  },
  {
    id: 7,
    title: "تطبيق توصيل",
    category: "مواقع إلكترونية",
    description: "تطبيق توصيل طلبات مع لوحة تحكم متكاملة",
    fullDescription: "طورنا تطبيق توصيل متكامل مع تتبع الطلبات ولوحة تحكم للإدارة.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    color: "from-red-500/20 to-orange-500/20",
    tools: ["React Native", "Firebase", "Google Maps"],
    results: ["50,000 تحميل", "تقييم 4.8 نجوم", "زمن توصيل أسرع 30%"]
  },
  {
    id: 8,
    title: "فيديو دعائي",
    category: "فيديوهات",
    description: "فيديو دعائي سينمائي لعلامة تجارية كبرى",
    fullDescription: "أنتجنا فيديو دعائي بجودة سينمائية عالية يروي قصة البراند.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    color: "from-indigo-500/20 to-blue-500/20",
    tools: ["Premiere Pro", "DaVinci Resolve", "Cinema Camera"],
    results: ["جائزة أفضل إعلان", "viral على السوشيال", "زيادة الوعي 400%"]
  },
  {
    id: 9,
    title: "براندينج شركة تقنية",
    category: "تصميمات",
    description: "هوية بصرية عصرية لشركة تقنية ناشئة",
    fullDescription: "صممنا هوية بصرية تعكس الابتكار والتكنولوجيا المتقدمة.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    color: "from-cyan-500/20 to-teal-500/20",
    tools: ["Illustrator", "Figma", "After Effects"],
    results: ["هوية متكاملة", "brand guidelines", "تطبيقات متعددة"]
  }
];

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === "الكل"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Background3D />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowRight className="w-5 h-5" />
            <span>الرجوع للرئيسية</span>
          </motion.button>

          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary font-bold text-lg mb-4">
              أعمالنا
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="block">مشاريع</span>
              <span className="block gradient-text">نفتخر بيها</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              دي مجموعة من أعمالنا اللي بتعكس إبداعنا وجودة شغلنا. 
              كل مشروع له قصة نجاح خاصة بيه.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Portfolio Grid */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass hover:bg-primary/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: activeCategory === category 
                    ? "0 0 30px hsla(262, 83%, 58%, 0.4)" 
                    : "none"
                }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Eye className="w-5 h-5 text-primary-foreground" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs text-primary font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          <motion.div
            className="relative glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-8">
              <span className="text-sm text-primary font-medium">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-4">{selectedProject.title}</h2>
              <p className="text-muted-foreground mb-6">{selectedProject.fullDescription}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">الأدوات المستخدمة</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3">النتائج</h3>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result) => (
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

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="glass-card p-12 rounded-2xl text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                عايز مشروعك يبقى هنا؟
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                خلينا نشتغل مع بعض ونحول فكرتك لمشروع ناجح
              </p>
              <motion.button
                onClick={() => navigate("/start-project")}
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ابدأ مشروعك
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
