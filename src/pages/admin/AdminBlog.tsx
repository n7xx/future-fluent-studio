import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];

const categories = ["Digital Marketing", "Branding", "Social Media", "Web Development", "Content Marketing", "Paid Advertising"];

const emptyPost: BlogPostInsert = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Digital Marketing",
  author: "4Creative",
  image: "",
  tags: [],
  read_time: "5 دقائق",
  published: false,
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPostInsert | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const postData = { ...editing, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };

    if (editingId) {
      const { error } = await supabase.from("blog_posts").update(postData).eq("id", editingId);
      if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
      toast({ title: "تم التحديث بنجاح ✅" });
    } else {
      const { error } = await supabase.from("blog_posts").insert(postData);
      if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
      toast({ title: "تم إضافة المدونة بنجاح ✅" });
    }

    setEditing(null);
    setEditingId(null);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
    toast({ title: "تم الحذف ✅" });
    fetchPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
    fetchPosts();
  };

  const startEdit = (post: BlogPost) => {
    setEditing({ ...post });
    setEditingId(post.id);
    setTagsInput(post.tags.join(", "));
  };

  const startNew = () => {
    setEditing({ ...emptyPost });
    setEditingId(null);
    setTagsInput("");
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">إدارة المدونات</h1>
        <Button onClick={startNew} className="gap-2">
          <Plus className="w-4 h-4" /> مدونة جديدة
        </Button>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="glass-card p-6 rounded-2xl mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{editingId ? "تعديل المدونة" : "مدونة جديدة"}</h2>
            <Button variant="ghost" size="icon" onClick={() => { setEditing(null); setEditingId(null); }}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">العنوان</label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Slug (رابط المدونة)</label>
              <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="my-blog-post" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">الملخص</label>
            <Textarea value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">المحتوى (Markdown)</label>
            <Textarea value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={10} className="font-mono text-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">التصنيف</label>
              <select
                value={editing.category ?? ""}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full p-2 rounded-lg border border-border bg-background"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">وقت القراءة</label>
              <Input value={editing.read_time ?? ""} onChange={(e) => setEditing({ ...editing, read_time: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">رابط الصورة</label>
              <Input value={editing.image ?? ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">التاجات (مفصولة بفاصلة)</label>
            <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="SEO, Marketing, Branding" />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave}>حفظ</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setEditingId(null); }}>إلغاء</Button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right p-4 font-medium text-muted-foreground">العنوان</th>
                <th className="text-right p-4 font-medium text-muted-foreground">التصنيف</th>
                <th className="text-right p-4 font-medium text-muted-foreground">الحالة</th>
                <th className="text-right p-4 font-medium text-muted-foreground">التاريخ</th>
                <th className="text-right p-4 font-medium text-muted-foreground">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">لا توجد مدونات بعد. أضف أول مدونة!</td></tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-4 font-medium max-w-[200px] truncate">{post.title}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{post.category}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${post.published ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                      {post.published ? "منشور" : "مسودة"}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(post.created_at).toLocaleDateString("ar-EG")}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => togglePublish(post)} title={post.published ? "إخفاء" : "نشر"}>
                        {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => startEdit(post)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
