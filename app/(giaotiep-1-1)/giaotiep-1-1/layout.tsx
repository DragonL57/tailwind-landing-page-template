import { Metadata } from "next";
import Header from "@/components/giaotiep-1-1/header";

export const metadata: Metadata = {
  title: "FlexTrack 1-1 | Tiếng Anh Giao Tiếp Cá Nhân Hóa",
  description: "Hệ chương trình tiếng Anh 1-1 trực tuyến được thiết kế riêng biệt cho mục tiêu học thuật và sự nghiệp với lộ trình linh hoạt.",
  openGraph: {
    title: "FlexTrack 1-1 - Giao Tiếp Tiếng Anh Cá Nhân Hóa",
    description: "Học tiếng Anh 1-1 trực tuyến với lộ trình thiết kế riêng, tập trung vào mục tiêu của bạn.",
    images: ["/images/flextrack-og.jpg"],
    url: "https://vmg-tesol.edu.vn/giaotiep-1-1",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexTrack 1-1 - Giao Tiếp Tiếng Anh Cá Nhân Hóa",
    description: "Học tiếng Anh 1-1 trực tuyến với lộ trình thiết kế riêng.",
    images: ["/images/flextrack-og.jpg"],
  },
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
