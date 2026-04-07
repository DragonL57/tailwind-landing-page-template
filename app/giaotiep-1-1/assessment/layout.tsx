import Link from "next/link";

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-headline font-bold text-lg uppercase text-[#191c1c]">
            ePLUS Assessment
          </h1>
          <Link
            href="/"
            className="font-body text-xs text-[#191c1c]/50 hover:text-brand-crimson transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
