// Bilingual content for the entire website

export const navContent = {
  ar: {
    items: [
      { label: "الرئيسية", href: "/", isPage: true },
      { label: "من نحن", href: "/about", isPage: true },
      { label: "خدماتنا", href: "/services", isPage: true },
      { label: "أعمالنا", href: "/portfolio", isPage: true },
      { label: "المدونة", href: "/blog", isPage: true },
      { label: "تواصل معنا", href: "/#contact", isPage: false },
    ],
    startProject: "ابدأ مشروعك",
    lightMode: "تفعيل الوضع الفاتح",
    darkMode: "تفعيل الوضع الداكن",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    homepageAria: "الصفحة الرئيسية - 4Creative",
    mainNav: "التنقل الرئيسي",
    mobileNav: "القائمة المتنقلة",
  },
  en: {
    items: [
      { label: "Home", href: "/", isPage: true },
      { label: "About", href: "/about", isPage: true },
      { label: "Services", href: "/services", isPage: true },
      { label: "Portfolio", href: "/portfolio", isPage: true },
      { label: "Blog", href: "/blog", isPage: true },
      { label: "Contact", href: "/#contact", isPage: false },
    ],
    startProject: "Start Project",
    lightMode: "Switch to Light Mode",
    darkMode: "Switch to Dark Mode",
    openMenu: "Open Menu",
    closeMenu: "Close Menu",
    homepageAria: "Homepage - 4Creative",
    mainNav: "Main Navigation",
    mobileNav: "Mobile Navigation",
  },
};

export const heroContent = {
  ar: {
    badge: "4Creative | Digital Marketing Agency في مصر",
    headline1: "البراند بتاعك",
    headline2: "يستاهل يكبر",
    subheadline: "إحنا في 4Creative بنبني لك Marketing System كامل - من Website Development لـ Social Media Management لـ Branding. مش بوستات وخلاص، إحنا بنشتغل Results!",
    ctaPrimary: "ابدأ مشروعك مع 4Creative",
    ctaSecondary: "شوف أعمالنا",
    stats: [
      { number: "+150", label: "مشروع ناجح مع 4Creative" },
      { number: "+50", label: "براند اتحول معانا" },
      { number: "+5", label: "سنين في السوق المصري" },
    ],
    ctaLinks: "روابط سريعة",
    statsAria: "إحصائيات 4Creative",
  },
  en: {
    badge: "4Creative | Digital Marketing Agency in Egypt",
    headline1: "Your Brand",
    headline2: "Deserves to Grow",
    subheadline: "At 4Creative, we build a complete Marketing System for you — from Website Development to Social Media Management to Branding. Not just posts, we deliver Results!",
    ctaPrimary: "Start Your Project with 4Creative",
    ctaSecondary: "View Our Work",
    stats: [
      { number: "+150", label: "Successful Projects" },
      { number: "+50", label: "Brands Transformed" },
      { number: "+5", label: "Years in the Market" },
    ],
    ctaLinks: "Quick Links",
    statsAria: "4Creative Statistics",
  },
};

