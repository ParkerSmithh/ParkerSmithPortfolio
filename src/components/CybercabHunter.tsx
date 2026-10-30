import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, BarChart3, Car, Code2, Film, ImageIcon, Lock } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { cybercab } from "../data/portfolio";
import { cybercabScreens, type Screenshot } from "../data/projects";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "./AnimatedSection";

const CONTRIB_ICONS = { code: Code2, film: Film, chart: BarChart3, car: Car } as const;
const FEATURE_TONES: Record<string, { card: string; num: string; body: string }> = {
  marigold: { card: "bg-marigold text-ink", num: "text-ink/60", body: "text-ink/80" },
  coral: { card: "bg-coral text-ink", num: "text-ink/60", body: "text-ink/85" },
  sky: { card: "bg-sky text-ink", num: "text-ink/60", body: "text-ink/80" },
  midnight: { card: "bg-midnight text-white", num: "text-white/50", body: "text-white/75" },
};

export function CybercabHunter() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const desktopY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [120, -80]);

  return (
    <section id="cybercab" aria-labelledby="cybercab-title" className="py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              id="cybercab-title"
              eyebrow="Featured web project"
              title={cybercab.title}
              intro={cybercab.description}
            />
          </div>
          <Reveal className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end" delay={0.15}>
            <a href={cybercab.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
              Visit Cybercab Hunter
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-graphite">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1aae39] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1aae39]" />
              </span>
              Live at {cybercab.displayUrl}
            </span>
          </Reveal>
        </div>

        {/* Screenshot stage */}
        <div ref={stageRef} className="relative mt-10 md:mt-14 md:pb-24">
          <motion.div style={{ y: desktopY }} className="relative md:mr-24 lg:mr-40">
            <BrowserShowcase />
          </motion.div>
          <motion.div
            style={{ y: phoneY }}
            className="absolute bottom-0 right-0 hidden w-[180px] md:block lg:w-[220px]"
          >
            <PhoneFrame shot={cybercabScreens.mobile} />
          </motion.div>
        </div>

        {/* Features */}
        <Stagger as="ul" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4" stagger={0.08}>
          {cybercab.features.map((f, i) => {
            const t = FEATURE_TONES[f.accent];
            return (
              <StaggerItem as="li" key={f.title}>
                <div className={`group flex h-full min-h-56 flex-col justify-between rounded-card p-6 transition-transform duration-300 ease-out hover:-translate-y-1 ${t.card}`}>
                  <span className={`text-sm font-semibold tabular-nums ${t.num}`}>0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold leading-tight tracking-tight">{f.title}</h3>
                    <p className={`mt-2 text-[0.9375rem] leading-relaxed ${t.body}`}>{f.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Contributions + tech */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="t-heading-sm">My contributions</h3>
            </Reveal>
            <Stagger as="ul" className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.08}>
              {cybercab.contributions.map((c) => {
                const Icon = CONTRIB_ICONS[c.icon];
                return (
                  <StaggerItem as="li" key={c.title}>
                    <div className="card group h-full p-5 transition-colors duration-200 hover:border-black/20">
                      <span className="flex h-10 w-10 items-center justify-center rounded-button bg-sky-tint text-blue transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <p className="mt-4 font-semibold">{c.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-graphite">{c.body}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="card h-full p-6 md:p-8">
              <h3 className="t-heading-sm">How it's built</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">{cybercab.techNote}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                {cybercab.stack.map((s) => (
                  <li key={s} className="pill bg-paper text-ink/80">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BrowserShowcase() {
  const shots = cybercabScreens.desktop;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shot = shots[active];

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : shots.length - 1)) % shots.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-white shadow-mockup">
      <div className="flex items-center gap-3 border-b border-hairline bg-[#fbfaf9] px-3 py-2.5 sm:px-4">
        <div className="hidden gap-1.5 sm:flex" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-button bg-paper px-3 py-1.5 text-xs text-graphite sm:mx-6">
          <Lock className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{cybercab.displayUrl}</span>
        </div>
        <div role="tablist" aria-label="Cybercab Hunter screenshots" className="flex gap-0.5" onKeyDown={onKey}>
          {shots.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              type="button"
              id={`cc-tab-${s.id}`}
              aria-selected={i === active}
              aria-controls="cc-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-button px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                i === active ? "bg-ink text-white" : "text-graphite hover:bg-black/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div
        id="cc-panel"
        role="tabpanel"
        aria-labelledby={`cc-tab-${shot.id}`}
        className="relative aspect-[16/10] overflow-hidden bg-paper"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={shot.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShotImage shot={shot} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PhoneFrame({ shot }: { shot: Screenshot }) {
  return (
    <div className="rounded-[34px] bg-ink p-2 shadow-mockup">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[26px] bg-paper">
        <ShotImage shot={shot} compact />
        <span aria-hidden className="absolute left-1/2 top-2 h-5 w-16 -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}

function ShotImage({ shot, compact = false }: { shot: Screenshot; compact?: boolean }) {
  if (shot.src) {
    return <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />;
  }
  return (
    <div className="ruled flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center" role="img" aria-label={`${shot.alt} (screenshot coming soon)`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
        <ImageIcon className="h-5 w-5" aria-hidden />
      </span>
      <p className={`font-semibold text-ink ${compact ? "text-xs" : "text-sm md:text-base"}`}>{shot.label} screenshot</p>
      {!compact && (
        <p className="text-xs text-stone">
          Add to <code className="rounded-small bg-white px-1 py-0.5">data/projects.ts</code>
        </p>
      )}
    </div>
  );
}
