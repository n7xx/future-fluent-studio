import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ArrowUpLeft } from "lucide-react";
import { getServiceById, services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? getServiceById(serviceId) : undefined;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">الخدمة غير موجودة</h1>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Background3D />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link 
              to="/#services" 
              className="inline-flex items-center gap-2 text-primary mb-8 hover:underline"
            >
              <ArrowRight className="w-5 h-5" />
              العودة للخدمات
            </Link>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                <Icon className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black">
                <span className="gradient-text">{service.title}</span>
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {service.fullDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12">ما نقدمه</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8">لماذا تختارنا؟</h2>
              <div className="space-y-6">
                {service.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-lg text-foreground/90">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8"
            >
              <h3 className="text-2xl font-bold mb-8">منهجية العمل</h3>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="pt-2">
                      <p className="font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">دراسات الحالة</h2>
            <p className="text-muted-foreground mb-12">مشاريع ناجحة نفخر بها</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {service.caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <h3 className="text-2xl font-bold mb-2 gradient-text">{caseStudy.title}</h3>
                  <p className="text-primary font-medium mb-6">{caseStudy.client}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-sm text-muted-foreground mb-1">التحدي</h4>
                      <p>{caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-muted-foreground mb-1">الحل</h4>
                      <p>{caseStudy.solution}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground mb-3">النتائج</h4>
                    <div className="space-y-2">
                      {caseStudy.results.map((result, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="glass-card p-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, hsla(262, 83%, 20%, 0.4) 0%, hsla(270, 40%, 10%, 0.3) 100%)",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهز تبدأ مشروعك؟
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              تواصل معنا الآن ودعنا نساعدك في تحقيق أهدافك
            </p>
            <Link
              to="/#contact"
              className="btn-primary inline-flex items-center gap-3"
            >
              <ArrowUpLeft className="w-5 h-5" />
              تواصل معنا
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-2xl font-bold mb-8">خدمات أخرى</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map((otherService, index) => {
                const OtherIcon = otherService.icon;
                return (
                  <motion.div
                    key={otherService.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/services/${otherService.id}`}
                      className="glass-card p-6 block group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <OtherIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {otherService.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {otherService.shortDescription}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
