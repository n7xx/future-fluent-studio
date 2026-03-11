import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Home, ArrowRight, Briefcase, BookOpen, Layers, Rocket } from "lucide-react";

const quickLinks = [
  { label: "الرئيسية", href: "/", icon: Home },
  { label: "خدماتنا", href: "/services", icon: Layers },
  { label: "أعمالنا", href: "/portfolio", icon: Briefcase },
  { label: "المدونة", href: "/blog", icon: BookOpen },
  { label: "ابدأ مشروعك", href: "/start-project", icon: Rocket },
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>404 - الصفحة مش موجودة | 4Creative</title>
        <meta name="description" content="الصفحة اللي بتدور عليها مش موجودة. ارجع للصفحة الرئيسية أو اكتشف خدمات 4Creative." />
      </Helmet>

      {/* Background effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(262, 83%, 58%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(187, 94%, 48%) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-6"
          >
            <span className="text-[8rem] sm:text-[10rem] font-black leading-none gradient-text block">
              404
            </span>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              الصفحة دي مش موجودة 😅
            </h1>
            <p className="text-muted-foreground text-lg mb-10">
              يبدو إنك وصلت لمكان غلط. بس مفيش مشكلة - ممكن ترجع للصفحة الرئيسية أو تتصفح الروابط دي
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10"
          >
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="glass-card p-4 rounded-xl flex flex-col items-center gap-2 group hover:border-primary/30 transition-all"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
              >
                <link.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {link.label}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.button
            onClick={() => navigate("/")}
            className="btn-primary inline-flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-5 h-5" />
            ارجع للصفحة الرئيسية
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
