import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts from 0 to `value` once in view. Always lands on the exact value; static under reduced motion. */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
      onComplete: () => (el.textContent = `${value}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduce, value, suffix]);

  return (
    <span className={className}>
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {reduce ? `${value}${suffix}` : `0${suffix}`}
      </span>
    </span>
  );
}
