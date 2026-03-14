"use client";
import { motion, useAnimation, useInView, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef } from "react";

type FadeSlideUpProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
};

export default function FadeSlideUp({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  y = 50,
  ...rest
}: FadeSlideUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [inView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
