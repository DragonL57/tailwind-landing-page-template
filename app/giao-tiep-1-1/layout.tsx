import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiếng Anh Giao Tiếp 1-1 Chuyên Ngành | VMG Education",
  description: "Học tiếng Anh giao tiếp 1-on-1 cho các chuyên ngành: Du lịch, Khách sạn, Kinh doanh, IT, Y tế. Lộ trình cá nhân hóa 100%, lịch học linh hoạt.",
  keywords: "tiếng anh giao tiếp, 1-on-1, chuyên ngành, du lịch, khách sạn, kinh doanh, IT",
};

export default function GiaoTiep11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
