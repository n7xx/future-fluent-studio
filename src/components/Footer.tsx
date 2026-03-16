import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { footerContent } from "@/data/content";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const c = footerContent[lang];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.replace('/#', '');
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="py-16 relative overflow-hidden border-t border-border/30" role="contentinfo">
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <img src={logo} alt="4Creative" className="h-16 w-auto mb-6 cursor-pointer" onClick={() => navigate("/")} width={64} height={64} loading="lazy" />
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">{c.description}</p>
          </div>

          <nav>
            <h4 className="font-bold text-lg mb-4">{c.servicesTitle}</h4>
            <ul className="space-y-3">
              {c.services.map((link, i) => (
                <li key={i}><button onClick={() => handleNavClick(link.href)} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</button></li>
              ))}
            </ul>
          </nav>

          <nav>
            <h4 className="font-bold text-lg mb-4">{c.linksTitle}</h4>
            <ul className="space-y-3">
              {c.company.map((link, i) => (
                <li key={i}><button onClick={() => handleNavClick(link.href)} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</button></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© {currentYear} 4Creative. {c.copyright}</p>
          <p className="text-muted-foreground text-sm">{c.madeWith}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