export const aboutContent = {
  ar: {
    tag: "مين 4Creative؟",
    title1: "Creative Agency",
    title2: "بتفهم السوق المصري",
    p1: "أغلب البراندات بتصرف على Marketing ومفيش نتيجة... المشكلة مش في الإعلانات، المشكلة في الـ Strategy! إحنا في 4Creative بنبني لك Digital Marketing System كامل مش حملات مؤقتة. ده اللي بيخلي النتيجة تكبر مع الوقت.",
    p2: "من Website Development لـ Social Media Management لـ Video Production لـ Branding - كل حاجة تحت سقف واحد. فريق 4Creative فاهم السوق المصري وبيتكلم لغة الناس.",
    cta: "اكتشف خدمات 4Creative",
    features: [
      { title: "رؤية 4Creative", description: "نبني Creative Agency تبقى Reference في السوق المصري للـ Digital Marketing والـ Branding" },
      { title: "مهمتنا", description: "نحول البراندات من مجرد اسم لـ Brand يفضل في دماغ الناس ويحقق Sales" },
      { title: "Performance First", description: "مش بنعمل حاجات حلوة وبس - إحنا بنشتغل على Results قابلة للقياس" },
      { title: "فريق 4Creative", description: "Designers، Developers، Marketers، وContent Creators تحت سقف واحد" },
    ],
  },
  en: {
    tag: "Who is 4Creative?",
    title1: "Creative Agency",
    title2: "That Understands the Egyptian Market",
    p1: "Most brands spend on Marketing with no results... The problem isn't the ads, it's the Strategy! At 4Creative, we build a complete Digital Marketing System, not temporary campaigns. That's what makes results grow over time.",
    p2: "From Website Development to Social Media Management to Video Production to Branding — everything under one roof. The 4Creative team understands the Egyptian market and speaks the people's language.",
    cta: "Discover 4Creative Services",
    features: [
      { title: "4Creative Vision", description: "Building a Creative Agency that becomes the reference in the Egyptian market for Digital Marketing and Branding" },
      { title: "Our Mission", description: "Transforming brands from just a name to a Brand that sticks in people's minds and drives Sales" },
      { title: "Performance First", description: "We don't just make things look good — we work on measurable Results" },
      { title: "4Creative Team", description: "Designers, Developers, Marketers, and Content Creators under one roof" },
    ],
  },
};

export const servicesContent = {
  ar: {
    tag: "خدمات 4Creative",
    title1: "Full-Service",
    title2: "Digital Agency",
    subtitle: "كل اللي البراند بتاعك محتاجه تحت سقف واحد - Website، Marketing، Branding، وContent",
    discoverMore: "اكتشف المزيد",
    viewAll: "اكتشف كل خدمات 4Creative",
    services: [
      { id: "web-development", title: "Website Development", description: "4Creative بتبني لك Website يبيع مش مجرد شكل حلو. مواقع سريعة، متجاوبة، ومحسّنة للـ SEO", features: ["Responsive Design", "UX متميز", "SEO Ready"] },
      { id: "digital-marketing", title: "Digital Marketing", description: "Performance Marketing مش بوستات وخلاص! Paid Ads، SEO، وSocial Media Management بنتائج ملموسة", features: ["Meta & Google Ads", "SEO", "Analytics"] },
      { id: "content-creation", title: "Content Creation", description: "Content يتكلم بلغة جمهورك ويحقق Engagement حقيقي. تصوير، كتابة، وإدارة محتوى", features: ["Copywriting", "Photography", "Content Strategy"] },
      { id: "video-motion", title: "Video Production", description: "4Creative بتنتج فيديوهات تجذب الانتباه وتحقق Views. Reels، Motion Graphics، وAds", features: ["Video Editing", "Motion Graphics", "Ads Production"] },
      { id: "design-branding", title: "Branding & Design", description: "Branding يخلي الناس تفتكرك بسهولة. هوية بصرية متكاملة تميزك عن المنافسين", features: ["Logo Design", "Brand Identity", "Packaging"] },
      { id: "digital-strategy", title: "Digital Strategy", description: "خطة Growth شاملة للتحول الرقمي. بنحلل السوق ونحط Strategy تحقق أهدافك", features: ["Market Analysis", "Growth Plan", "Consulting"] },
    ],
  },
  en: {
    tag: "4Creative Services",
    title1: "Full-Service",
    title2: "Digital Agency",
    subtitle: "Everything your brand needs under one roof — Website, Marketing, Branding, and Content",
    discoverMore: "Learn More",
    viewAll: "Explore All 4Creative Services",
    services: [
      { id: "web-development", title: "Website Development", description: "4Creative builds Websites that sell, not just look pretty. Fast, responsive, and SEO-optimized", features: ["Responsive Design", "Premium UX", "SEO Ready"] },
      { id: "digital-marketing", title: "Digital Marketing", description: "Performance Marketing, not just posts! Paid Ads, SEO, and Social Media Management with measurable results", features: ["Meta & Google Ads", "SEO", "Analytics"] },
      { id: "content-creation", title: "Content Creation", description: "Content that speaks your audience's language and drives real Engagement. Photography, writing, and content management", features: ["Copywriting", "Photography", "Content Strategy"] },
      { id: "video-motion", title: "Video Production", description: "4Creative produces videos that grab attention and drive Views. Reels, Motion Graphics, and Ads", features: ["Video Editing", "Motion Graphics", "Ads Production"] },
      { id: "design-branding", title: "Branding & Design", description: "Branding that makes people remember you instantly. A complete visual identity that sets you apart", features: ["Logo Design", "Brand Identity", "Packaging"] },
      { id: "digital-strategy", title: "Digital Strategy", description: "Comprehensive Growth Plan for digital transformation. We analyze the market and create a Strategy to achieve your goals", features: ["Market Analysis", "Growth Plan", "Consulting"] },
    ],
  },
};

