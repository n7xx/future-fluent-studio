import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const links = {
    services: [
      { label: "Website Development", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Content Creation", href: "/services/content-creation" },
      { label: "Branding & Design", href: "/services/design-branding" },
    ],
    company: [
      { label: "من نحن", href: "/about" },
      { label: "أعمالنا", href: "/portfolio" },
      { label: "خدماتنا", href: "/services" },
      { label: "المدونة", href: "/blog" },
      { label: "ابدأ مشروعك", href: "/start-project" },
    ],
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.replace('/#', '');
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="py-16 relative overflow-hidden border-t border-border/30" role="contentinfo" aria-label="تذييل الصفحة">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img
              src={logo}
              alt="4Creative - Digital Marketing Agency"
              className="h-16 w-auto mb-6 cursor-pointer"
              onClick={() => navigate("/")}
              width={64}
              height={64}
              loading="lazy"
            />
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              4Creative هي Full-Service Digital Agency في مصر. بنبني Brands تفضل في دماغ الناس 
              من خلال Website Development، Digital Marketing، Branding، وContent Creation.
            </p>
          </div>

          {/* Services Links */}
          <nav aria-label="روابط الخدمات">
            <h4 className="font-bold text-lg mb-4">خدماتنا</h4>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-1"
                    aria-label={`خدمة ${link.label}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav aria-label="روابط مهمة">
            <h4 className="font-bold text-lg mb-4">روابط مهمة</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} 4Creative. كل الحقوق محفوظة.
          </p>
          <p className="text-muted-foreground text-sm">
            صُنع بـ <span aria-label="حب">❤️</span> بواسطة فريق 4Creative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
