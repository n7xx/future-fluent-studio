import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, MessageSquare, Eye, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [posts, messages] = await Promise.all([
        supabase.from("blog_posts").select("id, published"),
        supabase.from("contact_messages").select("id, read"),
      ]);

      setStats({
        totalPosts: posts.data?.length ?? 0,
        publishedPosts: posts.data?.filter((p) => p.published).length ?? 0,
        totalMessages: messages.data?.length ?? 0,
        unreadMessages: messages.data?.filter((m) => !m.read).length ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "إجمالي المدونات", value: stats.totalPosts, icon: FileText, color: "text-blue-500" },
    { label: "مدونات منشورة", value: stats.publishedPosts, icon: Eye, color: "text-green-500" },
    { label: "إجمالي الرسائل", value: stats.totalMessages, icon: MessageSquare, color: "text-purple-500" },
    { label: "رسائل جديدة", value: stats.unreadMessages, icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
