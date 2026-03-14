"use client";

import React from "react";
import FadeSlideUp from "./fade-slide-up";

export default function PricingSection() {
  const handleConsultation = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <FadeSlideUp id="pricing-final" className="w-full bg-[#0038D1] section-padding scroll-mt-24 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#75E04D]/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="w-full px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
          {/* Left: Benefits & Info */}
          <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
              Sẵn sàng bắt đầu hành trình <span className="text-[#0038D1]">TESOL</span> của bạn?
            </h2>
            <div className="space-y-6">
              {[
                { title: "Chứng chỉ Quốc tế", desc: "Được cấp bởi ALAP Anh Quốc, công nhận toàn cầu." },
                { title: "Lộ trình tinh gọn", desc: "Học 100% online, linh hoạt theo thời gian của bạn." },
                { title: "Hỗ trợ trọn đời", desc: "Tham gia cộng đồng giáo viên và nhận tài liệu cập nhật." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#75E04D]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3.5 h-3.5 text-[#75E04D]" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pricing & CTA */}
          <div className="w-full md:w-80 bg-gray-50/50 p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] font-black text-[#0038D1] uppercase tracking-[0.2em] mb-2">Học phí trọn gói</span>
            <div className="mb-8">
              <span className="text-5xl font-black text-gray-900 tracking-tighter tabular-nums">9.900.000đ</span>
              <p className="text-[11px] font-bold text-gray-400 mt-2 italic px-4">Cam kết không phát sinh chi phí trong suốt quá trình học</p>
            </div>
            <button 
              onClick={handleConsultation}
              className="w-full bg-[#75E04D] hover:bg-[#68C944] text-white font-black py-5 rounded-2xl shadow-xl shadow-[#75E04D]/30 transition-all hover:scale-[1.05] active:scale-[0.95] uppercase tracking-widest text-sm"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </FadeSlideUp>
  );
}