export const portfolioContent = {
  ar: {
    tag: "4Creative Portfolio",
    title1: "Success Stories",
    title2: "من شغل 4Creative",
    subtitle: "Projects بتعكس الـ Quality والـ Creativity بتاع فريق 4Creative",
    viewAll: "شوف كل أعمال 4Creative",
    categories: ["الكل", "Website Development", "Marketing Campaigns", "Video Production", "Branding"],
    projects: [
      { title: "Fashion E-commerce Platform", category: "Website Development", description: "4Creative بنت E-commerce متكامل بـ Smooth UX وConversion-Optimized Design" },
      { title: "Product Launch Campaign", category: "Marketing Campaigns", description: "Integrated Digital Campaign حققت 300% ROI" },
      { title: "Motion Graphics Video", category: "Video Production", description: "Explainer Video بـ Creative Style حقق 1M+ Views" },
      { title: "Restaurant Brand Identity", category: "Branding", description: "Complete Visual Identity Design بتعكس الـ Premium Feel" },
      { title: "Educational Platform", category: "Website Development", description: "E-learning Platform متكاملة بـ 10K+ Active Users" },
      { title: "Ramadan Marketing Campaign", category: "Marketing Campaigns", description: "Seasonal Campaign حققت أعلى Sales في تاريخ الـ Brand" },
    ],
  },
  en: {
    tag: "4Creative Portfolio",
    title1: "Success Stories",
    title2: "by 4Creative",
    subtitle: "Projects reflecting the Quality and Creativity of the 4Creative team",
    viewAll: "View All 4Creative Work",
    categories: ["All", "Website Development", "Marketing Campaigns", "Video Production", "Branding"],
    projects: [
      { title: "Fashion E-commerce Platform", category: "Website Development", description: "4Creative built a full E-commerce with Smooth UX and Conversion-Optimized Design" },
      { title: "Product Launch Campaign", category: "Marketing Campaigns", description: "Integrated Digital Campaign achieving 300% ROI" },
      { title: "Motion Graphics Video", category: "Video Production", description: "Explainer Video with Creative Style achieving 1M+ Views" },
      { title: "Restaurant Brand Identity", category: "Branding", description: "Complete Visual Identity Design reflecting Premium Feel" },
      { title: "Educational Platform", category: "Website Development", description: "Complete E-learning Platform with 10K+ Active Users" },
      { title: "Ramadan Marketing Campaign", category: "Marketing Campaigns", description: "Seasonal Campaign achieving highest Sales in Brand history" },
    ],
  },
};

