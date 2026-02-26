import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giao Tiếp 1-1 | VMG Education",
  description: "Giao Tiếp 1-1 course page",
};

export default function Giaotiep11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
