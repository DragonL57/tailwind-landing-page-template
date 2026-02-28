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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(15,23,42,0.55)" }}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px -12px rgba(0,0,0,0.35)" }}
      >
        {/* Illustrated header */}
        <div className="relative h-36 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center overflow-hidden">
          <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -right-6 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-white/10" />

          <div className="relative flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-4xl">
              📘
            </div>
            <div className="absolute -bottom-3 -right-5 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-xl border-2 border-blue-100">
              🤖
            </div>
          </div>

          <button
            onClick={() => setShow(false)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 transition-colors flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pt-6 pb-7">
          {!claimed ? (
            <>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-3">
                <Gift className="w-3 h-3" />
                Quà tặng miễn phí
              </span>

              <h2 className="text-xl font-bold text-slate-900 leading-snug mb-1">
                Khoan! Bạn quên nhận Ebook rồi 🎁
              </h2>
              <p className="text-[13px] text-slate-500 mb-4 leading-relaxed">
                <span className="font-semibold text-slate-700">"{ebookTitle}"</span>
                {" "}— trị giá {ebookValue}, tặng bạn 100% miễn phí.
              </p>

              <div className="border-t border-slate-100 mb-4" />

              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Email nhận Ebook
              </label>
              <input
                type="email"
                placeholder="ten@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && email && setClaimed(true)}
                className="w-full pl-4 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition mb-3"
              />
              <button
                onClick={() => { if (email) setClaimed(true); }}
                disabled={!email}
                className="w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: email
                    ? "linear-gradient(135deg,#3b82f6,#6366f1)"
                    : "#94a3b8",
                }}
              >
                Gửi Ebook cho tôi →
              </button>

              <button
                onClick={() => setShow(false)}
                className="mt-3 w-full text-xs text-slate-400 hover:text-slate-500 transition-colors"
              >
                Không cảm ơn, tôi không cần
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 text-3xl">
                🎉
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Đã gửi thành công!</h3>
              <p className="text-sm text-slate-500 mb-5">
                Kiểm tra hộp thư{" "}
                <span className="font-semibold text-blue-600">{email}</span>
              </p>
              <button
                onClick={() => setShow(false)}
                className="w-full py-2.5 rounded-xl font-semibold text-sm text-white"
                style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
              >
                Tiếp tục khám phá
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
