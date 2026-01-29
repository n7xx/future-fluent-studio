import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoDark from "@/assets/logo.png";
import logoLight from "@/assets/logo-light.png";

const navItems = [
  { label: "الرئيسية", href: "/", isPage: true },
  { label: "من نحن", href: "/about", isPage: true },
  { label: "خدماتنا", href: "/services", isPage: true },
  { label: "أعمالنا", href: "/portfolio", isPage: true },
  { label: "المدونة", href: "/blog", isPage: true },
  { label: "تواصل معنا", href: "/#contact", isPage: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme === "dark" || (!savedTheme && true);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    
    if (item.isPage) {
      // For home page, always scroll to top
      if (item.href === '/') {
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/');
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      } else {
        navigate(item.href);
      }
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
          isScrolled ? "glass py-2" : "py-3"
        }`}
        role="navigation"
        aria-label="التنقل الرئيسي"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate("/")}
            aria-label="الصفحة الرئيسية - 4Creative"
          >
            <img 
              src={isDark ? logoDark : logoLight} 
              alt="4Creative - Digital Marketing Agency" 
              className="h-12 w-auto transition-all duration-300"
              width={48}
              height={48}
              loading="eager"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8" role="menubar">
            {navItems.map((item, index) => (
              <li key={item.href} role="none">
                <motion.button
                  onClick={() => handleNavClick(item)}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  role="menuitem"
                  aria-label={item.label}
                >
                  {item.label}
                </motion.button>
              </li>
            ))}
            {/* Theme Toggle */}
            <li role="none">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full glass hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
                aria-pressed={isDark}
              >
                {isDark ? <Sun className="w-5 h-5 text-primary" aria-hidden="true" /> : <Moon className="w-5 h-5 text-primary" aria-hidden="true" />}
              </motion.button>
            </li>

            <li role="none">
              <motion.button
                onClick={() => navigate("/start-project")}
                className="btn-primary text-sm px-6 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="ابدأ مشروعك الآن"
              >
                ابدأ مشروعك
              </motion.button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full glass hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="w-5 h-5 text-primary" aria-hidden="true" /> : <Moon className="w-5 h-5 text-primary" aria-hidden="true" />}
            </motion.button>
            <motion.button
              className="text-foreground p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 lg:hidden"
            role="navigation"
            aria-label="القائمة المتنقلة"
          >
            <ul role="menu" className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <li key={item.href} role="none">
                  <motion.button
                    onClick={() => handleNavClick(item)}
                    className="text-2xl font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-4 py-2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    role="menuitem"
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/start-project");
              }}
              className="btn-primary mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              aria-label="ابدأ مشروعك الآن"
            >
              ابدأ مشروعك
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
