import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Calendar, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts as staticBlogPosts } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPageContent } from "@/data/content";

interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const BlogPage = () => {
  const navigate = useNavigate();
  const { lang, isRTL } = useLanguage();
  const c = blogPageContent[lang];
  const [activeCategory, setActiveCategory] = useState(c.categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
      if (error || !data || data.length === 0) {
        setPosts(staticBlogPosts.map(p => ({ id: p.id, title: p.title, excerpt: p.excerpt, category: p.category, author: p.author, date: p.date, readTime: p.readTime, image: p.image, tags: p.tags })));
      } else {
        setPosts(data.map(p => ({ id: p.slug || p.id, title: p.title, excerpt: p.excerpt, category: p.category, author: p.author, date: p.created_at, readTime: p.read_time, image: p.image, tags: p.tags })));
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const allCategory = c.categories[0];
  const getCategoryCount = (category: string) => {
    if (category === allCategory) return posts.length;
    return posts.filter(post => post.category === category).length;
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === allCategory || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href="https://4creative.agency/blog" />
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6">
          <motion.button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <BackArrow className="w-5 h-5" />
            <span>{c.backButton}</span>
          </motion.button>
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-primary font-bold text-lg mb-4">{c.heroTag}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="block">{c.heroTitle1}</span>
              <span className="block gradient-text">{c.heroTitle2}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{c.heroDesc}</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder={c.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-12 bg-background/50" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 relative">
        <div className="container mx-auto px-6">
          <motion.div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {c.categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-2 ${activeCategory === category ? "bg-primary text-primary-foreground shadow-lg" : "glass hover:bg-primary/20"}`}>
                {category}
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${activeCategory === category ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/20 text-primary"}`}>{getCategoryCount(category)}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : filteredPosts.length === 0 ? (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p className="text-xl text-muted-foreground">{c.noResults}</p></motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article key={post.id} className="glass-card rounded-2xl overflow-hidden group cursor-pointer" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -10 }} onClick={() => navigate(`/blog/${post.id}`)}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-primary/90 text-primary-foreground">{post.category}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</span></div>
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{post.readTime}</span></div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map((tag) => (<span key={tag} className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">{tag}</span>))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div className="glass-card p-12 rounded-2xl text-center relative overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
              <p className="text-xl text-muted-foreground mb-8">{c.ctaDesc}</p>
              <motion.button onClick={() => navigate("/start-project")} className="btn-primary text-lg px-8 py-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{c.ctaButton}</motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
