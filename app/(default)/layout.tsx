"use client";

import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";

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
    </div>
  );
}
