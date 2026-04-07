"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PART1_SENTENCES, PART2_SCENARIOS } from "@/lib/ai-assessment/constants";

interface AssessmentIntroProps {
  onStart: () => void;
}

export default function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div className="h-full flex">
        {/* Left: Info + CTA */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto text-center">
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[#191c1c] leading-[0.95] tracking-tight">
              Bài Đánh Giá<br />Nói Tiếng Anh
            </h2>
            <p className="font-body text-sm text-[#5b403f]/70 mt-3 mb-10">
              Bài kiểm tra gồm 2 phần • ~10 phút
            </p>

            <div className="space-y-6 mb-12 text-left">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[2px] text-brand-crimson font-bold mb-1">Kết quả tức thì</p>
                <p className="font-body text-sm text-[#191c1c]/70">Nhận điểm và nhận xét chi tiết ngay sau khi hoàn thành</p>
              </div>
              <div className="border-t border-slate-100" />
              <div>
                <p className="font-body text-[11px] uppercase tracking-[2px] text-brand-crimson font-bold mb-1">5 tiêu chí đánh giá</p>
                <p className="font-body text-sm text-[#191c1c]/70">Vocabulary, Grammar, Pronunciation, Fluency, Question Handling</p>
              </div>
              <div className="border-t border-slate-100" />
              <div>
                <p className="font-body text-[11px] uppercase tracking-[2px] text-brand-crimson font-bold mb-1">Lộ trình cá nhân hóa</p>
                <p className="font-body text-sm text-[#191c1c]/70">Đề xuất lộ trình học tập phù hợp với kết quả của bạn</p>
              </div>
              <div className="border-t border-slate-100" />
              <div>
                <p className="font-body text-[11px] uppercase tracking-[2px] text-brand-crimson font-bold mb-1">2 phần thi</p>
                <p className="font-body text-sm text-[#191c1c]/70">Part 1: Đọc câu ({PART1_SENTENCES.length} câu) • Part 2: Nói tự do ({PART2_SCENARIOS.length} tình huống)</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={onStart}
                className="bg-[#191c1c] text-white px-10 py-4 font-bold tracking-[2px] uppercase text-xs rounded-none hover:bg-[#191c1c]/90 transition-all cursor-pointer w-full md:w-auto"
              >
                Bắt đầu kiểm tra miễn phí
              </button>
              <Link
                href="/giaotiep-1-1"
                className="font-body text-xs text-[#191c1c]/30 hover:text-brand-crimson transition-colors cursor-pointer"
              >
                Quay lại
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Radar Chart Visual */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#f8f9f9] border-l border-slate-100">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
            <svg viewBox="0 0 400 400" className="w-80 h-80 lg:w-96 lg:h-96">
              {/* Grid circles */}
              {[1, 2, 3, 4, 5].map((level) => (
                <polygon
                  key={level}
                  points={getPolygonPoints(200, 200, level * 30, 5)}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}
              {/* Axes */}
              {getAxisLines(200, 200, 150, 5).map((line, i) => (
                <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#e2e8f0" strokeWidth="1" />
              ))}
              {/* Data polygon */}
              <polygon
                points={getDataPointsString(200, 200, [85, 72, 90, 68, 78])}
                fill="rgba(190, 32, 47, 0.15)"
                stroke="#BE202F"
                strokeWidth="2"
              />
              {/* Data points */}
              {getDataPoints(200, 200, [85, 72, 90, 68, 78]).map((point, i) => (
                <circle key={i} cx={point.x} cy={point.y} r="4" fill="#BE202F" />
              ))}
              {/* Labels */}
              <text x="200" y="35" textAnchor="middle" className="font-sans text-xs font-bold fill-[#191c1c]">Pronunciation</text>
              <text x="365" y="145" textAnchor="start" className="font-sans text-xs font-bold fill-[#191c1c]">Fluency</text>
              <text x="310" y="340" textAnchor="middle" className="font-sans text-xs font-bold fill-[#191c1c]">Grammar</text>
              <text x="90" y="340" textAnchor="middle" className="font-sans text-xs font-bold fill-[#191c1c]">Vocabulary</text>
              <text x="35" y="145" textAnchor="end" className="font-sans text-xs font-bold fill-[#191c1c]">Question Handling</text>
            </svg>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 border border-slate-200 shadow-sm">
              <p className="font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold">Ví dụ kết quả</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function getPolygonPoints(cx: number, cy: number, radius: number, sides: number) {
  const points: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}

function getAxisLines(cx: number, cy: number, length: number, sides: number) {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    lines.push({
      x1: cx,
      y1: cy,
      x2: cx + length * Math.cos(angle),
      y2: cy + length * Math.sin(angle),
    });
  }
  return lines;
}

function getDataPoints(cx: number, cy: number, values: number[]) {
  const sides = values.length;
  return values.map((value, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const radius = (value / 100) * 150;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

function getDataPointsString(cx: number, cy: number, values: number[]) {
  return getDataPoints(cx, cy, values).map((p) => `${p.x},${p.y}`).join(" ");
}
