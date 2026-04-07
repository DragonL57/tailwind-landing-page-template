import AssessmentHeader from "@/components/giaotiep-1-1/assessment-header";
import Script from "next/script";

export default function DanhGiaLoTrinhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-[#f8f9f9] flex flex-col">
      <Script
        src="https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@1.41.1/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js"
        strategy="beforeInteractive"
      />
      <AssessmentHeader />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
