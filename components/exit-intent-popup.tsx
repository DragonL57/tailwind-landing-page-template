"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";

interface ExitIntentPopupProps {
  ebookTitle?: string;
  ebookValue?: string;
}

export default function ExitIntentPopup({
  ebookTitle = "50 Mẫu Câu Tiếng Anh Giao Tiếp IT Không Thể Thiếu",
  ebookValue = "299,000đ",
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
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-vmg-navy/60 animate-fadeIn"
    >
      <div
        className="bg-white rounded-[2.5rem] max-w-sm w-full shadow-2xl overflow-hidden border border-white/20 transform animate-scaleIn"
      >
        {/* Modern Brand Header */}
        <div className="relative h-44 bg-gradient-to-br from-vmg-navy via-vmg-blue to-vmg-navy flex items-center justify-center overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-vmg-green/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-vmg-blue/20 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
              <Gift className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-vmg-green flex items-center justify-center text-white shadow-lg border-4 border-vmg-blue">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <button
            onClick={() => setShow(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all flex items-center justify-center group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-8 pt-8 pb-10 text-center">
          {!claimed ? (
            <>
              <div className="space-y-2 mb-8">
                <h2 className="text-2xl font-black text-vmg-navy leading-tight tracking-tight">
                  Đừng rời đi tay trắng! 🎁
                </h2>
                <p className="text-sm text-vmg-navy/50 font-medium leading-relaxed px-2">
                  Nhận ngay bộ tài liệu <span className="text-vmg-blue font-bold">"{ebookTitle}"</span> (trị giá {ebookValue}) hoàn toàn miễn phí.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Địa chỉ email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && email && setClaimed(true)}
                    className="w-full px-6 py-4 bg-vmg-blue-soft border-2 border-transparent rounded-2xl text-sm text-vmg-navy placeholder:text-vmg-navy/30 focus:outline-none focus:border-vmg-blue/20 transition-all font-medium"
                  />
                </div>
                
                <button
                  onClick={() => { if (email) setClaimed(true); }}
                  disabled={!email}
                  className="w-full py-5 bg-vmg-red hover:bg-vmg-red/90 text-white font-black rounded-2xl shadow-xl shadow-vmg-red/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale uppercase tracking-widest text-xs"
                >
                  Nhận Quà Ngay →
                </button>
              </div>
            </>
          ) : (
            <div className="py-4 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-vmg-green/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-vmg-green" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-vmg-navy mb-2 tracking-tight">Tuyệt vời!</h3>
              <p className="text-sm text-vmg-navy/50 font-medium mb-8">
                Tài liệu đã được gửi đến <br />
                <span className="text-vmg-blue font-bold">{email}</span>
              </p>
              <button
                onClick={() => setShow(false)}
                className="w-full py-5 bg-vmg-navy text-white font-black rounded-2xl hover:bg-vmg-navy/90 transition-all uppercase tracking-widest text-xs shadow-lg"
              >
                Khám phá tiếp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
