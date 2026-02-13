import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh toán - VMG TESOL e-PATH",
  description: "Hoàn tất thanh toán khóa học TESOL Online tại VMG Education",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
