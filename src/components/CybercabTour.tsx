import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useEffect, useRef, useState, type Ref } from "react";
import { cybercab } from "../data/portfolio";
import { cybercabTour, type TourShot } from "../data/projects";
import { asset } from "../lib/asset";

const EASE = [0.22, 1, 0.36, 1] as const;
const GAP = 48;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * Screenshot tour of Cybercab Hunter.
 * Desktop: the section pins while normal vertical scrolling slides the screenshots sideways.
 * Small screens / reduced motion: a native swipeable carousel.
 */
export function CybercabTour() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  return wide && !reduce ? <PinnedTour /> : <SwipeTour />;
}

function BrowserFrame({ shot, eager = false }: { shot: TourShot; eager?: boolean }) {
  return (
    <div className="overflow-hidden rounded-card bg-[#0b0c0f] shadow-mockup ring-1 ring-black/10">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
        <div className="hidden gap-1.5 sm:flex" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-button bg-white/[0.07] px-3 py-1.5 text-xs text-white/60 sm:mx-6">
          <Lock className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{cybercab.displayUrl}</span>
        </div>
      </div>
      {/* Screenshots vary in height; a shared frame keeps the row even. Their near-black edges blend into the letterbox. */}
      <div className="relative aspect-[2.35/1] bg-[#0a0b0d]">
        <img
          src={asset(shot.src)}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

/* ---------- Desktop: pinned horizontal scroll ---------- */

function PinnedTour() {
  const n = cybercabTour.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLLIElement>(null);
  const distance = useMotionValue(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 64px", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
  const x = useTransform([progress, distance] as MotionValue<number>[], ([p, d]: number[]) => -p * d);

  // Total sideways travel = (slides - 1) × (slide width + gap); re-measured on resize.
  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => distance.set((n - 1) * (el.offsetWidth + GAP)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [distance, n]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(p * (n - 1)))));
  });

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    const travel = el.offsetHeight - (window.innerHeight - 64);
    window.scrollTo({ top: top + (travel * i) / (n - 1), behavior: "smooth" });
  }

  const shot = cybercabTour[active];

  return (
    <div ref={trackRef} className="relative" style={{ height: `${n * 90}vh` }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden py-6">
        {/* Step controls + progress */}
        <div className="container-page flex items-center justify-between gap-6">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold tabular-nums text-ink">
              {String(active + 1).padStart(2, "0")}
              <span className="text-stone"> / {String(n).padStart(2, "0")}</span>
            </span>
            <span className="t-eyebrow text-stone">Site tour</span>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Jump to screenshot">
            {cybercabTour.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "step" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  i === active ? "bg-ink text-white" : "text-graphite hover:bg-black/5"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="container-page mt-4">
          <div className="h-0.5 overflow-hidden rounded-full bg-black/10">
            <motion.div className="h-full origin-left rounded-full bg-blue" style={{ scaleX: progress }} />
          </div>
        </div>

        {/* Sliding row */}
        <motion.ul
          className="mt-8 flex [--slide-w:min(76vw,1080px,calc((100vh-21rem)*2.35))]"
          style={{ x, gap: GAP, paddingInline: "calc((100vw - var(--slide-w)) / 2)" }}
        >
          {cybercabTour.map((s, i) => (
            <TourSlide key={s.id} shot={s} index={i} total={n} progress={progress} measureRef={i === 0 ? slideRef : undefined} />
          ))}
        </motion.ul>

        {/* Caption for the slide in focus */}
        <div className="container-page mt-8 min-h-[5.5rem]">
          <div className="mx-auto max-w-2xl text-center" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={shot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <h3 className="t-heading-sm">{shot.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-graphite">{shot.caption}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function TourSlide({
  shot,
  index,
  total,
  progress,
  measureRef,
}: {
  shot: TourShot;
  index: number;
  total: number;
  progress: MotionValue<number>;
  measureRef?: Ref<HTMLLIElement>;
}) {
  // Each slide peaks (full size, full opacity, level) when it's centred, and recedes on either side.
  const step = 1 / (total - 1);
  const c = index * step;
  const range = [c - step, c, c + step];
  const scale = useTransform(progress, range, [0.86, 1, 0.86]);
  const opacity = useTransform(progress, range, [0.45, 1, 0.45]);
  const rotateY = useTransform(progress, range, [-8, 0, 8]);

  return (
    <motion.li
      ref={measureRef}
      className="w-[var(--slide-w)] shrink-0 [perspective:1600px]"
      aria-label={`${index + 1} of ${total}: ${shot.title}`}
    >
      <motion.div style={{ scale, opacity, rotateY }}>
        <BrowserFrame shot={shot} eager={index === 0} />
      </motion.div>
    </motion.li>
  );
}

/* ---------- Small screens / reduced motion: swipe carousel ---------- */

function SwipeTour() {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const n = cybercabTour.length;

  function onScroll() {
    const el = listRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    if (!slide) return;
    setActive(Math.round(el.scrollLeft / (slide.offsetWidth + 16)));
  }

  function goTo(i: number) {
    const el = listRef.current;
    const target = el?.children[Math.max(0, Math.min(n - 1, i))] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  }

  return (
    <div>
      <ul
        ref={listRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
        aria-label="Cybercab Hunter screenshots"
      >
        {cybercabTour.map((s, i) => (
          <li key={s.id} className="w-[88%] shrink-0 snap-start md:w-[75%]" aria-label={`${i + 1} of ${n}: ${s.title}`}>
            <BrowserFrame shot={s} eager={i === 0} />
            <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-graphite">{s.caption}</p>
          </li>
        ))}
      </ul>
      <div className="container-page mt-5 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden>
          {cybercabTour.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-ink" : "w-1.5 bg-black/20"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-outline h-11 w-11 px-0 disabled:opacity-40"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="btn btn-outline h-11 w-11 px-0 disabled:opacity-40"
            onClick={() => goTo(active + 1)}
            disabled={active === n - 1}
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
