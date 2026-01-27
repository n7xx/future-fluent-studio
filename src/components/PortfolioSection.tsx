import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Eye } from "lucide-react";

const categories = ["الكل", "مواقع إلكترونية", "حملات تسويقية", "فيديوهات", "تصميمات"];

const projects = [
  {
    title: "متجر أزياء راقية",
    category: "مواقع إلكترونية",
    description: "متجر إلكتروني متكامل مع تجربة تسوق سلسة",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "حملة إطلاق منتج",
    category: "حملات تسويقية",
    description: "حملة رقمية متكاملة لإطلاق منتج جديد",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "فيديو موشن جرافيك",
    category: "فيديوهات",
    description: "فيديو ترويجي بتقنية الموشن جرافيك",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "هوية مطعم فاخر",
    category: "تصميمات",
    description: "تصميم هوية بصرية متكاملة لمطعم راقي",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "منصة تعليمية",
    category: "مواقع إلكترونية",
    description: "منصة تعليمية تفاعلية مع نظام إدارة محتوى",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "حملة رمضان",
    category: "حملات تسويقية",
    description: "حملة موسمية ناجحة بنتائج استثنائية",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    color: "from-amber-500/20 to-yellow-500/20",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("الكل");
  const navigate = useNavigate();

  const filteredProjects = activeCategory === "الكل"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-4">
            أعمالنا
          </span>
          <h2 className="section-title">
            مشاريع نفتخر
            <span className="block gradient-text">بتنفيذها</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            نماذج من أعمالنا التي تعكس جودة وإبداع فريقنا
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              key={project.title}
              className="group relative rounded-2xl overflow-hidden glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
              whileHover={{ y: -10 }}
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
                  <motion.button
                    className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="w-5 h-5 text-primary-foreground" />
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.button>
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

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => navigate("/portfolio")}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            عرض جميع الأعمال
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
