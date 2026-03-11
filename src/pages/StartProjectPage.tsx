import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, 
  Rocket, 
  CheckCircle2, 
  MessageCircle, 
  Calendar,
  Star,
  Users,
  Award,
  Clock,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

const MemoizedBackground = memo(Background3D);

const benefits = [
  {
    icon: Star,
    title: "High Quality",
    description: "4Creative بتشتغل بأعلى Standards في كل مشروع"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "فريق متخصص في كل مجال - من Design للDevelopment"
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "سجل حافل بالنجاحات مع Brands كبيرة ومتوسطة"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "بنسلم في الـ Deadline المتفق عليه بدون تأخير"
  }
];

const trustSignals = [
  { number: "+150", label: "مشروع ناجح" },
  { number: "+50", label: "Brand اتحول" },
  { number: "+5", label: "سنين Experience" },
  { number: "100%", label: "Client Satisfaction" }
];

const StartProjectPage = () => {
  const navigate = useNavigate();
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
    window.open("https://wa.me/201000000000?text=مرحبا، عايز أبدأ مشروع جديد", "_blank");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>ابدأ مشروعك | 4Creative - تواصل معنا</title>
        <meta name="description" content="ابدأ مشروعك مع 4Creative - احكيلنا عن براندك وفريقنا هيتواصل معاك. Website Development، Digital Marketing، Branding وأكتر." />
        <link rel="canonical" href="https://4creative.agency/start-project" />
        <meta property="og:title" content="ابدأ مشروعك مع 4Creative" />
        <meta property="og:description" content="خلي براندك يوصل للناس الصح - فريق 4Creative جاهز يساعدك!" />
        <meta property="og:url" content="https://4creative.agency/start-project" />
        <meta property="og:image" content="https://4creative.agency/og-start-project.png" />
      </Helmet>
      <MemoizedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowRight className="w-5 h-5" />
            <span>الرجوع للرئيسية</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Rocket className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Start Your Project مع 4Creative</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                <span className="block">خلي البراند بتاعك</span>
                <span className="block gradient-text">يوصل للناس الصح</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                سواء محتاج Website، Digital Marketing، أو Branding كامل - 
                فريق 4Creative هنا عشان يبني معاك حضور رقمي قوي 
                ويحقق لك Results حقيقية مش مجرد Likes.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="flex items-start gap-3 p-4 glass-card rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-4 gap-4">
                {trustSignals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-2xl font-black gradient-text">{signal.number}</div>
                    <div className="text-xs text-muted-foreground">{signal.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              className="glass-card p-8 rounded-2xl"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">ابدأ مشروعك مع 4Creative</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="اسمك"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                  <Input
                    placeholder="رقم الموبايل"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                
                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
                
                <Input
                  placeholder="اسم الشركة أو المشروع"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background/50"
                />

                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground"
                  required
                >
                  <option value="">اختار الخدمة</option>
                  <option value="web">Website Development</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="content">Content Creation</option>
                  <option value="video">Video Production</option>
                  <option value="design">Branding & Design</option>
                  <option value="strategy">Digital Strategy</option>
                </select>

                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground"
                >
                  <option value="">الميزانية التقريبية (اختياري)</option>
                  <option value="small">أقل من 5,000 جنيه</option>
                  <option value="medium">5,000 - 15,000 جنيه</option>
                  <option value="large">15,000 - 50,000 جنيه</option>
                  <option value="enterprise">أكثر من 50,000 جنيه</option>
                </select>
                
                <Textarea
                  placeholder="احكيلنا عن مشروعك..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="bg-background/50"
                />
                
                <Button type="submit" className="w-full btn-primary">
                  <Send className="w-5 h-5 ml-2" />
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
                    <MessageCircle className="w-5 h-5 ml-2" />
                    واتساب
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open("https://calendly.com", "_blank")}
                  >
                    <Calendar className="w-5 h-5 ml-2" />
                    احجز ميتينج
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">ليه تشتغل مع 4Creative؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              مش بس بنعمل شغل Creative - إحنا بنبني Partnerships حقيقية مع الـ Brands اللي بنشتغل معاها
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "فاهمين السوق المصري",
                description: "4Creative عندها Experience كبيرة في الـ Local Market وفاهمين الـ Consumer Behavior في مصر"
              },
              {
                icon: CheckCircle2,
                title: "Full-Service Agency",
                description: "كل حاجة تحت سقف واحد - من الـ Design للـ Development للـ Marketing"
              },
              {
                icon: CheckCircle2,
                title: "Results-Driven",
                description: "مش بس شغل حلو، إحنا بنركز على الـ Results اللي تفرق معاك - Leads، Sales، وGrowth"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-card p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
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
