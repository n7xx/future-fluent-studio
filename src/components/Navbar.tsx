import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { navContent } from "@/data/content";
import logoDark from "@/assets/logo.png";
import logoLight from "@/assets/logo-light.png";

// ✅ SVG Egypt Flag
const EgyptFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    width="28"
    height="19"
    aria-label="Egyptian Flag"
    style={{ display: "block", borderRadius: "2px" }}
  >
    <rect width="900" height="200" fill="#CE1126" />
    <rect y="200" width="900" height="200" fill="#FFFFFF" />
    <rect y="400" width="900" height="200" fill="#000000" />
    {/* Eagle of Saladin - simplified */}
    <g transform="translate(450,300)" fill="#C09300">
      <ellipse cx="0" cy="10" rx="28" ry="35" />
      <circle cx="0" cy="-28" r="16" />
      <polygon points="0,-20 10,-24 0,-14" />
      <ellipse
        cx="-52"
        cy="-5"
        rx="32"
        ry="12"
        transform="rotate(-20,-52,-5)"
      />
      <ellipse cx="52" cy="-5" rx="32" ry="12" transform="rotate(20,52,-5)" />
      <rect x="-18" y="40" width="10" height="14" rx="3" />
      <rect x="8" y="40" width="10" height="14" rx="3" />
      <rect x="-12" y="-10" width="24" height="28" rx="3" fill="#CE1126" />
      <rect x="-12" y="0" width="24" height="9" fill="#FFFFFF" />
      <rect x="-12" y="9" width="24" height="9" fill="#000000" />
    </g>
  </svg>
);

// ✅ SVG UK Flag
const UKFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 30"
    width="28"
    height="19"
    aria-label="UK Flag"
    style={{ display: "block", borderRadius: "2px" }}
  >
    <clipPath id="uk-border">
      <rect width="60" height="30" />
    </clipPath>
    <rect width="60" height="30" fill="#012169" />
    {/* White diagonals */}
    <path
      d="M0,0 L60,30 M60,0 L0,30"
      stroke="#fff"
      strokeWidth="6"
      clipPath="url(#uk-border)"
    />
    {/* Red diagonals */}
    <path
      d="M0,0 L60,30 M60,0 L0,30"
      stroke="#C8102E"
      strokeWidth="4"
      clipPath="url(#uk-border)"
    />
    {/* White cross */}
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
    {/* Red cross */}
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang } = useLanguage();

  const content = navContent[lang];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme === "dark" || (!savedTheme && true);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  const handleNavClick = (item: {
    label: string;
    href: string;
    isPage: boolean;
  }) => {
    setIsMobileMenuOpen(false);
    if (item.isPage) {
      if (item.href === "/") {
        if (location.pathname === "/")
          window.scrollTo({ top: 0, behavior: "smooth" });
        else {
          navigate("/");
          setTimeout(
            () => window.scrollTo({ top: 0, behavior: "smooth" }),
            100,
          );
        }
      } else navigate(item.href);
    } else {
      const [, hash] = item.href.split("#");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Arabic → Egypt SVG flag | English → UK SVG flag
  const LangToggle = () => (
    <motion.button
      onClick={toggleLang}
      className="p-2 rounded-full glass hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      {lang === "ar" ? <EgyptFlag /> : <UKFlag />}
    </motion.button>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-2" : "py-3"}`}
        role="navigation"
        aria-label={content.mainNav}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
            aria-label={content.homepageAria}
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

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8" role="menubar">
            {content.items.map((item, index) => (
              <li key={item.href} role="none">
                <motion.button
                  onClick={() => handleNavClick(item)}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  role="menuitem"
                >
                  {item.label}
                </motion.button>
              </li>
            ))}

            {/* ✅ Language Toggle - Desktop */}
            <li role="none">
              <LangToggle />
            </li>

            {/* Theme Toggle - Desktop */}
            <li role="none">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full glass hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isDark ? content.lightMode : content.darkMode}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            </li>

            {/* CTA Button - Desktop */}
            <li role="none">
              <motion.button
                onClick={() => navigate("/start-project")}
                className="btn-primary text-sm px-6 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.startProject}
              </motion.button>
            </li>
          </ul>

          {/* Mobile Controls — always visible on small screens */}
          <div className="flex lg:hidden items-center gap-3">
            {/* ✅ Language Toggle - Mobile */}
            <LangToggle />

            {/* Theme Toggle - Mobile */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full glass hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? content.lightMode : content.darkMode}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </motion.button>

            {/* Hamburger */}
            <motion.button
              className="text-foreground p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={
                isMobileMenuOpen ? content.closeMenu : content.openMenu
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, x: lang === "ar" ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === "ar" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 lg:hidden"
            role="navigation"
            aria-label={content.mobileNav}
          >
            <ul role="menu" className="flex flex-col items-center gap-8">
              {content.items.map((item, index) => (
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

            {/* CTA Button - Mobile Menu */}
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/start-project");
              }}
              className="btn-primary mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {content.startProject}
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
