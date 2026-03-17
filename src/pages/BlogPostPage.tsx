import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPostById, blogPosts } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPageContent } from "@/data/content";

interface PostData {
  id: string; title: string; excerpt: string; content: string; category: string; author: string; date: string; readTime: string; image: string; tags: string[];
}

const BlogPostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { lang, isRTL } = useLanguage();
  const c = blogPageContent[lang];
  const [post, setPost] = useState<PostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("blog_posts").select("*").or(`slug.eq.${postId},id.eq.${postId}`).eq("published", true).maybeSingle();
      if (data) {
        const p: PostData = { id: data.slug || data.id, title: data.title, excerpt: data.excerpt, content: data.content, category: data.category, author: data.author, date: data.created_at, readTime: data.read_time, image: data.image, tags: data.tags };
        setPost(p);
        const { data: related } = await supabase.from("blog_posts").select("*").eq("published", true).eq("category", data.category).neq("id", data.id).limit(3);
        if (related && related.length > 0) {
          setRelatedPosts(related.map(r => ({ id: r.slug || r.id, title: r.title, excerpt: r.excerpt, content: r.content, category: r.category, author: r.author, date: r.created_at, readTime: r.read_time, image: r.image, tags: r.tags })));
        }
      } else {
        const staticPost = getBlogPostById(postId || "");
        if (staticPost) {
          setPost(staticPost);
          setRelatedPosts(blogPosts.filter(p => p.id !== staticPost.id && p.category === staticPost.category).slice(0, 3));
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [postId]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!post) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">{c.notFound}</h1><button onClick={() => navigate("/blog")} className="btn-primary">{c.backToBlogBtn}</button></div></div>;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{post.title} | 4Creative Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://4creative.agency/blog/${post.id}`} />
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-8 relative">
        <div className="container mx-auto px-6">
          <motion.button onClick={() => navigate("/blog")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <BackArrow className="w-5 h-5" />
            <span>{c.backToBlog}</span>
          </motion.button>
          <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{post.author}</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{post.readTime}</span></div>
            </div>
            <div className="rounded-2xl overflow-hidden mb-12">
              <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-foreground leading-relaxed space-y-6 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pr-6 [&>ul]:text-muted-foreground [&>ol]:list-decimal [&>ol]:pr-6 [&>ol]:text-muted-foreground [&>li]:mb-2 [&>strong]:text-primary [&>a]:text-primary [&>a]:underline [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/30">
              {post.tags.map((tag) => (<span key={tag} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">{tag}</span>))}
            </div>
            <div className="flex items-center gap-4 mt-8">
              <span className="text-muted-foreground flex items-center gap-2"><Share2 className="w-5 h-5" /> {c.shareArticle}</span>
              <div className="flex gap-3">
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"><Twitter className="w-5 h-5 text-primary" /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"><Facebook className="w-5 h-5 text-primary" /></a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"><Linkedin className="w-5 h-5 text-primary" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">{c.relatedPosts}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article key={relatedPost.id} className="glass-card rounded-xl overflow-hidden group cursor-pointer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} onClick={() => navigate(`/blog/${relatedPost.id}`)}>
                  <div className="h-32 overflow-hidden"><img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" /></div>
                  <div className="p-4"><h3 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2">{relatedPost.title}</h3><span className="text-xs text-muted-foreground">{relatedPost.readTime}</span></div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div className="glass-card p-12 rounded-2xl text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-4">{c.ctaPostTitle}</h2>
            <p className="text-muted-foreground mb-6">{c.ctaPostDesc}</p>
            <motion.button onClick={() => navigate("/start-project")} className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{c.ctaPostButton}</motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
