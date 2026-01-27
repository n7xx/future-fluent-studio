import { 
  Globe, 
  TrendingUp, 
  PenTool, 
  Video, 
  Palette, 
  Lightbulb,
  LucideIcon
} from "lucide-react";

export interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
}

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  process: string[];
  caseStudies: CaseStudy[];
}

export const services: Service[] = [
  {
    id: "web-development",
    icon: Globe,
    title: "Website Development",
    shortDescription: "4Creative بتبني Websites تبيع مش مجرد شكل حلو - سريعة، Responsive، ومحسّنة للـ SEO",
    fullDescription: "في 4Creative بنصمم ونطور Custom Websites بالكامل تناسب البزنس بتاعك. بنستخدم أحدث Technologies عشان نضمن Performance متميز وUser Experience استثنائي. سواء محتاج Corporate Website، E-commerce Store، أو Web Application، فريقنا جاهز يحول Vision بتاعك لـ Digital Reality.",
    features: ["Responsive Design", "UX/UI Excellence", "Fast Loading", "SEO Optimized", "Easy CMS", "Ongoing Support"],
    benefits: [
      "زيادة الـ Reach للـ Potential Customers",
      "تعزيز الـ Credibility والـ Trust",
      "توفير Smooth User Experience",
      "Scalability والقابلية للتطوير",
      "تحسين Conversion Rate",
    ],
    process: [
      "Requirements Analysis وفهم الأهداف",
      "UI/UX Design",
      "Development بأحدث Technologies",
      "Quality Testing شامل",
      "Launch والـ Ongoing Support",
    ],
    caseStudies: [
      {
        title: "E-commerce Platform متكاملة",
        client: "Fashion House",
        challenge: "الحاجة لـ E-commerce Platform حديثة تدعم آلاف Products مع Smooth Shopping Experience",
        solution: "تطوير Online Store متكامل مع Smart Inventory System وMultiple Payment Gateways",
        results: [
          "250% زيادة في Sales",
          "90% تحسين في User Experience",
          "40% تقليل في Cart Abandonment Rate",
        ],
      },
      {
        title: "Corporate Website",
        client: "ConsultPro",
        challenge: "بناء Professional Digital Presence يعكس خبرة الشركة ويجذب الـ Leads",
        solution: "تصميم Modern Website مع Consultation Booking System ومدونة متخصصة",
        results: [
          "180% زيادة في Inquiries",
          "تحسين SEO Rankings",
          "60% زيادة في Time on Site",
        ],
      },
    ],
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    shortDescription: "Performance Marketing مش بوستات وخلاص! Paid Ads، SEO، وSocial Media بنتائج Measurable",
    fullDescription: "4Creative بتقدم Full Digital Marketing Services تساعدك توصل للـ Target Audience بتاعك وتحولهم لـ Customers. من Paid Ads Management لـ SEO والـ Social Media Marketing، بنشتغل على Integrated Strategy تحقق الـ Goals بتاعتك.",
    features: ["Paid Advertising", "SEO", "Data Analytics", "Content Marketing", "Social Media Management", "Email Marketing"],
    benefits: [
      "زيادة Brand Awareness",
      "Precise Audience Targeting",
      "Accurate Results Measurement",
      "Improved ROI",
      "Building Customer Relationships",
    ],
    process: [
      "Market & Competitor Research",
      "Target Audience Definition",
      "Marketing Strategy Development",
      "Campaign Execution",
      "Analysis & Continuous Optimization",
    ],
    caseStudies: [
      {
        title: "Product Launch Campaign",
        client: "TechStart Egypt",
        challenge: "إطلاق App جديد في Competitive Market بـ Limited Budget",
        solution: "Integrated Marketing Campaign تشمل Targeted Ads وInfluencer Marketing",
        results: [
          "أكثر من 50,000 Download في أول شهر",
          "60% أقل في Customer Acquisition Cost",
          "15% Engagement Rate على Social Media",
        ],
      },
    ],
  },
  {
    id: "content-creation",
    icon: PenTool,
    title: "Content Creation",
    shortDescription: "Content يتكلم بلغة جمهورك ويحقق Real Engagement - Copywriting، Photography، وStrategy",
    fullDescription: "Content is King! في 4Creative بنساعدك تعمل Engaging Content يتكلم بلغة الـ Audience بتاعك ويعزز الـ Brand Identity. من Creative Copywriting لـ Professional Photography وContent Management، بنقدم Full Solutions تخلي الـ Brand بتاعك يتألق.",
    features: ["Creative Copywriting", "Professional Photography", "Content Management", "Content Strategy", "SEO Optimization", "Interactive Content"],
    benefits: [
      "Building Audience Connection",
      "Enhancing Trust & Credibility",
      "Improving SEO Rankings",
      "Increasing Engagement & Shares",
      "Standing Out from Competition",
    ],
    process: [
      "Understanding Brand & Audience",
      "Content Strategy Development",
      "Content Creation",
      "Review & Optimization",
      "Publishing & Distribution",
    ],
    caseStudies: [
      {
        title: "Full Content Strategy",
        client: "Local Fashion Brand",
        challenge: "Building Strong Social Media Presence وزيادة Brand Awareness",
        solution: "Monthly Content Plan مع Professional Photography وCreative Copywriting",
        results: [
          "400% Followers Growth",
          "250% Engagement Increase",
          "180% Sales من Social Media",
        ],
      },
    ],
  },
  {
    id: "video-motion",
    icon: Video,
    title: "Video Production",
    shortDescription: "4Creative بتنتج Videos تجذب الانتباه وتحقق Views - Reels، Motion Graphics، وAds",
    fullDescription: "Video هو أقوى أدوات التواصل! 4Creative بتقدم Professional Video Production Services تشمل Editing، Motion Graphics، وVisual Effects. سواء محتاج Explainer Video، Ad، أو Social Media Content، فريقنا جاهز يبهر الـ Audience بتاعك.",
    features: ["Professional Editing", "Motion Graphics", "Visual Effects", "Video Ads", "Explainer Videos", "Reels & TikTok Content"],
    benefits: [
      "Capturing Audience Attention",
      "Effective Message Delivery",
      "Higher Conversion Rates",
      "Enhanced Visual Memory",
      "Shareable Content",
    ],
    process: [
      "Script Writing & Story Development",
      "Storyboard & Initial Design",
      "Production & Filming",
      "Editing & Post-Production",
      "Review & Delivery",
    ],
    caseStudies: [
      {
        title: "Explainer Video Series",
        client: "EduPlatform",
        challenge: "شرح Concepts معقدة بطريقة Easy وEngaging",
        solution: "إنتاج Motion Graphics Series تعليمية بـ Unique Storytelling Style",
        results: [
          "أكثر من 1 Million Views",
          "120% زيادة في Subscriptions",
          "85% تحسين في User Understanding",
        ],
      },
    ],
  },
  {
    id: "design-branding",
    icon: Palette,
    title: "Branding & Design",
    shortDescription: "Branding يخلي الناس تفتكرك من أول نظرة - Visual Identity متكاملة تميزك عن المنافسين",
    fullDescription: "الـ Visual Identity هي وش الـ Brand بتاعك! في 4Creative بنصمم Complete Brand Identities تعكس القيم بتاعتك وتميزك عن المنافسين. من Logo Design لـ Full Brand Guidelines، بنساعدك تبني Strong وConsistent Brand.",
    features: ["Logo Design", "Brand Identity", "Packaging", "Logo Design", "Brand Guidelines", "Marketing Materials"],
    benefits: [
      "Standing Out from Competition",
      "Building Customer Trust",
      "Brand Consistency",
      "Professional Appearance",
      "Added Value for Products",
    ],
    process: [
      "Research & Brand Understanding",
      "Creative Concept Development",
      "Core Identity Design",
      "Identity Application on Materials",
      "Brand Guidelines Delivery",
    ],
    caseStudies: [
      {
        title: "Complete Brand Redesign",
        client: "Cairo Eats",
        challenge: "تحديث الـ Visual Identity عشان تناسب Expansion والتطور",
        solution: "تصميم New Visual Identity تجمع بين Authenticity والـ Modernity",
        results: [
          "200% ارتفاع في Brand Awareness",
          "تحسين Customer Experience",
          "نجاح التوسع في 3 Branches جديدة",
        ],
      },
    ],
  },
  {
    id: "digital-strategy",
    icon: Lightbulb,
    title: "Digital Strategy",
    shortDescription: "Growth Plan شاملة للـ Digital Transformation - بنحلل السوق ونحط Strategy تحقق أهدافك",
    fullDescription: "4Creative بتساعدك ترسم Clear Roadmap للـ Digital Transformation. بنحلل Current Situation بتاعك، نفهم الـ Goals، ونحط Integrated Strategy تشمل كل جوانب الـ Digital Presence. من Market Analysis لـ Growth Plans، بنكون Partner بتاعك في رحلة التحول.",
    features: ["Market Analysis", "Growth Strategy", "Digital Consulting", "Competitor Analysis", "Digital Roadmap", "Process Optimization"],
    benefits: [
      "Clear Future Vision",
      "Data-Driven Decisions",
      "Optimal Resource Utilization",
      "Competitive Advantage",
      "Sustainable Growth",
    ],
    process: [
      "Comprehensive Current State Analysis",
      "Market & Competitor Research",
      "Goals & KPIs Definition",
      "Strategy Development",
      "Execution & Monitoring",
    ],
    caseStudies: [
      {
        title: "Full Digital Transformation Plan",
        client: "Traditional Retail Business",
        challenge: "التحول من Traditional Business Model لـ Integrated Digital Model",
        solution: "Phased Digital Transformation Strategy مع Team Training",
        results: [
          "300% زيادة في Digital Revenue",
          "40% تخفيض في Operational Costs",
          "بناء Professional Digital Team",
        ],
      },
    ],
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};
