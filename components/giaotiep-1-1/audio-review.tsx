"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface AudioReviewProps {
  audioUrl: string;
  onRecordAgain: () => void;
  onAccept: () => void;
}

export default function AudioReview({ audioUrl, onRecordAgain, onAccept }: AudioReviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const createAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audioRef.current = null;
    };

    audio.onerror = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audioRef.current = null;
    };

    return audio;
  }, [audioUrl]);

  const togglePlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }
    const audio = createAudio();
    audio.play().catch(() => {
      setIsPlaying(false);
      audioRef.current = null;
    });
    setIsPlaying(true);
  }, [createAudio]);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audioRef.current.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  }, [duration]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="bg-white border border-slate-200 p-6 mb-6">
        <p className="font-body text-xs uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-4">Nghe lại bản ghi âm</p>
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlayback}
            className="w-12 h-12 bg-brand-crimson text-white flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shrink-0"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h4v12H6zm8 0h4v12h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div
              ref={progressRef}
              onClick={seekTo}
              className="h-2 bg-[#e7e8e8] cursor-pointer group"
            >
              <div
                className="h-full bg-brand-crimson relative"
                style={{ width: `${progressPct}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-crimson border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <p className="font-body text-[10px] text-[#191c1c]/40">
                {isPlaying ? "Đang phát..." : "Nhấn để nghe"}
              </p>
              <p className="font-body text-[10px] text-[#191c1c]/40 font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRecordAgain}
          className="flex-1 border-2 border-[#191c1c]/20 text-[#191c1c]/60 px-6 py-3 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:border-brand-crimson hover:text-brand-crimson transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Ghi âm lại
        </button>
        <button
          onClick={onAccept}
          className="flex-1 bg-brand-crimson text-white px-6 py-3 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Chấp nhận
        </button>
      </div>
    </motion.div>
  );
}
