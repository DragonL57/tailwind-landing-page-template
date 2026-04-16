"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle } from "lucide-react";
import AssessmentHeader from "@/components/giaotiep-1-1/assessment-header";
import Script from "next/script";

// Simple context to share mic status across the flow
const MicContext = createContext<{ hasPermission: boolean }>({ hasPermission: false });

export function useMicStatus() {
  return useContext(MicContext);
}

export default function DanhGiaLoTrinhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasPermission, setHasPermission] = useState(true); // Default to true to avoid flicker
  const [isDenied, setIsDenied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          
          const updateStatus = (state: PermissionState) => {
            setHasPermission(state === 'granted');
            setIsDenied(state === 'denied');
            
            // If on any page other than the landing and permission is denied, redirect back or warn
            if (state === 'denied' && pathname !== "/giaotiep-1-1/danh-gia-lo-trinh") {
              // We don't force redirect immediately to not be jarring, 
              // but the UI will show a big warning banner
            }
          };

          updateStatus(result.state);
          result.onchange = () => updateStatus(result.state);
        }
      } catch (e) {
        console.warn("[MIC-LAYOUT] Permissions API not supported", e);
      }
    };

    checkPermission();
  }, [pathname]);

  return (
    <MicContext.Provider value={{ hasPermission }}>
      <div className="h-screen overflow-hidden bg-[#f8f9f9] flex flex-col relative">
        <Script
          src="https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@1.41.1/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js"
          strategy="beforeInteractive"
        />
        
        {/* Persistent Warning Banner if Mic is Blocked */}
        {isDenied && pathname !== "/giaotiep-1-1/danh-gia-lo-trinh" && (
          <div className="bg-brand-crimson text-white px-4 py-2 flex items-center justify-center gap-3 z-[100] animate-in slide-in-from-top duration-300">
            <AlertCircle size={16} />
            <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider">
              Microphone đang bị chặn. Vui lòng cấp quyền để tiếp tục bài đánh giá.
            </p>
            <button 
              onClick={() => window.location.href = "/giaotiep-1-1/danh-gia-lo-trinh"}
              className="bg-white text-brand-crimson px-3 py-1 text-[10px] font-black uppercase tracking-tighter"
            >
              Thiết lập lại
            </button>
          </div>
        )}

        <AssessmentHeader />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </MicContext.Provider>
  );
}
