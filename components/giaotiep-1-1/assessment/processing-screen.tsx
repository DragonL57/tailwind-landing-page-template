"use client";

import { motion } from "framer-motion";

interface ProcessingScreenProps {
  recordingCount: number;
}

export default function ProcessingScreen({ recordingCount }: ProcessingScreenProps) {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div className="h-full flex">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="w-16 h-16 border-4 border-[#191c1c] border-t-transparent animate-spin mx-auto mb-8" />
            <h3 className="font-headline font-bold text-2xl uppercase text-[#191c1c] mb-3">
              Đang chấm điểm
            </h3>
            <p className="font-body text-sm text-[#5b403f] max-w-md mx-auto">
              AI đang phân tích phát âm, ngữ pháp và từ vựng của bạn...
            </p>
          </motion.div>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#f8f9f9] border-l border-slate-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-brand-crimson/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-brand-crimson"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="font-body text-xs text-[#191c1c]/40 uppercase tracking-[1.5px]">
              Đang xử lý {recordingCount} bản ghi âm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