export const processContent = {
  ar: {
    tag: "طريقة شغل 4Creative",
    title1: "Our Process",
    title2: "من الفكرة للنتيجة",
    subtitle: "5 خطوات واضحة بنمشي فيها مع كل Client عشان نضمن أفضل Results",
    steps: [
      { number: "01", title: "Discovery & Research", description: "بنبدأ نفهم البراند بتاعك، الـ Target Audience، والـ Competition. كل حاجة بالـ Data" },
      { number: "02", title: "Strategy & Planning", description: "بنحط خطة شغل واضحة مع Milestones وDeadlines محددة. عشان تعرف إيه اللي هيحصل" },
      { number: "03", title: "Creative Execution", description: "فريق 4Creative بيشتغل على التنفيذ - Design، Development، Content - بأعلى Quality" },
      { number: "04", title: "Launch & Delivery", description: "بنعمل Testing شامل وبعدين Launch. بنتأكد إن كل حاجة شغالة زي الفل" },
      { number: "05", title: "Optimization & Growth", description: "الشغل مبيخلصش عند الـ Launch. بنتابع الـ Performance ونعمل Optimization مستمر" },
    ],
  },
  en: {
    tag: "How 4Creative Works",
    title1: "Our Process",
    title2: "From Idea to Results",
    subtitle: "5 clear steps we follow with every Client to ensure the best Results",
    steps: [
      { number: "01", title: "Discovery & Research", description: "We start by understanding your brand, Target Audience, and Competition. Everything is Data-driven" },
      { number: "02", title: "Strategy & Planning", description: "We create a clear work plan with defined Milestones and Deadlines. So you know what to expect" },
      { number: "03", title: "Creative Execution", description: "The 4Creative team executes — Design, Development, Content — at the highest Quality" },
      { number: "04", title: "Launch & Delivery", description: "We perform comprehensive Testing then Launch. Making sure everything works perfectly" },
      { number: "05", title: "Optimization & Growth", description: "Work doesn't stop at Launch. We monitor Performance and continuously Optimize" },
    ],
  },
};

export const whyUsContent = {
  ar: {
    tag: "ليه 4Creative؟",
    title1: "اللي بيميزنا",
    title2: "عن باقي الـ Agencies",
    reasons: [
      { title: "Full-Service Team", description: "Designers، Developers، Marketers، وContent Creators - كل اللي محتاجه في مكان واحد" },
      { title: "Creative Solutions", description: "4Creative مش بتعمل الـ Standard - بنفكر Creative ونقدم حلول تميزك عن المنافسين" },
      { title: "Data-Driven Results", description: "كل حاجة بنعملها Measurable. بنشتغل بـ KPIs ونتائج تقدر تشوفها" },
      { title: "Deadline Commitment", description: "في 4Creative الـ Deadline مقدس. بنسلم في الوقت المتفق عليه" },
      { title: "Long-term Partnership", description: "مش عايزين مشروع ونمشي - بنبني شراكات حقيقية مع البراندات اللي بنشتغل معاها" },
    ],
  },
  en: {
    tag: "Why 4Creative?",
    title1: "What Sets Us",
    title2: "Apart from Other Agencies",
    reasons: [
      { title: "Full-Service Team", description: "Designers, Developers, Marketers, and Content Creators — everything you need in one place" },
      { title: "Creative Solutions", description: "4Creative doesn't do the Standard — we think Creative and deliver solutions that differentiate you" },
      { title: "Data-Driven Results", description: "Everything we do is Measurable. We work with KPIs and results you can see" },
      { title: "Deadline Commitment", description: "At 4Creative, Deadlines are sacred. We deliver on time, every time" },
      { title: "Long-term Partnership", description: "We don't want a project and leave — we build real partnerships with the brands we work with" },
    ],
  },
};

