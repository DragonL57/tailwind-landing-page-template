import AssessmentHeader from "@/components/giaotiep-1-1/assessment-header";

export default function DanhGiaLoTrinhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-[#f8f9f9] flex flex-col">
      <AssessmentHeader />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
