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
  const currentIndex = completedCount + (isReviewing ? 1 : 0);
  const currentStepLabel = isPart1 ? "Part 1: Interview" : "Part 2: Role Play";

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        {Array.from({ length: totalItems }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < currentIndex
                ? isPart1
                  ? "bg-brand-crimson"
                  : "bg-brand-gold"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <span
        className={`font-body text-[10px] font-bold uppercase tracking-[2px] ${
          isPart1 ? "text-brand-crimson" : "text-brand-gold"
        }`}
      >
        {currentStepLabel}
      </span>
    </div>
  );
}