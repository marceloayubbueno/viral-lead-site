'use client';

import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileInView?: any;
  viewport?: any;
  whileHover?: any;
}

export default function MotionWrapper({
  children,
  className,
  initial,
  animate,
  transition,
  whileInView,
  viewport,
  whileHover,
  ...props
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
      whileHover={whileHover}
      {...props}
    >
      {children}
    </motion.div>
  );
}
