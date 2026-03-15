import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Upload, Image } from "lucide-react";
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
  const [uploading, setUploading] = useState(false);
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

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      toast({ title: "خطأ في رفع الصورة", description: error.message, variant: "destructive" });
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }, [toast]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) setEditing({ ...editing, image: url });
    setUploading(false);
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      const markdownImage = `\n![${file.name}](${url})\n`;
      setEditing({ ...editing, content: (editing.content || "") + markdownImage });
      toast({ title: "تم إدراج الصورة ✅" });
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleContentDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length === 0 || !editing) return;
    
    setUploading(true);
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) {
        const markdownImage = `\n![${file.name}](${url})\n`;
        setEditing(prev => prev ? { ...prev, content: (prev.content || "") + markdownImage } : prev);
      }
    }
    setUploading(false);
    toast({ title: `تم رفع ${files.length} صورة ✅` });
  };

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
        <Button onClick={startNew} className="gap-2"><Plus className="w-4 h-4" /> مدونة جديدة</Button>
      </div>

      {editing && (
        <div className="glass-card p-6 rounded-2xl mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{editingId ? "تعديل المدونة" : "مدونة جديدة"}</h2>
            <Button variant="ghost" size="icon" onClick={() => { setEditing(null); setEditingId(null); }}><X className="w-5 h-5" /></Button>
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

          {/* Cover Image Upload */}
          <div>
            <label className="text-sm font-medium mb-1 block">صورة الغلاف</label>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <Input value={editing.image ?? ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://... أو ارفع صورة" />
              </div>
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                <Button type="button" variant="outline" className="gap-2" asChild disabled={uploading}>
                  <span><Upload className="w-4 h-4" /> {uploading ? "جاري الرفع..." : "رفع صورة"}</span>
                </Button>
              </label>
            </div>
            {editing.image && (
              <img src={editing.image} alt="Cover preview" className="mt-2 h-32 rounded-lg object-cover" />
            )}
          </div>

          {/* Content with drag-drop */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium">المحتوى (Markdown)</label>
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleInlineImageUpload} className="hidden" />
                <Button type="button" variant="ghost" size="sm" className="gap-1 text-xs" asChild>
                  <span><Image className="w-3 h-3" /> إدراج صورة</span>
                </Button>
              </label>
            </div>
            <Textarea
              value={editing.content ?? ""}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              rows={12}
              className="font-mono text-sm"
              onDrop={handleContentDrop}
              onDragOver={(e) => e.preventDefault()}
              placeholder="اكتب المحتوى هنا... يمكنك سحب وإفلات الصور مباشرة"
            />
            {uploading && <p className="text-xs text-muted-foreground mt-1">جاري رفع الصورة...</p>}
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
              <label className="text-sm font-medium mb-1 block">الكاتب</label>
              <Input value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
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
                  <td className="p-4"><span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{post.category}</span></td>
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
                      <Button variant="ghost" size="icon" onClick={() => startEdit(post)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(post.id)}><Trash2 className="w-4 h-4" /></Button>
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
