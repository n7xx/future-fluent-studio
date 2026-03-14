import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Send, 
  MessageCircle,
  Calendar,
  Star,
  Users,
  Award,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  {
    icon: Star,
    title: "جودة عالية",
    description: "نلتزم بأعلى معايير الجودة في كل مشروع"
  },
  {
    icon: Users,
    title: "فريق متخصص",
    description: "خبراء في كل مجال يعملون على مشروعك"
  },
  {
    icon: Award,
    title: "نتائج مضمونة",
    description: "سجل حافل بالنجاحات مع عملائنا"
  },
  {
    icon: Clock,
    title: "التزام بالمواعيد",
    description: "نسلم مشاريعنا في الوقت المحدد"
  }
];

const trustSignals = [
  { number: "+150", label: "مشروع ناجح" },
  { number: "+50", label: "عميل سعيد" },
  { number: "+5", label: "سنين خبرة" },
  { number: "100%", label: "رضا العملاء" }
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال طلبك بنجاح! 🎉",
      description: "هنتواصل معاك في أقرب وقت",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: ""
    });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/201000000000?text=مرحبا، عايز أبدأ مشروع جديد", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref} aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-4">
            تواصل معنا
          </span>
          <h2 id="contact-heading" className="section-title">
            جاهز تبدأ مشروعك؟
            <span className="block gradient-text">خلينا نساعدك</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mt-6">
            إحنا هنا علشان نساعدك تبني حضور رقمي قوي. 
            سواء كنت بتبدأ من الصفر أو عايز تطور اللي عندك، 
            فريقنا جاهز يشتغل معاك خطوة بخطوة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Benefits & Trust Signals */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-start gap-3 p-4 glass-card rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Signals */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 glass-card p-4 sm:p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {trustSignals.map((signal) => (
                <div key={signal.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{signal.number}</div>
                  <div className="text-xs text-muted-foreground">{signal.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Why Work With Us */}
            <motion.div
              className="glass-card p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-bold text-lg mb-4">ليه تشتغل معانا؟</h3>
              <ul className="space-y-3">
                {[
                  "فاهمين السوق المصري وعندنا خبرة كبيرة",
                  "فريق متكامل - من التصميم للتطوير للتسويق",
                  "نتائج ملموسة تفرق مع مشروعك"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">ابعت لنا طلبك</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">اسمك</label>
                  <Input
                    id="contact-name"
                    placeholder="اسمك"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="sr-only">رقم الموبايل</label>
                  <Input
                    id="contact-phone"
                    placeholder="رقم الموبايل"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-background/50"
                    autoComplete="tel"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="contact-email" className="sr-only">البريد الإلكتروني</label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <label htmlFor="contact-company" className="sr-only">اسم الشركة أو المشروع</label>
                <Input
                  id="contact-company"
                  placeholder="اسم الشركة أو المشروع"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background/50"
                  autoComplete="organization"
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="sr-only">اختار الخدمة</label>
                <select
                  id="contact-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground"
                  required
                  aria-label="اختار الخدمة المطلوبة"
                >
                  <option value="">اختار الخدمة</option>
                  <option value="web">تطوير المواقع</option>
                  <option value="marketing">التسويق الرقمي</option>
                  <option value="content">صناعة المحتوى</option>
                  <option value="video">المونتاج والموشن</option>
                  <option value="design">التصميم والهوية</option>
                  <option value="strategy">الاستراتيجية الرقمية</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-budget" className="sr-only">الميزانية التقريبية</label>
                <select
                  id="contact-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground"
                  aria-label="الميزانية التقريبية"
                >
                  <option value="">الميزانية التقريبية (اختياري)</option>
                  <option value="small">أقل من 5,000 جنيه</option>
                  <option value="medium">5,000 - 15,000 جنيه</option>
                  <option value="large">15,000 - 50,000 جنيه</option>
                  <option value="enterprise">أكثر من 50,000 جنيه</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="contact-message" className="sr-only">تفاصيل المشروع</label>
                <Textarea
                  id="contact-message"
                  placeholder="احكيلنا عن مشروعك..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="bg-background/50"
                />
              </div>
              
              <Button type="submit" className="w-full btn-primary">
                <Send className="w-5 h-5 ml-2" aria-hidden="true" />
                ابعت طلبك
              </Button>
            </form>

            {/* Alternative Contact */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <p className="text-center text-sm text-muted-foreground mb-4">
                أو تواصل معانا مباشرة
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-5 h-5 ml-2" aria-hidden="true" />
                  واتساب
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open("https://calendly.com", "_blank", "noopener,noreferrer")}
                >
                  <Calendar className="w-5 h-5 ml-2" aria-hidden="true" />
                  احجز ميتينج
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
