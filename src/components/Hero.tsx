import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { contact, education, hero, resume } from "../data/portfolio";
import { Flower, Ring, Sparkle, Squiggle } from "./Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;
const LABEL_COLORS = ["bg-peach", "bg-sky-tint", "bg-marigold/30", "bg-coral/15"];

function Word({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Floating({
  children,
  className,
  y,
  delay = 0,
  duration = 6,
}: {
  children: ReactNode;
  className: string;
  y: MotionValue<number>;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.6 + delay }}
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const slow = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const sink = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pb-24"
    >
      {/* Decorative marks */}
      <Floating className="left-[6%] top-[20%] hidden md:block" y={fast} delay={0}>
        <Sparkle className="h-12 w-12" color="#ffb110" />
      </Floating>
      <Floating className="right-[8%] top-[17%] hidden sm:block" y={slow} delay={0.15} duration={7}>
        <Flower className="h-10 w-10 md:h-14 md:w-14" color="#62aef0" />
      </Floating>
      <Floating className="left-[10%] top-[58%] hidden lg:block" y={sink} delay={0.3} duration={8}>
        <Squiggle className="h-6 w-24" color="#f64932" />
      </Floating>
      <Floating className="right-[12%] top-[55%] hidden md:block" y={fast} delay={0.45}>
        <Ring className="h-10 w-10" color="#097fe8" />
      </Floating>

      <div className="container-page relative flex flex-col items-center text-center">
        <motion.p
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-graphite"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span>{education.school}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-black/30" />
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {contact.location}
          </span>
        </motion.p>

        <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Disciplines">
          {hero.categories.map((c, i) => (
            <motion.li
              key={c}
              className={`pill ${LABEL_COLORS[i % LABEL_COLORS.length]} text-ink/90`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
            >
              {c}
            </motion.li>
          ))}
        </ul>

        <h1
          id="hero-title"
          className="t-display mt-8 text-ink [font-size:clamp(3.5rem,1.4rem+8.5vw,8.5rem)]"
        >
          <span className="sr-only">
            {hero.headlineLead} {hero.headlineHighlight}
          </span>
          <span aria-hidden>
            <Word delay={0.2}>{hero.headlineLead}&nbsp;</Word>
            <motion.span
              className="relative inline-block align-bottom"
              initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 }}
            >
              <span className="inline-block rounded-full bg-marigold px-[0.32em] pb-[0.08em]">
                {hero.headlineHighlight}
              </span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="t-lead mt-8 max-w-2xl text-graphite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          className="mt-9 flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-auto sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
        >
          <a href="#projects" className="btn btn-primary group">
            Explore My Work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a href={resume.href} download={resume.downloadName} className="btn btn-ghost">
            <Download className="h-4 w-4" aria-hidden />
            Download Resume
          </a>
          <a href="#contact" className="btn btn-text">
            Contact Me
          </a>
        </motion.div>

        <HighlightStrip />

        <motion.a
          href="#about"
          className="mt-12 hidden flex-col items-center gap-2 rounded-button p-2 text-xs font-medium tracking-wide text-stone md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Scroll
          <motion.span
            className="flex h-9 w-6 justify-center rounded-full border border-black/20 pt-1.5"
            aria-hidden
          >
            <motion.span
              className="block h-2 w-1 rounded-full bg-ink/60"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.span>
          <span className="sr-only">to the About section</span>
        </motion.a>
      </div>
    </section>
  );
}

const HIGHLIGHTS = [
  { value: "33K", label: "YouTube subscribers", dot: "bg-coral" },
  { value: "11", label: "Fortnite games published", dot: "bg-marigold" },
  { value: "Live", label: "cybercabhunter.com", dot: "bg-blue" },
  { value: "2028", label: "SMU graduation", dot: "bg-sky" },
];

function HighlightStrip() {
  return (
    <motion.dl
      className="card mt-14 grid w-full max-w-4xl grid-cols-2 overflow-hidden text-left md:grid-cols-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
    >
      {HIGHLIGHTS.map((h, i) => (
        <div
          key={h.label}
          className={`flex flex-col gap-1 p-5 md:p-6 ${i % 2 === 1 ? "border-l border-hairline" : ""} ${
            i >= 2 ? "border-t border-hairline md:border-t-0" : ""
          } ${i === 2 ? "md:border-l" : ""}`}
        >
          <dt className="flex items-center gap-2 text-sm text-graphite">
            <span aria-hidden className={`h-2 w-2 rounded-full ${h.dot}`} />
            {h.label}
          </dt>
          <dd className="order-first text-3xl font-bold tracking-tight md:text-4xl">{h.value}</dd>
        </div>
      ))}
    </motion.dl>
  );
}
