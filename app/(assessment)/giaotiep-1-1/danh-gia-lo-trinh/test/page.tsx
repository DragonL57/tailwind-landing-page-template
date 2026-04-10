"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AIAssessment from "@/components/giaotiep-1-1/ai-assessment";

export default function TestPage() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("[GA4] Page view:", pathname);
    setMounted(true);
  }, [pathname]);

  if (!mounted) return null;

  return <AIAssessment />;
}