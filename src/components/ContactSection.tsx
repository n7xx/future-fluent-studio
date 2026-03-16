import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Send, MessageCircle, Calendar, Star, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactContent } from "@/data/content";

const benefitIcons = [Star, Users, Award, Clock];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const { lang } = useLanguage();
  const c = contactContent[lang];
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name, email: formData.email, phone: formData.phone || null,
      service: formData.service || null, budget: formData.budget || null,
      message: formData.message || "No message",
    });
    if (error) {
      toast({ title: c.errorTitle, description: c.errorDesc, variant: "destructive" });
      return;
    }
    toast({ title: c.successTitle, description: c.successDesc });
    setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/201000000000?text=مرحبا، عايز أبدأ مشروع جديد", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref} aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="inline-block text-primary font-bold text-lg mb-4">{c.tag}</span>
          <h2 id="contact-heading" className="section-title">{c.title1}<span className="block gradient-text">{c.title2}</span></h2>
          <p className="text-xl text-muted-foreground leading-relaxed mt-6">{c.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Benefits */}
          <motion.div className="space-y-8" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {c.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                return (
                  <motion.div key={benefit.title} className="flex items-start gap-3 p-4 glass-card rounded-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + index * 0.1 }}>
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 glass-card p-4 sm:p-6 rounded-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
              {c.trustSignals.map((signal) => (
                <div key={signal.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{signal.number}</div>
                  <div className="text-xs text-muted-foreground">{signal.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div className="glass-card p-6 rounded-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
              <h3 className="font-bold text-lg mb-4">{c.whyWorkTitle}</h3>
              <ul className="space-y-3">
                {c.whyWorkItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div className="glass-card p-8 rounded-2xl" initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-2xl font-bold mb-6">{c.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder={c.name} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-background/50" />
                <Input placeholder={c.phone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="bg-background/50" />
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
  );
};

export default ContactSection;
