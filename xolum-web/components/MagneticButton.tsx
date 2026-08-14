'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export function MagneticButton({
  children,
  href,
  className,
  onClick,
  strength = 0.4,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = <span className={className}>{children}</span>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {href ? (
        <a href={href} onClick={onClick} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          {inner}
        </a>
      ) : (
        <button onClick={onClick} type="button">
          {inner}
        </button>
      )}
    </motion.div>
  );
}
