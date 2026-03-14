import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MailOpen, Trash2, Phone, Briefcase, DollarSign } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Message = Database["public"]["Tables"]["contact_messages"]["Row"];

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markAsRead = async (msg: Message) => {
    await supabase.from("contact_messages").update({ read: true }).eq("id", msg.id);
    setSelected({ ...msg, read: true });
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    toast({ title: "تم حذف الرسالة ✅" });
    fetchMessages();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">الرسائل الواردة</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-sm text-muted-foreground">{messages.filter(m => !m.read).length} رسالة جديدة</p>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="p-6 text-center text-muted-foreground">لا توجد رسائل</p>
            ) : messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.read) markAsRead(msg); }}
                className={`p-4 border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors ${
                  selected?.id === msg.id ? "bg-primary/5" : ""
                } ${!msg.read ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!msg.read ? <Mail className="w-4 h-4 text-primary" /> : <MailOpen className="w-4 h-4 text-muted-foreground" />}
                  <span className="font-medium text-sm truncate">{msg.name}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(msg.created_at).toLocaleDateString("ar-EG")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(selected.id)}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${selected.phone}`} className="text-primary hover:underline">{selected.phone}</a>
                  </div>
                )}
                {selected.service && (
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{selected.service}</span>
                  </div>
                )}
                {selected.budget && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>{selected.budget}</span>
                  </div>
                )}
              </div>

              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                {new Date(selected.created_at).toLocaleString("ar-EG")}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>اختر رسالة لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
