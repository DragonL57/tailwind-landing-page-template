"use client";

import Hero from "@/components/giaotiep-1-1/hero";
import EvaluationPaths from "@/components/giaotiep-1-1/evaluation-paths";
import LearningMethod from "@/components/giaotiep-1-1/learning-method";
import PricingPackages from "@/components/giaotiep-1-1/pricing-packages";
import TargetAudience from "@/components/giaotiep-1-1/target-audience";
import ConsultationForm from "@/components/giaotiep-1-1/consultation-form";

export default function Giaotiep11Page() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <EvaluationPaths />
      <LearningMethod />
      <PricingPackages />
      <TargetAudience />
      <ConsultationForm />
    </div>
  );
}