export const testimonialsContent = {
  ar: {
    tag: "Client Reviews",
    title1: "براندات اتحولت",
    title2: "مع 4Creative",
    clientsLabel: "Brands اشتغلنا معاها في 4Creative",
    testimonials: [
      { name: "أحمد سامي", role: "CEO", company: "TechStart Egypt", content: "4Creative غيروا كل حاجة! الـ Website الجديد ضاعف الـ Leads بتاعتنا 3 مرات. فريق Professional جداً وفاهمين الـ Digital Marketing صح.", rating: 5 },
      { name: "نورا حسن", role: "Marketing Director", company: "Fashion House", content: "اشتغلنا مع 4Creative على الـ Social Media والـ Paid Ads. النتيجة؟ 200% زيادة في المبيعات في 3 شهور! Highly Recommended.", rating: 5 },
      { name: "محمد عادل", role: "Founder", company: "EduPlatform", content: "أحسن Agency اتعاملت معاها. بيفهموا الـ Brand وبيشتغلوا بجد. الـ Branding اللي عملوهولنا خلى الناس تعرفنا من أول نظرة.", rating: 5 },
    ],
  },
  en: {
    tag: "Client Reviews",
    title1: "Brands Transformed",
    title2: "with 4Creative",
    clientsLabel: "Brands we've worked with at 4Creative",
    testimonials: [
      { name: "Ahmed Sami", role: "CEO", company: "TechStart Egypt", content: "4Creative changed everything! The new Website tripled our Leads. Very Professional team who truly understand Digital Marketing.", rating: 5 },
      { name: "Noura Hassan", role: "Marketing Director", company: "Fashion House", content: "We worked with 4Creative on Social Media and Paid Ads. The result? 200% increase in sales in 3 months! Highly Recommended.", rating: 5 },
      { name: "Mohamed Adel", role: "Founder", company: "EduPlatform", content: "Best Agency I've ever worked with. They understand the Brand and work hard. The Branding they did for us made people recognize us at first glance.", rating: 5 },
    ],
  },
};

export const faqContent = {
  ar: {
    tag: "FAQs",
    title1: "أسئلة شائعة",
    title2: "عن 4Creative",
    subtitle: "كل اللي محتاج تعرفه عن خدمات 4Creative وطريقة شغلنا",
    moreQuestion: "عندك سؤال تاني؟",
    contactCta: "تواصل مع فريق 4Creative",
    faqs: [
      { question: "إيه الخدمات اللي بتقدمها 4Creative؟", answer: "4Creative بتقدم Full Digital Marketing Services تشمل Website Development، Social Media Management، Branding، Content Creation، Video Production، Paid Advertising على Meta وGoogle، وDigital Strategy. كل حاجة البراند بتاعك محتاجها تحت سقف واحد." },
      { question: "كام بتاخد وقت عشان تبني Website مع 4Creative؟", answer: "الـ Timeline بيختلف حسب حجم المشروع. Simple Website بياخد من 2-4 أسابيع، E-commerce Store من 4-8 أسابيع، وCustom Web Applications ممكن تاخد 8-12 أسبوع." },
      { question: "هل 4Creative بتشتغل مع Startups ولا الشركات الكبيرة بس؟", answer: "بنشتغل مع كل الـ Sizes! من Startups لـ SMEs للشركات الكبيرة. عندنا Packages مختلفة تناسب كل Budget." },
      { question: "إيه الفرق بين 4Creative وباقي الـ Agencies؟", answer: "4Creative بتركز على Results مش مجرد Deliverables. بنشتغل Data-Driven ونقيس كل حاجة بـ KPIs واضحة. كمان فريقنا Full In-House." },
      { question: "إزاي أبدأ مشروع مع 4Creative؟", answer: "الموضوع بسيط! تقدر تملأ الـ Form في صفحة 'ابدأ مشروعك' أو تكلمنا على WhatsApp أو تحجز Meeting مباشرة." },
    ],
  },
  en: {
    tag: "FAQs",
    title1: "Frequently Asked",
    title2: "Questions about 4Creative",
    subtitle: "Everything you need to know about 4Creative services and how we work",
    moreQuestion: "Have another question?",
    contactCta: "Contact the 4Creative Team",
    faqs: [
      { question: "What services does 4Creative offer?", answer: "4Creative offers Full Digital Marketing Services including Website Development, Social Media Management, Branding, Content Creation, Video Production, Paid Advertising on Meta and Google, and Digital Strategy. Everything your brand needs under one roof." },
      { question: "How long does it take to build a Website with 4Creative?", answer: "The Timeline varies depending on the project size. A Simple Website takes 2-4 weeks, an E-commerce Store 4-8 weeks, and Custom Web Applications can take 8-12 weeks." },
      { question: "Does 4Creative work with Startups or only large companies?", answer: "We work with all Sizes! From Startups to SMEs to large corporations. We have different Packages to fit every Budget." },
      { question: "What makes 4Creative different from other Agencies?", answer: "4Creative focuses on Results, not just Deliverables. We work Data-Driven and measure everything with clear KPIs. Plus, our team is fully In-House." },
      { question: "How do I start a project with 4Creative?", answer: "It's simple! You can fill out the Form on the 'Start Project' page, contact us on WhatsApp, or book a Meeting directly." },
    ],
  },
};

