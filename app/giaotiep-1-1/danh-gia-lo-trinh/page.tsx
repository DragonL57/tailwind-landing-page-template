"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, ShieldCheck, AlertCircle, CheckCircle2, Play, Square, RotateCcw } from "lucide-react";
import { PART1_SENTENCES, PART2_SCENARIOS } from "@/lib/ai-assessment/constants";

export default function AssessmentIntroPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [hasMicPermission, setHasMicPermission] = useState(false);

  useEffect(() => {
    console.log("[GA4] Page view:", pathname);
  }, [pathname]);

  return (
    <div className="bg-white">
      <div className="py-12 px-6 md:px-16 lg:px-24">
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

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 border-t border-slate-100 pt-12">
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
                <button
                  disabled={!hasMicPermission}
                  onClick={() => router.push("/giaotiep-1-1/danh-gia-lo-trinh/khao-sat")}
                  className={`px-10 py-3 font-bold tracking-[2px] uppercase text-xs rounded-none transition-all ${
                    hasMicPermission 
                    ? "bg-[var(--color-crimson)] text-white hover:opacity-90 cursor-pointer shadow-lg" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Bắt đầu khảo sát
                </button>
                <Link
                  href="/giaotiep-1-1"
                  className="font-body text-xs text-gray-400 hover:text-[var(--color-crimson)] transition-colors cursor-pointer"
                >
                  Quay lại
                </Link>
                {!hasMicPermission && (
                  <p className="text-[10px] text-brand-crimson font-bold uppercase tracking-wider mt-2 animate-pulse">
                    * Vui lòng thiết lập Micro để tiếp tục
                  </p>
                )}
              </div>
            </div>

            {/* Right - Mic Test */}
            <div>
              <MicTest onGranted={() => setHasMicPermission(true)} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MicTest({ onGranted }: { onGranted: () => void }) {
  const [micState, setMicState] = useState<"idle" | "checking" | "allowed" | "denied">("idle");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleGetStream = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(s);
      setMicState("allowed");
      onGranted();
      return s;
    } catch (err: unknown) {
      const errorName = err instanceof Error ? err.name : "";
      if (errorName === "NotAllowedError" || errorName === "PermissionDeniedError") {
        setMicState("denied");
      }
      return null;
    }
  }, [onGranted]);

  // Auto-check permission on mount
  useEffect(() => {
    const checkExistingPermission = async () => {
      try {
        // Permissions API is not supported in all browsers (e.g. Safari), so we check first
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          if (result.state === 'granted') {
            // Already granted, just trigger the stream to be sure
            await handleGetStream();
          }
          
          result.onchange = () => {
            if (result.state === 'denied') setMicState("denied");
            if (result.state === 'granted') handleGetStream();
          };
        }
      } catch (e) {
        console.warn("[MIC] Permissions API not supported", e);
      }
    };
    checkExistingPermission();
  }, [handleGetStream]);

  const checkPermission = async () => {
    setMicState("checking");
    await handleGetStream();
  };

  const startRecording = async () => {
    let currentStream = stream;
    if (!currentStream) {
      currentStream = await handleGetStream();
    }

    if (currentStream) {
      runRecording(currentStream);
    }
  };

  const runRecording = (s: MediaStream) => {
    audioChunksRef.current = [];
    const mr = new MediaRecorder(s);
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
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f8f9f9] p-8 border border-slate-100 h-full flex flex-col">
      <h4 className="font-headline font-bold text-sm uppercase tracking-wider text-[#191c1c] mb-8 flex items-center gap-2">
        <Mic size={18} className="text-brand-crimson" />
        Thiết lập âm thanh
      </h4>

      <div className="flex flex-col">
        {micState !== "allowed" ? (
          <div className="space-y-6">
            <p className="font-body text-sm text-[#5b403f] leading-relaxed">
              Để thực hiện bài đánh giá, hệ thống cần quyền truy cập vào Microphone của bạn.
            </p>
            
            <button
              onClick={checkPermission}
              disabled={micState === "checking"}
              className="w-full bg-[#191c1c] text-white py-4 font-bold tracking-[1.5px] uppercase text-xs hover:bg-brand-crimson transition-all flex items-center justify-center gap-2"
            >
              {micState === "checking" ? (
                <RotateCcw size={16} className="animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Cấp quyền Micro
                </>
              )}
            </button>

            {micState === "denied" && (
              <div className="flex items-start gap-2 p-3 bg-red-50 text-red-600 rounded-sm">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p className="text-[11px] leading-tight">
                  Quyền truy cập bị từ chối. Vui lòng nhấn vào biểu tượng ổ khóa trên trình duyệt để cho phép và tải lại trang.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-600 font-bold text-xs bg-green-50 p-2 justify-center">
              <CheckCircle2 size={14} />
              Đã kết nối Microphone
            </div>

            <div className="text-center space-y-4">
              <p className="font-headline font-bold text-3xl tabular-nums">
                {formatTime(recordingTime)}
              </p>

              <div className="flex justify-center">
                {!audioUrl && !isRecording && (
                  <button
                    onClick={startRecording}
                    className="w-16 h-16 rounded-full bg-brand-crimson text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg"
                  >
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </button>
                )}

                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="w-16 h-16 rounded-full bg-[#191c1c] text-white flex items-center justify-center animate-pulse"
                  >
                    <Square size={24} fill="currentColor" />
                  </button>
                )}

                {audioUrl && (
                  <div className="w-full space-y-4">
                    <audio src={audioUrl} controls className="w-full h-10" />
                    <button
                      onClick={reset}
                      className="w-full py-3 border border-slate-200 text-[#191c1c] font-bold text-[10px] uppercase tracking-widest hover:border-brand-crimson transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={12} />
                      Ghi lại
                    </button>
                  </div>
                )}
              </div>
              
              {isRecording && (
                <p className="text-xs text-brand-crimson font-bold animate-pulse uppercase tracking-widest">Đang thu âm...</p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="font-body text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-left">Mẹo nhỏ:</p>
              <ul className="text-[11px] text-gray-500 space-y-1 text-left">
                <li>• Sử dụng tai nghe để có kết quả tốt nhất.</li>
                <li>• Đảm bảo không gian yên tĩnh.</li>
                <li>• Nói rõ chữ, âm lượng vừa phải.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
