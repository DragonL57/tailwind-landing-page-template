import { Metadata } from "next";
import Header from "@/components/giaotiep-1-1/header";

export const metadata: Metadata = {
  title: "Giao Tiếp 1-1 | VMG Education",
  description: "Hệ thống học tập linh hoạt - Kiến tạo tương lai thông qua giáo dục kiến trúc.",
};

export default function Giaotiep11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9f9] text-[#191c1c] antialiased selection:bg-[#BE202F] selection:text-white">
      <Header />
      <main className="pt-12 md:pt-16 relative z-10">
        {children}
      </main>
    </div>
  );
}
