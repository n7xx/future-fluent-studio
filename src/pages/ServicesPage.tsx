import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { 
  Globe, 
  TrendingUp, 
  PenTool, 
  Video, 
  Palette, 
  Lightbulb 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

const services = [
  {
    id: "web-development",
    icon: Globe,
    title: "Website Development",
    description: "4Creative بتبني Websites تبيع مش مجرد شكل حلو. مواقع سريعة، Responsive، ومحسّنة للـ SEO والـ Conversion.",
    features: ["Responsive Design", "UX/UI Excellence", "Fast Loading", "SEO Optimized"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Performance Marketing مش بوستات وخلاص! Paid Ads على Meta وGoogle، SEO، وSocial Media Management بنتائج Measurable.",
    features: ["Meta & Google Ads", "SEO", "Data Analytics", "Social Media Management"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "content-creation",
    icon: PenTool,
    title: "Content Creation",
    description: "Content يتكلم بلغة جمهورك ويحقق Real Engagement. Copywriting، Photography، وContent Strategy.",
    features: ["Creative Copywriting", "Professional Photography", "Content Management", "Content Strategy"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "video-motion",
    icon: Video,
    title: "Video Production",
    description: "4Creative بتنتج Videos تجذب الانتباه وتحقق Views. Reels، TikTok، Motion Graphics، وAds Production.",
    features: ["Professional Editing", "Motion Graphics", "Visual Effects", "Video Ads"],
    color: "from-orange-500 to-red-500"
  },
  {
    id: "design-branding",
    icon: Palette,
    title: "Branding & Design",
    description: "Branding يخلي الناس تفتكرك من أول نظرة. Visual Identity متكاملة تميزك عن كل المنافسين.",
    features: ["Logo Design", "Brand Identity", "Packaging", "Marketing Materials"],
    color: "from-violet-500 to-purple-500"
  },
  {
    id: "digital-strategy",
    icon: Lightbulb,
    title: "Digital Strategy",
    description: "Growth Plan شاملة للـ Digital Transformation. بنحلل السوق ونحط Strategy تحقق أهداف البزنس بتاعك.",
    features: ["Market Analysis", "Growth Strategy", "Digital Consulting", "Competitor Analysis"],
    color: "from-amber-500 to-yellow-500"
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

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
              4Creative Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="block">Full-Service</span>
              <span className="block gradient-text">Digital Agency</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              كل اللي البراند بتاعك محتاجه في مكان واحد - Website Development، Digital Marketing، 
              Branding، Content Creation، وVideo Production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group glass-card p-8 rounded-2xl cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/services/${service.id}`)}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow - Always Visible */}
                <div className="flex items-center gap-2 text-primary font-medium">
                  <ArrowUpLeft className="w-5 h-5" />
                  <span>اكتشف المزيد</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                مش متأكد تبدأ من فين؟
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                احكيلنا عن الـ Brand بتاعك و4Creative هتساعدك تختار الـ Services المناسبة
              </p>
              <motion.button
                onClick={() => navigate("/start-project")}
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ابدأ مشروعك مع 4Creative
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
