"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

interface LeadInfoStepProps {
  onSubmit: (data: LeadData) => void;
}

export default function LeadInfoStep({ onSubmit }: LeadInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 p-8">
        <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-2 text-center">Nhận kết quả đánh giá</h3>
        <p className="font-body text-sm text-[#5b403f] mb-6 text-center">
          Vui lòng để lại thông tin để hệ thống xử lý và gửi báo cáo chi tiết cho bạn.
        </p>
        <form onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          const formData = new FormData(e.currentTarget);
          onSubmit({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
          });
        }} className="space-y-5">
          <div>
            <label className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-2">Họ tên (*)</label>
            <input type="text" required name="name" className="w-full bg-[#f3f4f4] border border-slate-200 p-3 outline-none font-body text-sm rounded-none focus:border-brand-crimson transition-colors" />
          </div>
          <div>
            <label className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-2">Email (*)</label>
            <input type="email" required name="email" className="w-full bg-[#f3f4f4] border border-slate-200 p-3 outline-none font-body text-sm rounded-none focus:border-brand-crimson transition-colors" />
          </div>
          <div>
            <label className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-2">Số điện thoại (*)</label>
            <input type="tel" required name="phone" className="w-full bg-[#f3f4f4] border border-slate-200 p-3 outline-none font-body text-sm rounded-none focus:border-brand-crimson transition-colors" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-brand-crimson text-white py-3 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:opacity-90 transition-all cursor-pointer disabled:opacity-50">
            {isSubmitting ? "Đang xử lý..." : "Tiếp tục để xem kết quả"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}