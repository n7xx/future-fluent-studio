import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Rocket, CheckCircle2, MessageCircle, Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { startProjectContent } from "@/data/content";

const MemoizedBackground = memo(Background3D);

const StartProjectPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { lang, isRTL } = useLanguage();
  const c = startProjectContent[lang];
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name, email: formData.email, phone: formData.phone || null,
      service: formData.service || null, budget: formData.budget || null,
      message: formData.message || "No message",
    });

    // Also send email notification
    try {
      await supabase.functions.invoke("send-contact-email", {
        body: { name: formData.name, email: formData.email, phone: formData.phone, company: formData.company, service: formData.service, budget: formData.budget, message: formData.message },
      });
    } catch (err) {
      console.error("Email notification failed:", err);
    }

    if (error) {
      toast({ title: c.errorTitle, description: c.errorDesc, variant: "destructive" });
      return;
    }
    toast({ title: c.successTitle, description: c.successDesc });
    setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/201000000000?text=" + encodeURIComponent(lang === "ar" ? "مرحبا، عايز أبدأ مشروع جديد" : "Hello, I'd like to start a new project"), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href="https://4creative.agency/start-project" />
      </Helmet>
      <MemoizedBackground />
      <Navbar />

      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6">
          <motion.button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <BackArrow className="w-5 h-5" />
            <span>{c.backButton}</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Rocket className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{c.badge}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                <span className="block">{c.heroTitle1}</span>
                <span className="block gradient-text">{c.heroTitle2}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">{c.heroDesc}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {c.benefits.map((benefit, index) => (
                  <motion.div key={benefit.title} className="flex items-start gap-3 p-4 glass-card rounded-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {c.trustSignals.map((signal, index) => (
                  <motion.div key={signal.label} className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.1 }}>
                    <div className="text-2xl font-black gradient-text">{signal.number}</div>
                    <div className="text-xs text-muted-foreground">{signal.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="glass-card p-8 rounded-2xl" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-6">{c.formTitle}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder={c.name} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-background/50" />
                  <Input placeholder={c.phone} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="bg-background/50" />
                </div>
                <Input type="email" placeholder={c.email} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="bg-background/50" />
                <Input placeholder={c.company} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="bg-background/50" />
                <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground" required>
                  <option value="">{c.selectService}</option>
                  {c.services.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground">
                  <option value="">{c.budgetLabel}</option>
                  {c.budgets.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
                <Textarea placeholder={c.messagePlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="bg-background/50" />
                <Button type="submit" className="w-full btn-primary">
                  <Send className="w-5 h-5 ml-2" />
                  {c.submit}
                </Button>
              </form>
              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-center text-sm text-muted-foreground mb-4">{c.altContact}</p>
                <div className="flex gap-4">
                  <Button onClick={handleWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    {c.whatsapp}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => window.open("https://calendly.com", "_blank", "noopener,noreferrer")}>
                    <Calendar className="w-5 h-5 ml-2" />
                    {c.bookMeeting}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-4">{c.whyWorkTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{c.whyWorkDesc}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {c.whyWorkItems.map((item, index) => (
              <motion.div key={item.title} className="glass-card p-6 rounded-xl text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartProjectPage;
