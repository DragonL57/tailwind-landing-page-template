"use client";

import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import ExitIntentPopup from "@/components/exit-intent-popup";

const mockSlots = [
  {
    id: 1,
    time: "19:00 — 19:45",
    date: "Hôm nay, 19/12",
    teacher: "Sarah",
    tier: "PHILIPPINES",
    matchScore: 98,
    industry: "IT",
  },
  {
    id: 2,
    time: "20:15 — 21:00",
    date: "Hôm nay, 19/12",
    teacher: "Michael",
    tier: "BẢN XỨ",
    matchScore: 85,
    industry: "IT",
  },
  {
    id: 3,
    time: "10:00 — 10:45",
    date: "Ngày mai, 20/12",
    teacher: "Emma",
    tier: "PHILIPPINES",
    matchScore: 92,
    industry: "IT",
  },
];

const industries = ["IT / Phần mềm", "Du lịch & Lữ hành", "Khách sạn & Nhà hàng", "Kinh doanh"];

export default function Giaotiep11Page() {
  const [selectedIndustry, setSelectedIndustry] = useState("IT / Phần mềm");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const hoursRemaining = 45;

  const handleSecureSlot = (slotId: number) => {
    setSelectedSlot(slotId);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    alert(`Đã giữ chỗ! Còn ${hoursRemaining - 0.75}h.`);
    setShowConfirm(false);
    setSelectedSlot(null);
  };

  const selectedSlotData = mockSlots.find((s) => s.id === selectedSlot);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-28 pb-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Status Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300 p-5 mb-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Còn lại</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {hoursRemaining}h
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-700 font-medium">Gói Professional</p>
              <p className="text-xs font-semibold text-green-600 mt-1">✓ Đang hoạt động</p>
            </div>
          </div>
        </div>

        {/* Industry Filter */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Available Slots */}
        <div className="space-y-3">
          {mockSlots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-slate-500 mb-2">{slot.date}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <p className="text-xl font-bold text-slate-900">
                      {slot.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Teacher Card Content */}
              <div className="bg-slate-50 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  {slot.teacher}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
                    {slot.tier}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">
                    ★ {slot.matchScore}% phù hợp hoàn hảo
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSecureSlot(slot.id)}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Giữ chỗ
              </button>
            </div>
          ))}
        </div>

        <ExitIntentPopup ebookTitle="50 Mẫu Câu Tiếng Anh Giao Tiếp IT Không Thể Thiếu" />

        {/* Confirmation Modal */}
        {showConfirm && selectedSlotData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Xác nhận đặt chỗ
              </h2>
              <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-2">
                <p className="text-sm">
                  <span className="text-slate-600">Thời gian:</span>{" "}
                  <span className="font-semibold text-slate-900">
                    {selectedSlotData.time}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-600">Giáo viên:</span>{" "}
                  <span className="font-semibold text-slate-900">
                    {selectedSlotData.teacher}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-600">Thời lượng:</span>{" "}
                  <span className="font-semibold text-slate-900">45 phút</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-600">Giờ còn lại:</span>{" "}
                  <span className="font-semibold text-slate-900">
                    {hoursRemaining - 0.75}h
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
