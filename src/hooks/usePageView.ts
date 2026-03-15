import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    supabase.from("page_views").insert({
      page: location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    }).then(() => {});
  }, [location.pathname]);
}
