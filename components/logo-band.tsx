"use client";

import React, { useState } from "react";
import FadeSlideUp from "./fade-slide-up";

export default function LogoBand() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <FadeSlideUp className="section-padding">
      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 flex items-center gap-2 font-bold uppercase tracking-widest text-sm"
              onClick={() => setIsZoomed(false)}
            >
              Đóng
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src="/images/tesol_certificate.avif" 
              alt="TESOL Certificate Zoomed" 
              className="rounded-lg shadow-2xl max-w-full max-h-[85vh] object-contain cursor-zoom-out animate-in zoom-in-95 duration-300"
            />
          </div>
        </div>
      )}

      <div className="w-full px-4 max-w-[1200px] mx-auto">
        <div className="relative p-8 md:p-12 rounded-[40px] border border-vmg-blue/10 bg-white shadow-[0_32px_64px_-16px_rgba(0,56,209,0.06)] overflow-hidden">
          {/* Subtle accent background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-vmg-blue/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logos with elegant spacing */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-20 mb-8 md:mb-10 transition-opacity duration-700">
              <img src="/images/INTESOL_WORLDWIDE.svg" alt="INTESOL Worldwide Logo" className="h-10 md:h-20 object-contain" />
              <div className="h-8 md:h-10 w-px bg-vmg-navy/10 hidden md:block"></div>
              <img src="/images/ALAP.png" alt="ALAP Logo" className="h-14 md:h-28 object-contain" />
              <div className="h-8 md:h-10 w-px bg-vmg-navy/10 hidden md:block"></div>
              <img src="/images/INTESOL_VIETNAM.svg" alt="INTESOL Vietnam Logo" className="h-10 md:h-20 object-contain" />
            </div>

            {/* Expansive Title Section */}
            <div className="w-full text-center mb-8 md:mb-12 px-2 md:px-0">
              <h2 className="text-2xl md:text-5xl font-black text-vmg-navy leading-snug md:leading-tight">
                Sở hữu chứng chỉ <span className="text-vmg-blue">TESOL Quốc Tế</span> từ ALAP
              </h2>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              {/* Text side - Reordered on Mobile */}
              <div className="order-2 md:order-1 md:col-span-5 space-y-6 text-left px-2 md:px-0">
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-vmg-navy/80 font-medium leading-relaxed">
                    Được công nhận và bảo chứng bởi các tổ chức giáo dục uy tín bậc nhất Anh Quốc và toàn cầu.
                  </p>
                  <p className="text-sm text-vmg-navy/50 leading-relaxed font-medium">
                    Học viên sau khi hoàn thành khóa học sẽ được cấp văn bằng chính thức từ ALAP (Awarding Language Acquisition Professionals), mở ra cánh cửa sự nghiệp giảng dạy tại các trường quốc tế và trung tâm Anh ngữ hàng đầu.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-vmg-navy/5 md:border-transparent">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-vmg-blue-soft flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher${i}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-vmg-navy/40 font-black uppercase tracking-wider">
                    +5,000 giáo viên đã được cấp bằng
                  </p>
                </div>
              </div>

              {/* Certificate Image - Reordered on Mobile */}
              <div className="order-1 md:order-2 md:col-span-7 relative group w-full px-2 md:px-0">
                <div className="absolute -inset-1 md:-inset-2 bg-vmg-green/10 rounded-[28px] blur-xl group-hover:bg-vmg-green/20 transition-colors duration-500"></div>
                <div 
                  className="relative bg-white p-1 md:p-1.5 rounded-xl shadow-lg border border-vmg-blue/5 rotate-1 md:rotate-2 group-hover:rotate-0 transition-transform duration-500 cursor-zoom-in"
                  onClick={() => setIsZoomed(true)}
                >
                  <img 
                    src="/images/tesol_certificate.avif" 
                    alt="TESOL Certificate" 
                    className="rounded-lg w-full shadow-sm"
                  />
                  {/* Zoom Indicator */}
                  <div className="absolute bottom-4 right-4 bg-vmg-navy/60 backdrop-blur-md rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeSlideUp>
  );
}
