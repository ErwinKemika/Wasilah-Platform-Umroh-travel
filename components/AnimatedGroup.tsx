"use client";

import { Children, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  variants?: { container?: Variants; item?: Variants };
};

const defaultContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const defaultItem: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function AnimatedGroup({ children, className, variants }: Props) {
  const container = variants?.container ?? defaultContainer;
  const item = variants?.item ?? defaultItem;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className={className}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
