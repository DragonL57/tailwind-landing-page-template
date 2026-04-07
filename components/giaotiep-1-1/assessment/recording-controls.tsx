"use client";

import { useRef, useEffect } from "react";

interface CountdownOverlayProps {
  countdown: number;
  onCancel: () => void;
}

export function CountdownOverlay({ countdown, onCancel }: CountdownOverlayProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="w-20 h-20 border-4 border-brand-crimson flex items-center justify-center">
        <span className="font-headline font-bold text-4xl text-brand-crimson">
          {countdown}
        </span>
      </div>
      <button
        onClick={onCancel}
        className="font-body text-xs text-[#191c1c]/40 hover:text-brand-crimson transition-colors cursor-pointer"
      >
        Hủy
      </button>
    </div>
  );
}

interface ActiveRecordingProps {
  onStop: () => void;
}

export function ActiveRecording({ onStop }: ActiveRecordingProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <button
        onClick={onStop}
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

interface AudioPlaybackProps {
  audioUrl: string;
  onTogglePlay: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  onLoadedMetadata: (dur: number) => void;
  onEnded: () => void;
  onPause: () => void;
  onPlay: () => void;
}

export function AudioPlayback({
  audioUrl,
  onTogglePlay,
  onSeek,
  currentTime,
  duration,
  isPlaying,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
  onPause,
  onPlay,
}: AudioPlaybackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (el) {
      el.load();
    }
    return () => {
      if (el) {
        el.pause();
        el.src = "";
      }
    };
  }, [audioUrl]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#f8f9f9] p-5 mb-4 border border-slate-100">
      <p className="font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-3">
        Nghe lại bản ghi âm
      </p>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={(e) => onTimeUpdate(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => onLoadedMetadata(e.currentTarget.duration)}
        onEnded={onEnded}
        onPause={onPause}
        onPlay={onPlay}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 bg-[#191c1c] text-white flex items-center justify-center hover:bg-[#191c1c]/90 transition-all cursor-pointer shrink-0"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h4v12H6zm8 0h4v12h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div
            onClick={onSeek}
            className="h-1.5 bg-[#e7e8e8] cursor-pointer group"
          >
            <div
              className="h-full bg-brand-crimson relative"
              style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-brand-crimson border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
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
  );
}

interface TranscriptDisplayProps {
  transcript: string;
}

export function TranscriptDisplay({ transcript }: TranscriptDisplayProps) {
  if (!transcript) return null;

  return (
    <div className="bg-[#f8f9f9] p-4 mb-4 border border-slate-100">
      <p className="font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-2">
        Nhận dạng giọng nói
      </p>
      <p className="font-body text-sm text-[#191c1c] italic">
        &ldquo;{transcript}&rdquo;
      </p>
    </div>
  );
}

interface ReviewActionsProps {
  onRecordAgain: () => void;
  onAccept: () => void;
}

export function ReviewActions({ onRecordAgain, onAccept }: ReviewActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onRecordAgain}
        className="flex-1 border-2 border-[#191c1c]/20 text-[#191c1c]/60 px-5 py-2.5 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:border-brand-crimson hover:text-brand-crimson transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Ghi âm lại
      </button>
      <button
        onClick={onAccept}
        className="flex-1 bg-[#191c1c] text-white px-5 py-2.5 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:bg-[#191c1c]/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        Chấp nhận
      </button>
    </div>
  );
}

interface StartRecordingButtonProps {
  onStart: () => void;
  error: string | null;
}

export function StartRecordingButton({ onStart, error }: StartRecordingButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-brand-crimson p-4 mb-2 w-full">
          <p className="font-body text-sm text-brand-crimson">{error}</p>
        </div>
      )}
      <button
        onClick={onStart}
        className="bg-[#191c1c] text-white px-8 py-3.5 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:bg-[#191c1c]/90 transition-all flex items-center gap-3 cursor-pointer"
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
