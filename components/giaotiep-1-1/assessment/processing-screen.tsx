"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProcessingScreenProps {
  recordingCount: number;
  onProcess: () => Promise<void>;
  progress?: number;
  progressMessage?: string;
}

export default function ProcessingScreen({ recordingCount, onProcess, progress: externalProgress, progressMessage: externalMessage }: ProcessingScreenProps) {
  const processedRef = useRef(false);
  const [internalProgress, setInternalProgress] = useState(0);

  const progress = externalProgress ?? internalProgress;

  const loadingMessages = [
    "Đang phân tích giọng nói...",
    "Đang đánh giá nội dung...",
    "Đang tính điểm...",
    "Hoàn tất",
  ];

  const getCurrentMessage = () => {
    if (externalMessage) return externalMessage;
    if (progress < 25) return loadingMessages[0];
    if (progress < 50) return loadingMessages[1];
    if (progress < 75) return loadingMessages[2];
    return loadingMessages[3];
  };

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    if (externalProgress !== undefined) return;

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 800);

    onProcess().finally(() => {
      setInternalProgress(100);
    });

    return () => clearInterval(interval);
  }, [onProcess, externalProgress]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="w-48 h-16 mx-auto mb-8 relative">
          <Image
            src="/flextrack/flextrack_logo_white.png"
            alt="FlexTrack Logo"
            fill
            className="object-contain object-center"
          />
        </div>

        {/* Title */}
        <h3 className="font-headline font-bold text-2xl uppercase text-[#191c1c] mb-2">
          Đang chấm điểm
        </h3>
        <p className="font-body text-sm text-[#191c1c]/50 mb-12">
          {recordingCount} bản ghi âm
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-headline font-bold text-4xl text-[#191c1c]">
              {Math.round(progress)}%
            </span>
            <span className="font-body text-sm text-[#191c1c]/60">
              {getCurrentMessage()}
            </span>
          </div>
          <div className="h-2 bg-[#e7e8e8]">
            <motion.div 
              className="h-full bg-brand-crimson"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}