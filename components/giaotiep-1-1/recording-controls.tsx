"use client";

import { useState, useCallback, useRef } from "react";

interface RecordingControlsProps {
  isRecording: boolean;
  isReviewing: boolean;
  errorMessage: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export default function RecordingControls({
  isRecording,
  errorMessage,
  onStartRecording,
  onStopRecording,
}: RecordingControlsProps) {
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStart = useCallback(() => {
    setCountdown(3);
    let count = 3;
    countdownRef.current = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        onStartRecording();
      }
    }, 1000);
  }, [onStartRecording]);

  const handleStop = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(0);
    onStopRecording();
  }, [onStopRecording]);

  if (isRecording) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-brand-crimson rounded-full animate-pulse" />
          <span className="font-body text-sm font-bold text-brand-crimson uppercase tracking-[1.5px]">
            Đang ghi âm...
          </span>
        </div>
        <p className="font-body text-xs text-[#191c1c]/40 mb-4">Hãy đọc to đoạn văn trên</p>
        <button
          onClick={handleStop}
          className="border-2 border-brand-crimson text-brand-crimson px-8 py-3 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:bg-brand-crimson hover:text-white transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h12v12H6z" />
          </svg>
          Dừng ghi âm
        </button>
      </div>
    );
  }

  if (countdown > 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 border-4 border-brand-crimson flex items-center justify-center">
          <span className="font-headline font-bold text-4xl text-brand-crimson">{countdown}</span>
        </div>
        <p className="font-body text-sm text-[#5b403f]">Chuẩn bị đọc...</p>
        <button
          onClick={handleStop}
          className="font-body text-xs text-[#191c1c]/40 hover:text-brand-crimson transition-colors cursor-pointer"
        >
          Hủy
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-brand-crimson p-4 mb-2 w-full">
          <p className="font-body text-sm text-brand-crimson">{errorMessage}</p>
        </div>
      )}
      <button
        onClick={handleStart}
        className="bg-brand-crimson text-white px-10 py-4 font-bold tracking-[1.5px] uppercase text-sm rounded-none hover:opacity-90 transition-all flex items-center gap-3 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
        Bắt đầu ghi âm
      </button>
    </div>
  );
}
