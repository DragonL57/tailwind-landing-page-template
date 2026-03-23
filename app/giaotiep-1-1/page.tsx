"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "@/components/giaotiep-1-1/hero";
import EvaluationPaths from "@/components/giaotiep-1-1/evaluation-paths";
import LearningMethod from "@/components/giaotiep-1-1/learning-method";
import PricingPackages from "@/components/giaotiep-1-1/pricing-packages";
import TargetAudience from "@/components/giaotiep-1-1/target-audience";
import FacultySection from "@/components/giaotiep-1-1/faculty-section";
import ConsultationForm from "@/components/giaotiep-1-1/consultation-form";
import Footer from "@/components/giaotiep-1-1/footer";

const SECTIONS = [
  { id: "hero", component: Hero },
  { id: "evaluation", component: EvaluationPaths },
  { id: "method", component: LearningMethod },
  { id: "pricing", component: PricingPackages },
  { id: "audience", component: TargetAudience },
  { id: "faculty", component: FacultySection },
  { id: "form", component: ConsultationForm },
  { id: "footer", component: Footer },
];

export default function Giaotiep11Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]));
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.2, 
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveIndex(index);
            setVisibleSections(prev => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    if (!sectionRefs.current[index]) return;
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] md:overflow-hidden bg-[#f8f9f9]">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-[4rem] left-0 right-0 h-1 bg-brand-crimson origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation Dots - Desktop Only */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className="group relative p-3 flex items-center justify-center"
            aria-label={`Scroll to section ${i + 1}`}
          >
             <div 
              className={`w-3 h-3 border-2 border-brand-crimson transition-all duration-300 rounded-none ${
                activeIndex === i ? "bg-brand-crimson scale-125" : "bg-transparent opacity-40 group-hover:opacity-100"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Main Scroll Container - Snap on Desktop, Natural on Mobile */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto md:scroll-snap-y md:snap-mandatory hide-scrollbar scroll-smooth"
      >
        {SECTIONS.map((Section, i) => (
          <div 
            key={Section.id} 
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="w-full md:snap-start shrink-0 border-b border-slate-100 md:border-b-0"
          >
            <Section.component isActive={visibleSections.has(i)} />
          </div>
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
