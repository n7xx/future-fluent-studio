import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, ChevronDown, ChevronUp } from "lucide-react";

interface SettingsSection {
  key: string;
  label: string;
  fields: { key: string; label: string; type: "text" | "textarea" }[];
}

const settingsSections: SettingsSection[] = [
  {
    key: "hero",
    label: "القسم الرئيسي (Hero)",
    fields: [
      { key: "badge", label: "النص العلوي (Badge)", type: "text" },
      { key: "title", label: "العنوان الرئيسي", type: "text" },
      { key: "subtitle", label: "العنوان الفرعي", type: "text" },
      { key: "description", label: "الوصف", type: "textarea" },
    ],
  },
  {
    key: "about",
    label: "قسم من نحن (About)",
    fields: [
      { key: "sectionLabel", label: "عنوان القسم", type: "text" },
      { key: "title", label: "العنوان", type: "text" },
      { key: "subtitle", label: "العنوان الفرعي", type: "text" },
      { key: "description1", label: "الفقرة الأولى", type: "textarea" },
      { key: "description2", label: "الفقرة الثانية", type: "textarea" },
    ],
  },
  {
    key: "contact",
    label: "بيانات التواصل",
    fields: [
      { key: "phone", label: "رقم الهاتف", type: "text" },
      { key: "email", label: "البريد الإلكتروني", type: "text" },
      { key: "address", label: "العنوان", type: "text" },
      { key: "whatsapp", label: "رقم الواتساب", type: "text" },
    ],
  },
  {
    key: "footer",
    label: "التذييل (Footer)",
    fields: [
      { key: "description", label: "وصف الشركة", type: "textarea" },
      { key: "copyright", label: "نص الحقوق", type: "text" },
      { key: "madeBy", label: "صُنع بواسطة", type: "text" },
    ],
  },
  {
    key: "cta",
    label: "قسم الدعوة للعمل (CTA)",
    fields: [
      { key: "title", label: "العنوان", type: "text" },
      { key: "description", label: "الوصف", type: "textarea" },
      { key: "buttonText", label: "نص الزر", type: "text" },
    ],
  },
];

const AdminSettings = () => {
  const [allSettings, setAllSettings] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const mapped: Record<string, Record<string, string>> = {};
        data.forEach((s) => {
          mapped[s.key] = (s.value as Record<string, string>) || {};
        });
        setAllSettings(mapped);
        // Expand first section by default
        if (settingsSections.length > 0) {
          setExpandedSections({ [settingsSections[0].key]: true });
        }
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const updateField = (sectionKey: string, fieldKey: string, value: string) => {
    setAllSettings((prev) => ({
      ...prev,
      [sectionKey]: { ...(prev[sectionKey] || {}), [fieldKey]: value },
    }));
  };

  const saveSection = async (key: string) => {
    const value = allSettings[key] || {};
    
    // Check if record exists
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", key)
      .maybeSingle();

    let error;
    if (existing) {
      ({ error } = await supabase.from("site_settings").update({ value }).eq("key", key));
    } else {
      ({ error } = await supabase.from("site_settings").insert({ key, value }));
    }

    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `تم حفظ ${settingsSections.find(s => s.key === key)?.label} ✅` });
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">إعدادات الموقع</h1>

      <div className="space-y-4">
        {settingsSections.map((section) => (
          <div key={section.key} className="glass-card rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
            >
              <h2 className="text-xl font-bold">{section.label}</h2>
              {expandedSections[section.key] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {expandedSections[section.key] && (
              <div className="px-6 pb-6 space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-sm font-medium mb-1 block">{field.label}</label>
                    {field.type === "textarea" ? (
                      <Textarea
                        value={allSettings[section.key]?.[field.key] || ""}
                        onChange={(e) => updateField(section.key, field.key, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={allSettings[section.key]?.[field.key] || ""}
                        onChange={(e) => updateField(section.key, field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                <Button onClick={() => saveSection(section.key)} className="gap-2">
                  <Save className="w-4 h-4" /> حفظ {section.label}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
