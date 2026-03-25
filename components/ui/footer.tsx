import Link from "next/link";
import Logo from "./logo";
import { Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-vmg-blue/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-12 py-12 md:py-20 lg:grid-cols-12">
          
          {/* 1st block: Brand & About */}
          <div className="col-span-2 lg:col-span-6 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="scale-110 origin-left">
                <Logo />
              </div>
              <p className="text-sm text-vmg-navy/60 leading-relaxed max-w-sm font-medium">
                Hệ thống đào tạo TESOL chuẩn quốc tế hàng đầu Việt Nam, cam kết chất lượng đầu ra và cơ hội nghề nghiệp toàn cầu.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "#0" },
                { icon: Youtube, label: "Youtube", href: "#0" },
                { 
                  label: "Zalo", 
                  href: "https://zalo.me/your-number",
                  customIcon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.317 21.69a.5.5 0 00.638.638l3.718-1.669A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm3.5 13.5h-7a.5.5 0 010-1h7a.5.5 0 010 1zm0-3h-7a.5.5 0 010-1h7a.5.5 0 010 1zm0-3h-7a.5.5 0 010-1h7a.5.5 0 010 1z"/>
                    </svg>
                  )
                }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-vmg-blue/5 flex items-center justify-center text-vmg-blue hover:bg-vmg-blue hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon ? <social.icon className="w-5 h-5" /> : social.customIcon}
                </Link>
              ))}
            </div>
          </div>

          {/* 2nd block: Quick Links */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-vmg-navy">Chương Trình</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">TESOL Online</Link></li>
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">Chứng Chỉ ALAP</Link></li>
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">Đội Ngũ Mentor</Link></li>
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">Lộ Trình Học</Link></li>
            </ul>
          </div>

          {/* 3rd block: Company */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-vmg-navy">Công Ty</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">Về VMG</Link></li>
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">Tin Tức & Blog</Link></li>
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">Tuyển Dụng</Link></li>
              <li><Link className="text-vmg-navy/60 hover:text-vmg-blue transition-colors font-medium" href="#0">Liên Hệ</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom area: Copyright */}
        <div className="py-8 border-t border-vmg-navy/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-vmg-navy/40 font-bold uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} VMG Education. All rights reserved.
          </div>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-tighter text-vmg-navy/30">
            <Link href="#0" className="hover:text-vmg-blue transition-colors">Privacy Policy</Link>
            <Link href="#0" className="hover:text-vmg-blue transition-colors">Terms of Service</Link>
            <Link href="#0" className="hover:text-vmg-blue transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
