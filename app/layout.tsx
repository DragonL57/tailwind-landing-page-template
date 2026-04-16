import "./css/style.css";

import { Montserrat, Be_Vietnam_Pro, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  variable: "--font-bricolage",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-be-vietnam-pro',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: "VMG Education - Nền tảng giáo dục tiếng Anh chuẩn quốc tế",
    template: "%s | VMG Education",
  },
  description: "Nền tảng giáo dục tiếng Anh hàng đầu Việt Nam với chứng chỉ TESOL quốc tế và chương trình giao tiếp 1-1 cá nhân hóa FlexTrack.",
  keywords: ["TESOL", "tiếng Anh giao tiếp", "học tiếng Anh 1-1", "chứng chỉ TESOL", "VMG Education", "FlexTrack"],
  authors: [{ name: "VMG Education" }],
  creator: "VMG Education",
  publisher: "VMG Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vmg-tesol.edu.vn"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VMG Education - Nền tảng giáo dục tiếng Anh chuẩn quốc tế",
    description: "Nền tảng giáo dục tiếng Anh hàng đầu Việt Nam với chứng chỉ TESOL quốc tế và chương trình giao tiếp 1-1 cá nhân hóa FlexTrack.",
    url: "https://vmg-tesol.edu.vn",
    siteName: "VMG Education",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VMG Education - Nền tảng giáo dục tiếng Anh chuẩn quốc tế",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VMG Education - Nền tảng giáo dục tiếng Anh chuẩn quốc tế",
    description: "Nền tảng giáo dục tiếng Anh hàng đầu Việt Nam với chứng chỉ TESOL quốc tế và chương trình giao tiếp 1-1 cá nhân hóa FlexTrack.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        className={`${bricolageGrotesque.variable} ${montserrat.variable} ${beVietnamPro.variable} bg-white font-be-vietnam-pro tracking-tight text-[#1a1a1a] antialiased`}
      >
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHRRKZ8P"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
