import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, MessageSquare, Eye, TrendingUp, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalMessages: 0,
    unreadMessages: 0,
    todayViews: 0,
    totalViews: 0,
  });
  const [viewsChart, setViewsChart] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [posts, messages, totalViews, todayViews, last7Days] = await Promise.all([
        supabase.from("blog_posts").select("id, published"),
        supabase.from("contact_messages").select("id, read"),
        supabase.from("page_views").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true })
          .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
        // Get last 7 days breakdown
        supabase.from("page_views").select("created_at")
          .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .order("created_at", { ascending: true }),
      ]);

      setStats({
        totalPosts: posts.data?.length ?? 0,
        publishedPosts: posts.data?.filter((p) => p.published).length ?? 0,
        totalMessages: messages.data?.length ?? 0,
        unreadMessages: messages.data?.filter((m) => !m.read).length ?? 0,
        todayViews: todayViews.count ?? 0,
        totalViews: totalViews.count ?? 0,
      });

      // Process last 7 days data
      if (last7Days.data) {
        const dayCounts: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
          const key = d.toLocaleDateString("ar-EG", { weekday: "short" });
          dayCounts[key] = 0;
        }
        last7Days.data.forEach((v) => {
          const key = new Date(v.created_at).toLocaleDateString("ar-EG", { weekday: "short" });
          if (key in dayCounts) dayCounts[key]++;
        });
        setViewsChart(Object.entries(dayCounts).map(([date, count]) => ({ date, count })));
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "إجمالي المدونات", value: stats.totalPosts, icon: FileText, color: "text-blue-500" },
    { label: "مدونات منشورة", value: stats.publishedPosts, icon: Eye, color: "text-green-500" },
    { label: "إجمالي الرسائل", value: stats.totalMessages, icon: MessageSquare, color: "text-purple-500" },
    { label: "رسائل جديدة", value: stats.unreadMessages, icon: TrendingUp, color: "text-orange-500" },
    { label: "زيارات اليوم", value: stats.todayViews, icon: BarChart3, color: "text-cyan-500" },
    { label: "إجمالي الزيارات", value: stats.totalViews, icon: BarChart3, color: "text-pink-500" },
  ];

  const maxViews = Math.max(...viewsChart.map(v => v.count), 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      {/* Simple Views Chart */}
      {viewsChart.length > 0 && (
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-6">زيارات آخر 7 أيام</h2>
          <div className="flex items-end gap-3 h-40">
            {viewsChart.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold">{day.count}</span>
                <div
                  className="w-full bg-primary/80 rounded-t-lg transition-all duration-500"
                  style={{ height: `${Math.max((day.count / maxViews) * 100, 4)}%` }}
                />
                <span className="text-xs text-muted-foreground">{day.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
