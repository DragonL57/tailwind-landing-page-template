"use client";

interface AssessmentPromptProps {
  isPart1: boolean;
  currentItem: string | { scenario: string; prompt: string };
}

export default function AssessmentPrompt({
  isPart1,
  currentItem,
}: AssessmentPromptProps) {
  const isScenario = !isPart1 && typeof currentItem !== "string";

  return (
    <>
      {isScenario && (
        <div className="bg-[#f8f9f9] p-4 mb-4 border border-slate-100">
          <p className="font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-1">
            Tình huống
          </p>
          <p className="font-body text-sm text-[#5b403f]">
            {currentItem.scenario}
          </p>
        </div>
      )}

      <div className="bg-white p-6 md:p-8 mb-6 border border-slate-200">
        {isScenario ? (
          <>
            <p className="font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-3">
              Yêu cầu
            </p>
            <p className="font-body text-base text-[#191c1c] leading-relaxed">
              {currentItem.prompt}
            </p>
          </>
        ) : (
          <>
            <p className="font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-3">
              Đọc to câu sau
            </p>
            <p className="font-headline font-bold text-lg md:text-xl text-[#191c1c] leading-relaxed">
              {currentItem as string}
            </p>
          </>
        )}
      </div>
    </>
  );
}
