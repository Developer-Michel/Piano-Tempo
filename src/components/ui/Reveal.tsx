"use client";

import { useRef } from "react";
import {
  AnimationControls,
  AnimationProps,
  HoverHandlers,
  motion,
  TargetAndTransition,
  useInView,
  VariantLabels,
} from "framer-motion";

export function Reveal({
  children,
  className,
  initial,
  transition,
  animate,
  whileHover,
}: {
  animate?: AnimationProps["animate"];
  transition?: AnimationProps["transition"];
  className?: string;
  whileHover?: HoverHandlers["whileHover"];
  initial?: AnimationProps["initial"];
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate != null && (inView ? animate : {})}
      whileHover={whileHover}
      transition={transition || { duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
