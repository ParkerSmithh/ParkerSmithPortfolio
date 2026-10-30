import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, BarChart3, Car, Check, Code2, Film } from "lucide-react";
import { useRef } from "react";
import { cybercab } from "../data/portfolio";
import { cybercabMobile } from "../data/projects";
import { asset } from "../lib/asset";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "./AnimatedSection";
import { CybercabTour } from "./CybercabTour";

const CONTRIB_ICONS = { code: Code2, film: Film, chart: BarChart3, car: Car } as const;
const FEATURE_TONES: Record<string, { card: string; num: string; body: string }> = {
  marigold: { card: "bg-marigold text-ink", num: "text-ink/60", body: "text-ink/80" },
  coral: { card: "bg-coral text-ink", num: "text-ink/60", body: "text-ink/85" },
  sky: { card: "bg-sky text-ink", num: "text-ink/60", body: "text-ink/80" },
  midnight: { card: "bg-midnight text-white", num: "text-white/50", body: "text-white/75" },
};

export function CybercabHunter() {
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

      </div>

      {/* Screenshot tour — full-bleed so the slides can travel edge to edge */}
      <div className="mt-10 md:mt-14">
        <CybercabTour />
      </div>

      <div className="container-page">
        <MobileShowcase />

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

function MobileShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The phone rises and straightens out as it scrolls into view.
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -60]);
  const rotate = useTransform(scrollYProgress, [0, 0.45], [-7, 0]);
  const m = cybercabMobile;

  return (
    <div ref={ref} className="mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-6 lg:col-span-5 lg:col-start-2">
        <Reveal>
          <p className="t-eyebrow text-blue">Mobile</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.1]">{m.title}</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-graphite">{m.body}</p>
        </Reveal>
        <Stagger as="ul" className="mt-6 grid gap-2.5" stagger={0.06}>
          {m.points.map((pt) => (
            <StaggerItem as="li" key={pt} className="flex items-center gap-3 text-[0.9375rem]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-marigold">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              {pt}
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="relative flex justify-center md:col-span-6 lg:col-span-5">
        <div aria-hidden className="absolute top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-marigold/25" />
        <motion.div style={{ y, rotate }} className="relative w-[240px] sm:w-[270px] lg:w-[290px]">
          <div className="rounded-[44px] bg-ink p-2.5 shadow-mockup ring-1 ring-black/20">
            <div className="overflow-hidden rounded-[36px] bg-[#0a0b0d]">
              <img
                src={asset(m.src)}
                alt={m.alt}
                width={m.width}
                height={m.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
