"use client";

import Link from "next/link";

interface AssessmentBreadcrumbProps {
  currentStep: string;
  stepIndex: number;
  totalSteps: number;
}

export default function AssessmentBreadcrumb({
  currentStep,
  stepIndex,
  totalSteps,
}: AssessmentBreadcrumbProps) {
  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/giaotiep-1-1"
              className="text-[#191c1c]/40 hover:text-brand-crimson transition-colors cursor-pointer"
            >
              Trang chủ
            </Link>
            <svg className="w-3 h-3 text-[#191c1c]/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#191c1c]/60 font-bold">{currentStep}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-[#191c1c]/40">
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </div>

        <div className="mt-3 w-full h-1 bg-[#f3f4f4]">
          <div
            className="h-full bg-brand-crimson transition-all duration-500"
            style={{ width: `${(stepIndex / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
