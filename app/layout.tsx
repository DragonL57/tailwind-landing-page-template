import "./css/style.css";

import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/ui/header";
import FloatingContact from "@/components/floating-contact";
import { CartProvider } from "@/context/cart-context";
import { UIProvider } from "@/context/ui-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "VMG TESOL e-PATH - Lộ trình giảng dạy tiếng Anh chuẩn quốc tế",
  description: "Chương trình TESOL trực tuyến 100% online với chứng chỉ ALAP quốc tế, mentor đồng hành, livestream hàng tuần và cam kết việc làm.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MHRRKZ8P');`}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T451F3E6QV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T451F3E6QV');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHRRKZ8P"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <UIProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
              <Header />
              {children}
              <FloatingContact />
            </div>
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
