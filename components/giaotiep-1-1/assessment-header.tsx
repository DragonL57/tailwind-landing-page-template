import Link from "next/link";
import Image from "next/image";

export default function AssessmentHeader() {
  return (
    <header className="shrink-0 bg-white border-b border-slate-200">
      <div className="flex justify-between items-center px-6 md:px-12 h-16">
        <Link href="/" className="relative h-6 md:h-8 w-40 md:w-56">
          <Image
            src="/flextrack/flextrack_logo_white.png"
            alt="VMG FlexTrack Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <Link
          href="/"
          className="font-body text-xs text-[#191c1c]/50 hover:text-brand-crimson transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </Link>
      </div>
    </header>
  );
}
