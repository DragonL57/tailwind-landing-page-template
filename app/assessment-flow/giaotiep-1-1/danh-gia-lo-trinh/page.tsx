"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PART1_SENTENCES, PART2_SCENARIOS } from "@/lib/ai-assessment/constants";

export default function AssessmentIntroPage() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("[GA4] Page view:", pathname);
  }, [pathname]);

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div className="h-full overflow-y-auto py-10 px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[#191c1c] leading-[0.95] tracking-tight mb-2 whitespace-pre-wrap">Bài Đánh Giá Nói Tiếng Anh</h2>
            <p className="font-body text-sm text-[#5b403f]/70">
              Sử dụng AI để đánh giá trình độ tiếng Anh của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Info */}
            <div>
              {/* Why take this test */}
              <div className="mb-8">
                <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-4">
                  Tại sao cần làm bài đánh giá?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-crimson)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-[var(--color-crimson)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-sm text-[#191c1c] font-medium">Biết chính xác trình độ tiếng Anh của bạn</p>
                      <p className="font-body text-xs text-gray-500">AI đánh giá 5 tiêu chí: Phát âm, Lưu loát, Từ vựng, Ngữ pháp, Xử lý câu hỏi</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-crimson)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-[var(--color-crimson)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-sm text-[#191c1c] font-medium">Nhận lộ trình học tập cá nhân hóa</p>
                      <p className="font-body text-xs text-gray-500">Dựa trên ngành nghề và mục tiêu của bạn</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-crimson)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-[var(--color-crimson)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-sm text-[#191c1c] font-medium">Biết cần bao nhiêu giờ học để đạt mục tiêu</p>
                      <p className="font-body text-xs text-gray-500">Gói học phù hợp với nhu cầu và ngân sách của bạn</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* How it works */}
              <div className="mb-8">
                <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-4">
                  Cách thức
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-crimson)] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <p className="font-body text-sm text-[#191c1c]">Điền khảo sát nhu cầu (ngành nghề, mục tiêu)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-crimson)] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <p className="font-body text-sm text-[#191c1c]">Đọc {PART1_SENTENCES.length} câu tiếng Anh</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-crimson)] text-white text-xs font-bold flex items-center justify-center">3</span>
                    <p className="font-body text-sm text-[#191c1c]">Nói tự do {PART2_SCENARIOS.length} tình huống</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-crimson)] text-white text-xs font-bold flex items-center justify-center">4</span>
                    <p className="font-body text-sm text-[#191c1c]">Nhận kết quả và lộ trình học</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/assessment-flow/giaotiep-1-1/danh-gia-lo-trinh/khao-sat"
                  className="bg-[var(--color-crimson)] text-white px-10 py-3 font-bold tracking-[2px] uppercase text-xs rounded-none hover:opacity-90 transition-all cursor-pointer"
                >
                  Bắt đầu khảo sát
                </Link>
                <Link
                  href="/landing/giaotiep-1-1"
                  className="font-body text-xs text-gray-400 hover:text-[var(--color-crimson)] transition-colors cursor-pointer"
                >
                  Quay lại
                </Link>
              </div>
            </div>

            {/* Right - Mic Test */}
            <div>
              <MicTest />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MicTest() {
  const [micState, setMicState] = useState<"idle" | "checking" | "allowed" | "denied">("idle");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkPermission = async () => {
    setMicState("checking");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      setMicState("allowed");
    } catch {
      setMicState("denied");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(t => t + 1);
      }, 1000);
    } catch {
      setMicState("denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    }
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setRecordingTime(0);
    setMicState("idle");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f8f9f9] p-6 h-full">
      <p className="font-headline font-bold text-sm uppercase text-[#191c1c] mb-4">Kiểm tra micro</p>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        {micState === "allowed" && (
          <>
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <span className="text-xs text-green-600">Micro sẵn sàng</span>
          </>
        )}
        {micState === "denied" && (
          <>
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
            <span className="text-xs text-red-600">Micro bị chặn</span>
          </>
        )}
      </div>

      {/* Timer */}
      <p className={`font-headline font-bold text-center text-2xl mb-4 ${isRecording ? "text-brand-crimson" : "text-[#191c1c]"}`}>
        {formatTime(recordingTime)}
      </p>

      {/* Record Button */}
      <div className="flex justify-center mb-4">
        {!audioUrl && !isRecording && (
          <button
            onClick={startRecording}
            className="w-14 h-14 rounded-full bg-[var(--color-crimson)] hover:bg-[var(--color-crimson)]/90 flex items-center justify-center transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="6"/>
            </svg>
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="w-14 h-14 rounded-full bg-[#191c1c] hover:bg-[#191c1c]/90 flex items-center justify-center transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1"/>
            </svg>
          </button>
        )}
      </div>

      {/* Playback */}
      {audioUrl && (
        <div className="space-y-3">
          <audio controls src={audioUrl} className="w-full h-8" />
          <button
            onClick={reset}
            className="w-full py-2 border border-gray-200 font-bold text-xs uppercase tracking-[1px] hover:border-[var(--color-crimson)] transition-colors cursor-pointer"
          >
            Ghi lại
          </button>
        </div>
      )}

      {/* Check Permission */}
      {micState === "idle" && (
        <button
          onClick={checkPermission}
          className="text-xs text-gray-400 hover:text-[var(--color-crimson)] transition-colors cursor-pointer"
        >
          Kiểm tra quyền
        </button>
      )}

      {micState === "checking" && (
        <p className="text-xs text-gray-400">Đang kiểm tra...</p>
      )}

      {/* Tips */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="font-body text-xs text-gray-400 mb-2">Mẹo để có kết quả tốt</p>
        <ul className="space-y-1 text-xs text-gray-500">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-crimson)]">•</span>
            <span>Nói rõ ràng, tốc độ bình thường</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-crimson)]">•</span>
            <span>Chọn nơi yên tĩnh</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-crimson)]">•</span>
            <span>Giữ khoảng cách với micro 20-30cm</span>
          </li>
        </ul>
      </div>
    </div>
  );
}