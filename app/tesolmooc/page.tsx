export const metadata = {
  title: "VMG TESOL e-PATH - Lộ trình giảng dạy tiếng Anh chuẩn quốc tế",
  description: "Chương trình TESOL trực tuyến 100% online với chứng chỉ ALAP quốc tế, mentor đồng hành, livestream và cam kết việc làm.",
  openGraph: {
    title: "VMG TESOL e-PATH - Chứng chỉ TESOL quốc tế 100% Online",
    description: "Chương trình TESOL chuẩn quốc tế với sự đồng hành của mentor, livestream và cam kết hỗ trợ việc làm.",
    images: ["/images/tesol-og.jpg"],
    url: "https://vmg-tesol.edu.vn/tesolmooc",
  },
  twitter: {
    card: "summary_large_image",
    title: "VMG TESOL e-PATH - Chứng chỉ TESOL quốc tế 100% Online",
    description: "Chương trình TESOL chuẩn quốc tế với sự đồng hành của mentor, livestream và cam kết hỗ trợ việc làm.",
    images: ["/images/tesol-og.jpg"],
  },
};

import HeroTesol from "@/components/tesol/hero";
import ExitIntentPopup from "@/components/exit-intent-popup";

export default function TesolMoocPage() {
  return (
    <>
      <HeroTesol />
      <ExitIntentPopup
        ebookTitle="Bí Quyết Dạy Tiếng Anh Chuẩn TESOL Quốc Tế Từ A–Z"
        ebookValue="499,000đ"
      />
    </>
  );
}
