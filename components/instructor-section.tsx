"use client";

import React from "react";
import FadeSlideUp from "./fade-slide-up";

export default function InstructorSection() {
  return (
    <FadeSlideUp className="section-padding bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-12">

          <p className="text-[11px] font-black text-[#0038D1] uppercase tracking-[0.2em] mb-6">Giảng viên chuyên môn</p>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Content */}
            <div className="w-full md:w-1/4 shrink-0">
              <div className="aspect-[3/4] rounded-xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 overflow-hidden">
                <img
                  src="/images/teacher/image.png"
                  alt="Giảng viên TESOL VMG"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-5">
              <div>
                <h3 className="text-xl font-black text-gray-900">Thiên Thanh</h3>
                <p className="text-sm text-[#0038D1] font-semibold mt-0.5">ThS. Ngôn ngữ Anh</p>
              </div>

              {/* Stats */}
              <div className="flex gap-3">
                <div className="bg-[#f4f7ff] rounded-xl px-4 py-3 text-center border border-[#e8eeff]">
                  <p className="text-base font-black text-[#0038D1] leading-none">12</p>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-[#7b9bd6] mt-1">Khóa học</p>
                </div>
                <div className="bg-[#f4fbf6] rounded-xl px-4 py-3 text-center border border-[#e0f2e6]">
                  <p className="text-base font-black text-[#2d7a45] leading-none">10+</p>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-[#6db880] mt-1">Năm kinh nghiệm</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Với hơn một thập kỷ kinh nghiệm trong lĩnh vực đào tạo Anh ngữ và nghiên cứu ngôn ngữ học,
                  ThS. Thiên Thanh mang đến phương pháp giảng dạy hiện đại, tập trung vào tính ứng dụng
                  thực tế và tư duy sư phạm sáng tạo cho học viên TESOL.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </FadeSlideUp>
  );
}
