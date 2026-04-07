"use client";

interface AssessmentProgressProps {
  isPart1: boolean;
  totalItems: number;
  completedCount: number;
  isReviewing: boolean;
}

export default function AssessmentProgress({
  isPart1,
  totalItems,
  completedCount,
  isReviewing,
}: AssessmentProgressProps) {
  const overallProgress = completedCount + (isReviewing ? 1 : 0);
  const currentStepLabel = isPart1 ? "Part 1: Interview" : "Part 2: Role Play";

  return (
    <div className="mb-8">
      <span
        className={`font-body text-[10px] font-bold uppercase tracking-[2px] mb-3 block ${
          isPart1 ? "text-brand-crimson" : "text-brand-gold"
        }`}
      >
        {currentStepLabel}
      </span>
      <div className="flex items-center gap-0">
        {Array.from({ length: totalItems }).map((_, i) => {
          const isDone = i < overallProgress;
          const isCurrent = i === overallProgress;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none last:w-0">
              <div className="flex flex-col items-center gap-1.5 relative z-10">
                <div
                  className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold transition-all ${
                    isDone
                      ? "bg-brand-crimson text-white"
                      : isCurrent
                        ? "bg-[#191c1c] text-white"
                        : "bg-[#f3f4f4] text-[#191c1c]/30"
                  }`}
                >
                  {isDone ? (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
              </div>
              {i < totalItems - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 ${
                    isDone ? "bg-brand-crimson" : "bg-[#f3f4f4]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