export const ctaContent = {
  ar: {
    title1: "جاهز تكبر البراند",
    title2: "مع 4Creative؟",
    subtitle: "سواء محتاج Website، Digital Marketing، أو Branding كامل - فريق 4Creative جاهز يحول رؤيتك لواقع. احجز مكالمة مع فريقنا النهاردة!",
    cta: "ابدأ مشروعك مع 4Creative",
  },
  en: {
    title1: "Ready to Grow Your Brand",
    title2: "with 4Creative?",
    subtitle: "Whether you need a Website, Digital Marketing, or full Branding — the 4Creative team is ready to turn your vision into reality. Book a call with our team today!",
    cta: "Start Your Project with 4Creative",
  },
};

export const contactContent = {
  ar: {
    tag: "تواصل معنا",
    title1: "جاهز تبدأ مشروعك؟",
    title2: "خلينا نساعدك",
    subtitle: "إحنا هنا علشان نساعدك تبني حضور رقمي قوي. سواء كنت بتبدأ من الصفر أو عايز تطور اللي عندك، فريقنا جاهز يشتغل معاك خطوة بخطوة.",
    formTitle: "ابعت لنا طلبك",
    name: "اسمك",
    phone: "رقم الموبايل",
    email: "البريد الإلكتروني",
    company: "اسم الشركة أو المشروع",
    selectService: "اختار الخدمة",
    services: [
      { value: "web", label: "تطوير المواقع" },
      { value: "marketing", label: "التسويق الرقمي" },
      { value: "content", label: "صناعة المحتوى" },
      { value: "video", label: "المونتاج والموشن" },
      { value: "design", label: "التصميم والهوية" },
      { value: "strategy", label: "الاستراتيجية الرقمية" },
    ],
    budgetLabel: "الميزانية التقريبية (اختياري)",
    budgets: [
      { value: "small", label: "أقل من 5,000 جنيه" },
      { value: "medium", label: "5,000 - 15,000 جنيه" },
      { value: "large", label: "15,000 - 50,000 جنيه" },
      { value: "enterprise", label: "أكثر من 50,000 جنيه" },
    ],
    messagePlaceholder: "احكيلنا عن مشروعك...",
    submit: "ابعت طلبك",
    altContact: "أو تواصل معانا مباشرة",
    whatsapp: "واتساب",
    bookMeeting: "احجز ميتينج",
    successTitle: "تم إرسال طلبك بنجاح! 🎉",
    successDesc: "هنتواصل معاك في أقرب وقت",
    errorTitle: "حدث خطأ ❌",
    errorDesc: "حاول تاني بعد شوية",
    benefits: [
      { title: "جودة عالية", description: "نلتزم بأعلى معايير الجودة في كل مشروع" },
      { title: "فريق متخصص", description: "خبراء في كل مجال يعملون على مشروعك" },
      { title: "نتائج مضمونة", description: "سجل حافل بالنجاحات مع عملائنا" },
      { title: "التزام بالمواعيد", description: "نسلم مشاريعنا في الوقت المحدد" },
    ],
    trustSignals: [
      { number: "+150", label: "مشروع ناجح" },
      { number: "+50", label: "عميل سعيد" },
      { number: "+5", label: "سنين خبرة" },
      { number: "100%", label: "رضا العملاء" },
    ],
    whyWorkTitle: "ليه تشتغل معانا؟",
    whyWorkItems: [
      "فاهمين السوق المصري وعندنا خبرة كبيرة",
      "فريق متكامل - من التصميم للتطوير للتسويق",
      "نتائج ملموسة تفرق مع مشروعك",
    ],
  },
  en: {
    tag: "Contact Us",
    title1: "Ready to Start Your Project?",
    title2: "Let Us Help You",
    subtitle: "We're here to help you build a strong digital presence. Whether you're starting from scratch or looking to improve, our team is ready to work with you step by step.",
    formTitle: "Send Us Your Request",
    name: "Your Name",
    phone: "Phone Number",
    email: "Email Address",
    company: "Company or Project Name",
    selectService: "Select Service",
    services: [
      { value: "web", label: "Website Development" },
      { value: "marketing", label: "Digital Marketing" },
      { value: "content", label: "Content Creation" },
      { value: "video", label: "Video & Motion" },
      { value: "design", label: "Design & Branding" },
      { value: "strategy", label: "Digital Strategy" },
    ],
    budgetLabel: "Approximate Budget (optional)",
    budgets: [
      { value: "small", label: "Less than $500" },
      { value: "medium", label: "$500 - $1,500" },
      { value: "large", label: "$1,500 - $5,000" },
      { value: "enterprise", label: "More than $5,000" },
    ],
    messagePlaceholder: "Tell us about your project...",
    submit: "Send Request",
    altContact: "Or contact us directly",
    whatsapp: "WhatsApp",
    bookMeeting: "Book Meeting",
    successTitle: "Request sent successfully! 🎉",
    successDesc: "We'll contact you as soon as possible",
    errorTitle: "An error occurred ❌",
    errorDesc: "Please try again later",
    benefits: [
      { title: "High Quality", description: "We commit to the highest quality standards in every project" },
      { title: "Expert Team", description: "Experts in every field working on your project" },
      { title: "Guaranteed Results", description: "A track record of success with our clients" },
      { title: "On-Time Delivery", description: "We deliver our projects on schedule" },
    ],
    trustSignals: [
      { number: "+150", label: "Successful Projects" },
      { number: "+50", label: "Happy Clients" },
      { number: "+5", label: "Years Experience" },
      { number: "100%", label: "Client Satisfaction" },
    ],
    whyWorkTitle: "Why Work With Us?",
    whyWorkItems: [
      "We understand the Egyptian market with deep experience",
      "Full team — from design to development to marketing",
      "Tangible results that make a difference for your project",
    ],
  },
};

export const footerContent = {
  ar: {
    description: "4Creative هي Full-Service Digital Agency في مصر. بنبني Brands تفضل في دماغ الناس من خلال Website Development، Digital Marketing، Branding، وContent Creation.",
    servicesTitle: "خدماتنا",
    linksTitle: "روابط مهمة",
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
    copyright: "كل الحقوق محفوظة.",
    madeWith: "صُنع بـ ❤️ بواسطة فريق 4Creative",
  },
  en: {
    description: "4Creative is a Full-Service Digital Agency in Egypt. We build Brands that stick in people's minds through Website Development, Digital Marketing, Branding, and Content Creation.",
    servicesTitle: "Our Services",
    linksTitle: "Important Links",
    services: [
      { label: "Website Development", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Content Creation", href: "/services/content-creation" },
      { label: "Branding & Design", href: "/services/design-branding" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Start Project", href: "/start-project" },
    ],
    copyright: "All Rights Reserved.",
    madeWith: "Made with ❤️ by the 4Creative Team",
  },
};
