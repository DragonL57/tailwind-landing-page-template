import { redirect } from 'next/navigation';

export const metadata = {
  title: "VMG Education - Nền tảng giáo dục trực tuyến",
  description: "VMG Education - Nền tảng học tập trực tuyến với các chương trình đào tạo chuyên sâu.",
};

export default function Home() {
  redirect('/tesolmooc');
}
