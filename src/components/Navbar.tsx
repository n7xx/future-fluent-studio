import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "الرئيسية", href: "/", isPage: true },
  { label: "من نحن", href: "/#about", isPage: false },
  { label: "خدماتنا", href: "/services", isPage: true },
  { label: "أعمالنا", href: "/portfolio", isPage: true },
  { label: "المدونة", href: "/blog", isPage: true },
  { label: "منهجيتنا", href: "/#process", isPage: false },
  { label: "تواصل معنا", href: "/#contact", isPage: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    
    if (item.isPage) {
      navigate(item.href);
    } else {
      // Handle hash navigation
      const [path, hash] = item.href.split('#');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="4Creative - Digital Marketing Agency" className="h-20 w-auto" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => navigate("/start-project")}
              className="btn-primary text-sm px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ مشروعك
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/start-project");
              }}
              className="btn-primary mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              ابدأ مشروعك
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
