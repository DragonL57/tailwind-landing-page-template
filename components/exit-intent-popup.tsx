"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, BookOpen, Sparkles } from "lucide-react";

interface ExitIntentPopupProps {
  ebookTitle?: string;
  ebookValue?: string;
}

export default function ExitIntentPopup({
  ebookTitle = "Bí Quyết Dạy Tiếng Anh Chuẩn TESOL Quốc Tế Từ A–Z",
  ebookValue = "499,000đ",
}: ExitIntentPopupProps) {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 backdrop-blur-xl bg-vmg-navy/40 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] max-w-4xl w-full shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] overflow-hidden relative border border-white/20 transform animate-in zoom-in-95 duration-500">
        
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-vmg-navy/30 hover:text-vmg-navy transition-all flex items-center justify-center group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        <div className="grid lg:grid-cols-12 items-stretch min-h-[500px]">
          
          {/* Left Side: Visual & Brand */}
          <div className="lg:col-span-5 bg-vmg-navy relative overflow-hidden flex flex-col items-center justify-center p-12 text-center">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-vmg-blue/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-vmg-red/10 rounded-full blur-[60px]" />
            </div>

            <div className="relative z-10 w-full max-w-[240px]">
              {/* Ebook Mockup Style */}
              <div className="relative group perspective-1000">
                <div className="aspect-[3/4] bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-[-4deg] group-hover:rotate-0 transition-transform duration-700 border-r-8 border-gray-100 flex flex-col">
                  <div className="bg-vmg-blue p-4 flex-grow flex flex-col justify-between">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left space-y-2">
                      <div className="h-1 w-12 bg-vmg-green rounded-full" />
                      <p className="text-[10px] font-black text-white leading-tight uppercase tracking-widest">VMG Education</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white h-1/3 flex flex-col justify-center">
                    <div className="h-2 w-full bg-gray-100 rounded-full mb-2" />
                    <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-vmg-red text-white text-[10px] font-black py-3 px-4 rounded-2xl shadow-xl rotate-12 flex flex-col items-center leading-none">
                  <span className="uppercase tracking-widest mb-1 opacity-80">Trị giá</span>
                  <span className="text-sm">{ebookValue}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
              Tài liệu chuyên sâu • Độc quyền từ VMG
            </div>
          </div>

          {/* Right Side: Content & Form */}
          <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center bg-white">
            {!claimed ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="space-y-4">
                  {/* Badge removed as requested */}
                  <h2 className="text-3xl md:text-4xl font-black text-vmg-navy leading-tight tracking-tight">
                    Trước khi bạn rời đi...
                  </h2>
                  <p className="text-base md:text-lg text-vmg-navy/60 font-medium leading-relaxed">
                    Chúng tôi muốn gửi tặng bạn bộ cẩm nang <br className="hidden md:block" />
                    <span className="text-vmg-blue font-bold italic">"{ebookTitle}"</span> <br className="hidden md:block" />
                    hoàn toàn miễn phí để hỗ trợ sự nghiệp của bạn.
                  </p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div className="group">
                    <label className="block text-[10px] font-black text-vmg-navy/30 uppercase tracking-[0.15em] mb-2 ml-1">Địa chỉ Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && email && setClaimed(true)}
                      className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-100 rounded-2xl text-base text-vmg-navy placeholder:text-vmg-navy/20 focus:border-vmg-blue/30 focus:bg-white focus:outline-none transition-all font-bold shadow-sm"
                    />
                  </div>
                  
                  <button
                    onClick={() => { if (email) setClaimed(true); }}
                    disabled={!email}
                    className="w-full h-14 bg-vmg-red hover:bg-vmg-red/90 text-white font-black rounded-2xl shadow-xl shadow-vmg-red/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                  >
                    Nhận tài liệu ngay
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-vmg-navy/30 font-medium italic">
                    * Tài liệu sẽ được gửi trực tiếp qua email của bạn trong 30 giây.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 rounded-[2rem] bg-vmg-green/10 flex items-center justify-center mx-auto relative">
                  <div className="absolute inset-0 bg-vmg-green/5 rounded-full animate-ping" />
                  <svg className="w-12 h-12 text-vmg-green relative z-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-vmg-navy tracking-tight">Thành công!</h3>
                  <p className="text-base text-vmg-navy/60 font-medium">
                    Bộ tài liệu đã được gửi thành công đến <br />
                    <span className="text-vmg-blue font-bold text-lg">{email}</span>
                  </p>
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="w-full max-w-xs h-14 bg-vmg-navy text-white font-black rounded-2xl hover:bg-vmg-navy/90 transition-all uppercase tracking-widest text-xs shadow-lg mx-auto"
                >
                  Tiếp tục khám phá
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
