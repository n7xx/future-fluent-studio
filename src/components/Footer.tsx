import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { label: "تطوير المواقع", href: "#services" },
      { label: "التسويق الرقمي", href: "#services" },
      { label: "صناعة المحتوى", href: "#services" },
      { label: "التصميم والهوية", href: "#services" },
    ],
    company: [
      { label: "من نحن", href: "#about" },
      { label: "أعمالنا", href: "#portfolio" },
      { label: "منهجيتنا", href: "#process" },
      { label: "تواصل معنا", href: "#contact" },
    ],
  };

  return (
    <footer className="py-16 relative overflow-hidden border-t border-border/30">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <motion.img
              src={logo}
              alt="4 Creative"
              className="h-16 w-auto mb-6"
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              نحن وكالة رقمية متكاملة نجمع بين الإبداع والتكنولوجيا لتحويل أفكارك
              إلى حلول رقمية استثنائية تميزك في السوق.
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">خدماتنا</h4>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">الشركة</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} 4 Creative. جميع الحقوق محفوظة.
          </p>
          <p className="text-muted-foreground text-sm">
            صُنع بـ ❤️ بواسطة فريق 4 Creative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
