export const metadata = {
  title: "VMG TESOL e-PATH - Lộ trình giảng dạy tiếng Anh chuẩn quốc tế",
  description: "Chương trình TESOL trực tuyến 100% online với chứng chỉ ALAP quốc tế, mentor đồng hành, livestream hàng tuần và cam kết việc làm.",
};

import HeroTesol from "@/components/hero-tesol";
import ProductOverview from "@/components/product-overview";
import ExitIntentPopup from "@/components/exit-intent-popup";

export default function TesolMoocPage() {
  return (
    <>
      <HeroTesol />
      <ProductOverview />
      <ExitIntentPopup
        ebookTitle="Bí Quyết Dạy Tiếng Anh Chuẩn TESOL Quốc Tế Từ A–Z"
        ebookValue="499,000đ"
      />
    </>
  );
}
