import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const [heroSettings, setHeroSettings] = useState({ title: "", subtitle: "", description: "" });
  const [contactSettings, setContactSettings] = useState({ phone: "", email: "", address: "" });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const hero = data.find((s) => s.key === "hero");
        const contact = data.find((s) => s.key === "contact");
        if (hero) setHeroSettings(hero.value as any);
        if (contact) setContactSettings(contact.value as any);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const saveSettings = async (key: string, value: any) => {
    const { error } = await supabase
      .from("site_settings")
      .update({ value })
      .eq("key", key);

    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "تم الحفظ بنجاح ✅" });
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">إعدادات الموقع</h1>

      <div className="space-y-8">
        {/* Hero Section Settings */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold">Hero Section</h2>
          <div>
            <label className="text-sm font-medium mb-1 block">العنوان الرئيسي</label>
            <Input value={heroSettings.title} onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">العنوان الفرعي</label>
            <Input value={heroSettings.subtitle} onChange={(e) => setHeroSettings({ ...heroSettings, subtitle: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">الوصف</label>
            <Textarea value={heroSettings.description} onChange={(e) => setHeroSettings({ ...heroSettings, description: e.target.value })} rows={3} />
          </div>
          <Button onClick={() => saveSettings("hero", heroSettings)} className="gap-2">
            <Save className="w-4 h-4" /> حفظ إعدادات الهيرو
          </Button>
        </div>

        {/* Contact Settings */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold">بيانات التواصل</h2>
          <div>
            <label className="text-sm font-medium mb-1 block">رقم الهاتف</label>
            <Input value={contactSettings.phone} onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">البريد الإلكتروني</label>
            <Input value={contactSettings.email} onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">العنوان</label>
            <Input value={contactSettings.address} onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })} />
          </div>
          <Button onClick={() => saveSettings("contact", contactSettings)} className="gap-2">
            <Save className="w-4 h-4" /> حفظ بيانات التواصل
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
