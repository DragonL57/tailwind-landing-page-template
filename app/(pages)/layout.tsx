import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";
import FloatingContact from "@/components/floating-contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VMG Education - Nền tảng giáo dục tiếng Anh chuẩn quốc tế",
  description: "Kiến tạo lộ trình học tập chuyên nghiệp từ chứng chỉ TESOL quốc tế đến giao tiếp tiếng Anh 1-1 cá nhân hóa FlexTrack.",
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9f9] text-[#191c1c] antialiased selection:bg-brand-crimson selection:text-white">
      <Header />
      <main className="pt-16 relative z-10">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
