"use client";

import Hero from "@/components/giaotiep-1-1/hero";
import EvaluationPaths from "@/components/giaotiep-1-1/evaluation-paths";
import LearningMethod from "@/components/giaotiep-1-1/learning-method";
import PricingPackages from "@/components/giaotiep-1-1/pricing-packages";
import Features from "@/components/giaotiep-1-1/features";
import AcademicShowcase from "@/components/giaotiep-1-1/academic-showcase";
import CTASection from "@/components/giaotiep-1-1/cta-section";

export default function Giaotiep11Page() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <EvaluationPaths />
      <LearningMethod />
      <PricingPackages />
      <Features />
      <AcademicShowcase />
      <CTASection />
    </div>
  );
}
